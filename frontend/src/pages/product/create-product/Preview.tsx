import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import star from "@/assets/star.svg";
import back from "@/assets/back.svg";
import sample from "@/assets/sample.svg";

const formSchema = z.object({
    size: z.string().nonempty("Please select a size"),
});

const ProductPreview = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            size: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate('/create-product/success');
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[400px] mx-auto p-6 overflow-y-auto">
                    {/* Back Arrow Icon */}
                    <div className="flex items-center space-x-4 mb-6">
                        <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                        <p className="text-lg font-bold">Preview</p>
                    </div>

                    {/* Product Image */}
                    <img src={sample} alt="Product" className="w-full mb-4" />

                    {/* Product Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">Item Name</h2>
                        <p className="text-sm">Brand</p>
                        <div className="flex items-center">
                            <span className="text-xl font-bold">NGN 4,000</span>
                            <div className="ml-4 flex items-center">
                                <img src={star} alt="Star" className="h-4 w-4 text-yellow-500" />
                                <span className="ml-1">4.5 (12)</span>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipis cing elit. Ultricies eleifend eget ut proin id pulvi nar faucibus. Vulputate massa eget ipsum mus nullam. Mauris praesent duis...</p>
                    </div>

                    {/* Size Selection */}
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                    <div className="flex space-x-2">
                                        {['40', '41', '42', '43', '44', '45'].map((size) => (
                                            <Button
                                                key={size}
                                                type="button"
                                                onClick={() => field.onChange(size)}
                                                className={`px-4 py-2 ${field.value === size ? 'bg-[#051449] text-white' : 'bg-white text-[#051449] border border-[#051449]'}`}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button className="w-full bg-[#051449] text-white py-3 mt-6" type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Done
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default ProductPreview;