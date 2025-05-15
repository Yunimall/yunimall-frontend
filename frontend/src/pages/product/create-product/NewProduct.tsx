import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";
import cameraIcon from "@/assets/camera.svg";
import star from "@/assets/star.svg";
import Swal from 'sweetalert2';
import axios from 'axios';

const formSchema = z.object({
    productName: z.string().nonempty("Product name is required"),
    brand: z.string().nonempty("Brand is required"),
    // size: z.string().nonempty("Size is required"),
    price: z.string().nonempty("Price is required"),
    stock: z.string().nonempty("Number in stock is required"),
    deliveryDate: z.string().nonempty("Delivery date is required"),
    description: z.string().nonempty("Description is required"),
    image: z
        .any()
        .refine((file) => file instanceof File || (file && file.name), "Image is required"),
    deliveryOption: z.string().nonempty("Delivery Option is required"),
    size: z.array(z.string()).min(1, "Please select at least one size"),
});


const AddProductForm: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const [image, setImage] = useState<{ preview: string; file: File } | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>('all');

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        form.setValue("deliveryOption", option);
    };

    const imagehandleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setCard: React.Dispatch<React.SetStateAction<{ preview: string; file: File } | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setCard({ preview, file });
            form.setValue("image", file); // blob goes into form
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            brand: "",
            size: [],
            price: "",
            stock: "",
            deliveryDate: "",
            description: "",
        },
    });


    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submitted Data:", data);
        try {
            // // Only send startDate and endDate to the API
            const apidata = {
                sizes: data.size,
                image: data.image,
                name: data.productName,
                brand: data.brand,
                price: parseFloat(String(data.price).trim()), // Ensures it's a string, trims it, and parses to float
                amountInStock: parseInt(data.stock, 10),      // Base 10 parsing for clarity
                deliveryDate: data.deliveryDate,
                description: data.description,
                deliveryOption: data.deliveryOption
            };


            const token = localStorage.getItem("access token"); // or whatever key you used

            // Make the POST request with the token in the header
            const response = await axios.post(
                "/api/product",
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
            navigate('/seller/create-product/success');
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
        form.handleSubmit(onSubmit);
    };

    return (
        <div className="fixed inset-0 overflow-y-auto bg-opacity-50 flex md:items-center justify-center">
            <div className="bg-white sm:h-screen md:h-auto md:rounded-xl md:shadow-xl w-full max-w-xl p-6">
                {/* Back Button */}


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        {/* add product Tab */}
                        {currentTab === 0 && (
                            <div className="space-y-6 ">
                                <div className="flex items-center space-x-4 mb-6">
                                    <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                                    <p className="text-lg font-bold">Add New Product</p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="productName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter product name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter brand" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter price" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number In Stock</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter number in stock" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="deliveryDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Delivery Date</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter delivery date" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    {...field}
                                                    placeholder="Enter description"
                                                    className="w-full border p-2 rounded"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="button"
                                    className="w-full bg-[#051449] text-white rounded-md py-3 hover:bg-blue-800 transition duration-300"
                                    onClick={() => setCurrentTab(currentTab + 1)}
                                >
                                    Proceed
                                </Button>
                            </div>
                        )}

                        {/* add images Tab */}
                        {currentTab === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <img src={back} alt="Back" onClick={() => setCurrentTab(currentTab - 1)} className="cursor-pointer" />
                                    <p className="text-lg font-bold">Add Images</p>
                                </div>
                                {/* Instruction */}
                                <p className="text-sm text-gray-600 mb-8">
                                    Images need to be at least 500 x 500 pixels and a maximum of 1200 x 1200 pixels.
                                </p>
                                <div>
                                    <p className="text-sm font-semibold mb-2">Image of Product</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => imagehandleFileChange(event, setImage)}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="border border-gray-300 rounded-md w-full h-40 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                                        {image ? (
                                            <img src={image.preview} alt="product image" className="w-full h-full object-cover rounded-md" />
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
                        {/* deliveryoption tab*/}
                        {currentTab === 2 && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <img src={back} alt="Back" onClick={() => setCurrentTab(currentTab - 1)} className="cursor-pointer" />
                                    <p className="text-lg font-bold">Delivery Option</p>
                                </div>

                                {/* Instruction */}
                                <p className="text-sm text-gray-600 mb-8">
                                    Select a delivery option for this product. This action cannot be reversed.
                                </p>

                                {/* Delivery Options */}
                                <div className="space-y-4">
                                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'all' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('all')}>
                                        <p className="font-semibold">Select all</p>
                                        <p className="text-sm text-gray-600">
                                            You are choosing both options and the buyer gets to decide which one to choose.
                                        </p>
                                    </div>
                                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'door_delivery' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('door_delivery')}>
                                        <p className="font-semibold">Door Delivery</p>
                                        <p className="text-sm text-gray-600">
                                            You are to deliver the product to the buyer's address.
                                        </p>
                                    </div>
                                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'pickup' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('pickup')}>
                                        <p className="font-semibold">Pickup (Pick it up at the seller's address)</p>
                                        <p className="text-sm text-gray-600">
                                            The buyer gets to come over to your store to get the product.
                                        </p>
                                    </div>
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
                        {currentTab === 3 && (
                            <div className="space-y-6">
                                {/* Back Arrow Icon */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <img src={back} alt="Back" onClick={() => setCurrentTab(currentTab - 1)} className="cursor-pointer" />
                                    <p className="text-lg font-bold">Preview</p>
                                </div>

                                {/* Product Image */}
                                <img src={image?.preview} alt="Product" className="w-full mb-4" />

                                {/* Product Details */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold">{form.watch("productName")}</h2>
                                    <p className="text-sm">Brand</p>
                                    <div className="flex items-center">
                                        <span className="text-xl font-bold">NGN {form.watch("price")}</span>
                                        <div className="ml-4 flex items-center">
                                            <img src={star} alt="Star" className="h-4 w-4 text-yellow-500" />
                                            <span className="ml-1">4.5 (12)</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-600">{form.watch("description")}</p>
                                </div>

                                {/* Size Selection */}
                                <FormField
                                    control={form.control}
                                    name="size"
                                    render={({ field }) => {
                                        const selectedSizes = field.value || [];

                                        const toggleSize = (size: string) => {
                                            if (selectedSizes.includes(size)) {
                                                // Remove size
                                                field.onChange(selectedSizes.filter((s: string) => s !== size));
                                            } else {
                                                // Add size
                                                field.onChange([...selectedSizes, size]);
                                            }
                                        };

                                        return (
                                            <FormItem>
                                                <FormLabel>Size</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-wrap gap-2">
                                                        {/* TODO: To make the sizes dynamic, data to be fetch from API */}
                                                        {['50', '51', '52', '53', '54', '55'].map((size) => (
                                                            <Button
                                                                key={size}
                                                                type="button"
                                                                onClick={() => toggleSize(size)}
                                                                className={`px-4 py-2 ${selectedSizes.includes(size)
                                                                    ? 'bg-[#051449] text-white'
                                                                    : 'bg-white text-[#051449] border border-[#051449]'
                                                                    }`}
                                                            >
                                                                {size}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />


                                {/* Submit Button */}
                                <Button className="w-full bg-[#051449] text-white py-3 mt-6" type="button"
                                    onClick={handleDone}>
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

export default AddProductForm;
