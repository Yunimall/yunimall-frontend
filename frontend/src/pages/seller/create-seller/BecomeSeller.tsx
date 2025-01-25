import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    storeName: z.string().nonempty("Store name is required"),
    businessType: z.string().nonempty("Business type is required"),
    matricNumber: z.string().nonempty("Matric number is required"),
    category: z.string().nonempty("Category is required"),
});

const SellerRegistration = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            storeName: "",
            businessType: "",
            matricNumber: "",
            category: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate('/create-account-seller/kyc-registration');
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto">

                    <div className="flex mb-5 space-x-4">
                        {/* Back Arrow Icon */}
                        <img src={back} alt="" onClick={() => navigate(-1)} />

                    </div>
                    <div className="flex mb-5 space-x-4">
                        <p className="mt-1 font-bold">Become a seller in less than 5 minutes</p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                        <FormField
                            control={form.control}
                            name="storeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your store name" className="w-full" />
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
                                    <FormLabel>Business Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select business type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="retail">Retail</SelectItem>
                                                <SelectItem value="wholesale">Wholesale</SelectItem>
                                                <SelectItem value="services">Services</SelectItem>
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
                                    <FormLabel>Matric Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your matric number" className="w-full" />
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
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="electronics">Electronics</SelectItem>
                                                <SelectItem value="fashion">Fashion</SelectItem>
                                                <SelectItem value="groceries">Groceries</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-[#051449] text-white py-3" type="submit">
                            Proceed
                        </Button>

                        <div className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <a href="#" className="text-[#051449 font-bold " onClick={() => navigate('/login')}>
                                Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </Form>
    );
};

export default SellerRegistration;