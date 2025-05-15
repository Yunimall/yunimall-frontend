import cameraIcon from "@/assets/camera.svg";
import back from "@/assets/back.svg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const formSchema = z.object({
    storeName: z.string().nonempty("Store name is required"),
    businessType: z.string().nonempty("Business type is required"),
    matricNumber: z.string().nonempty("Matric number is required"),
    category: z.string().nonempty("Category is required"),
    bvn: z.string().nonempty("BVN is required"),
    frontcard: z
        .any()
        .refine((file) => file instanceof File || (file && file.name), "Front ID is required"),

    backcard: z
        .any()
        .refine((file) => file instanceof File || (file && file.name), "Back ID required"),

});

const SellerFullRegistration: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const [categories, setCategories] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [frontCard, setFrontCard] = useState<{ preview: string; file: File } | null>(null);
    const [backCard, setBackCard] = useState<{ preview: string; file: File } | null>(null);


    const fronthandleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setCard: React.Dispatch<React.SetStateAction<{ preview: string; file: File } | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setCard({ preview, file });
            form.setValue("frontcard", file); // blob goes into form
        }
    };

    const backhandleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setCard: React.Dispatch<React.SetStateAction<{ preview: string; file: File } | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setCard({ preview, file });
            form.setValue("backcard", file); // blob goes into form
        }
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            storeName: "",
            businessType: "",
            matricNumber: "",
            category: "",
            bvn: "",
        },
    });

    const fetchOptions = async () => {
        const fetchedCategories = [
            "men's clothing", "women's clothing", "bags and accessories", "haircare & wigs",
            "fragrances & perfumes", "personal care & hygiene", "fitness & supplements",
            "gaming consoles & accessories", "jewelry & watches", "laptops & computers",
            "mobile phones & accessories", "shoe's & footwear", "skincare & cosmetics",
            "tv & audio equipment", "properties for sale", "furniture & decor", "kitchen & dining",
            "bedding & bath", "home appliances", "lighting & fixtures", "groceries & packaged foods",
            "fresh produce", "drinks & beverages", "snacks & confectionery", "cars & motorcycles",
            "car accessories & parts", "oils & fluids", "tires & wheels", "baby clothing & accessories",
            "toys & games", "strollers & car seats", "baby care products", "gym equipment",
            "sportswear & footwear", "outdoor & camping gear", "bicycles & accessories",
            "academic & professional books", "novels & magazines", "office supplies",
            "photography & videography", "music & dj services", "event planning services",
            "art & decor", "custom clothing", "handmade jewelry", "livestock & poultry",
            "seeds & fertilizers", "farming equipment", "property management", "rental services",
            "it support & maintenance", "cybersecurity services", "website & app development",
            "software & digital tools", "pest control", "home renovation", "cleaning services",
            "plumbing & electrical services", "art & craft supplies"
        ];

        const fetchedTypes = [
            "fashion & apparels", "health & beauty", "electronics & gadgets", "real estate & properties",
            "home & living", "food & beverages", "automobile & accessories", "baby & kids",
            "sports & outdoor", "books & stationery", "entertainment & events", "handmade & crafts",
            "agriculture & farming", "computing & software", "home services & repairs"
        ];

        setCategories(fetchedCategories);
        setTypes(fetchedTypes);
    };

    useEffect(() => {
        fetchOptions();
    }, []);
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submitted Data:", data);
        try {

            // // Only send startDate and endDate to the API
            const apidata = {
                frontImage: data.frontcard,
                backImage: data.backcard,
                storeName: data.storeName,
                category: data.category,
                bvn: data.bvn,
                matricNumber: data.matricNumber
            };

            const token = localStorage.getItem("access token"); // or whatever key you used

            // Make the POST request with the token in the header
            const response = await axios.post(
                "/api/seller-management/register",
                apidata,
                {
                    headers: {
                        // Token currently returns bearer
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response);
            localStorage.setItem("business type", data.businessType);
            navigate('/buyer/create-account-seller/account-created');
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "An unexpected error occurred.";
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: errorMessage,
                confirmButtonColor: "#003F88",
            });
        }

    };

    const handleDone = () => {
        form.handleSubmit(onSubmit)();
    };

    return (
        <div className="fixed inset-0 overflow-y-auto bg-opacity-50 flex md:items-center justify-center">
            <div className="bg-white sm:h-screen md:h-auto md:rounded-xl md:shadow-xl w-full max-w-xl p-6">
                {/* Back Button */}


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Seller Info Tab */}
                        {currentTab === 0 && (
                            <div className="space-y-6 ">
                                <button onClick={() => navigate(-1)} className="pt-10 top-4 left-4">
                                    <img src={back} alt="Back" className="w-6 h-6" />
                                </button>
                                <h2 className="text-2xl font-bold text-black">
                                    Become a seller in less than 5 minutes.
                                </h2>

                                <FormField
                                    control={form.control}
                                    name="storeName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">Store Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Store name"
                                                    className="border border-gray-300 rounded-md p-3 text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="businessType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">Business Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="border border-gray-300 rounded-md p-3 text-gray-500">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {types.map(type => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="matricNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">Matric Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Matric No"
                                                    className="border border-gray-300 rounded-md p-3 text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">Category</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="border border-gray-300 rounded-md p-3 text-gray-500">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map(cat => (
                                                            <SelectItem key={cat} value={cat}>
                                                                {cat}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <p className="text-sm text-gray-600">
                                    By signing up, you have agreed to our{" "}
                                    <a href="#" className="text-[#051449] font-semibold" onClick={() => navigate('/login')}>
                                        privacy policy
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-[#051449] font-semibold" onClick={() => navigate('/login')}>
                                        terms & conditions
                                    </a>.
                                </p>

                                <Button
                                    type="button"
                                    className="w-full bg-[#051449] text-white rounded-md py-3 hover:bg-blue-800 transition duration-300"
                                    onClick={() => setCurrentTab(currentTab + 1)}
                                >
                                    Proceed
                                </Button>

                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Already have an account?{" "}
                                    <a href="#" className="text-[#051449] font-semibold" onClick={() => navigate('/login')}>
                                        Log in
                                    </a>
                                </p>
                            </div>
                        )}

                        {/* Card Info Tab */}
                        {currentTab === 1 && (
                            <div className="space-y-6">
                                <div className="flex flex-row space-x-3 pt-10">
                                    <button onClick={() => setCurrentTab(currentTab - 1)} className="top-4 left-4">
                                        <img src={back} alt="Back" className="w-6 h-6" />
                                    </button>
                                    <h1 className="font-bold">KYC Registration</h1>
                                </div>
                                <p className="text-lg text-gray-600">
                                    Take a front and back picture of your <span className="font-bold">school I.D card</span> to continue.
                                </p>
                                <div>
                                    <p className="text-sm font-semibold mb-2">Front of the card</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => fronthandleFileChange(event, setFrontCard)}
                                        className="hidden"
                                        id="front-card-upload"
                                    />
                                    <label htmlFor="front-card-upload" className="border border-gray-300 rounded-md w-full h-40 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                                        {frontCard ? (
                                            <img src={frontCard.preview} alt="Front of the card" className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <>
                                                <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8" />
                                                <p className="text-sm text-gray-500 mt-2">Click to start</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold mb-2">Back of the card</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => backhandleFileChange(event, setBackCard)}
                                        className="hidden"
                                        id="back-card-upload"
                                    />
                                    <label htmlFor="back-card-upload" className="border border-gray-300 rounded-md w-full h-40 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                                        {backCard ? (
                                            <img src={backCard.preview} alt="Back of the card" className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <>
                                                <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8" />
                                                <p className="text-sm text-gray-500 mt-2">Click to start</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <Button
                                    type="button"
                                    className="w-full bg-[#051449] text-white rounded-md py-3 hover:bg-blue-800 transition duration-300"
                                    onClick={() => setCurrentTab(currentTab + 1)}
                                >
                                    Proceed
                                </Button>
                            </div>
                        )}

                        {/* BVN Tab */}
                        {currentTab === 2 && (
                            <div className="space-y-6">
                                <div className="flex flex-row space-x-3 pt-10">
                                    <button onClick={() => setCurrentTab(currentTab - 1)} className="top-4 left-4">
                                        <img src={back} alt="Back" className="w-6 h-6" />
                                    </button>
                                    <h1 className="font-bold">KYC Registration</h1>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bvn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">Your BVN</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Your BVN"
                                                    className="border border-gray-300 rounded-md p-3 text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold">Why BVN?</span> - This enables us to confirm if your identity matches the other provided details.
                                </p>
                                <Button
                                    type="button"
                                    onClick={handleDone}
                                    className="w-full bg-[#051449] text-white rounded-md py-3 hover:bg-blue-800 transition duration-300"
                                >
                                    Done
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SellerFullRegistration;