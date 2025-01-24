import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";

const formSchema = z.object({
    productName: z.string().nonempty("Product name is required"),
    brand: z.string().nonempty("Brand is required"),
    size: z.string().nonempty("Size is required"),
    price: z.string().nonempty("Price is required"),
    stock: z.string().nonempty("Number in stock is required"),
    deliveryDate: z.string().nonempty("Delivery date is required"),
    description: z.string().nonempty("Description is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddProductForm: React.FC = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            brand: "",
            size: "",
            price: "",
            stock: "",
            deliveryDate: "",
            description: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        navigate('/create-product/add-images');
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-6 md:p-8 overflow-y-auto">

                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-6">
                        <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                        <p className="text-lg font-bold">Add New Product</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
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
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="S">S</SelectItem>
                                                <SelectItem value="M">M</SelectItem>
                                                <SelectItem value="L">L</SelectItem>
                                                <SelectItem value="XL">XL</SelectItem>
                                            </SelectContent>
                                        </Select>
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

                        {/* Proceed Button */}
                        <Button className="w-full bg-[#051449] text-white py-3" type="submit">
                            Proceed
                        </Button>
                    </form>
                </div>
            </div>
        </Form>
    );
};

export default AddProductForm;
