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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    bvn: z.string().nonempty("BVN is required"),
});

const KYCRegistration1 = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bvn: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate('/create-account-seller/account-created');
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
                        <p className="mt-1 font-bold">KYC registration</p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                        <FormField
                            control={form.control}
                            name="bvn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your BVN</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Your BVN" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-sm text-gray-600">
                            <p><span className="font-bold">Why BVN?</span> - This enable us confirm if your identity tally with the other provided details.</p>
                        </div>
                        <Button className="w-full bg-[#051449] text-white py-3" type="submit">
                            Done
                        </Button>
                    </form>
                </div>
            </div>
        </Form>
    );
};

export default KYCRegistration1;
