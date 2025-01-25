import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";


const formSchema = z.object({
    verification: z.string().min(5, "Invalid Verification details"),
});

const Verification = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            verification: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate("/login");
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto ">
                    <div className="flex mb-5 space-x-4">
                        {/* Back Arrow Icon */}
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <p className="mt-1 font-bold">Verification</p>

                    </div>
                    <div>
                        <p className="font-thin mb-4">We've sent a <a className="text-[#051449] font-bold" >5-digit code</a> to your number insert it to verify account</p>
                    </div>


                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                        <FormField
                            control={form.control}
                            name="verification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="&#x25CB;  &#x25CB;  &#x25CB;  &#x25CB;  &#x25CB;" // Grey circle characters
                                            
                                            maxLength={5}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <p className="font-thin">Didn't recieve a code?<a className="text-[#051449] font-bold" > Resend</a></p>
                            <Button
                                className="w-full bg-[#051449] text-white py-3"
                                type="submit"
                            >
                                Verify
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Form >

    );
};

export default Verification;