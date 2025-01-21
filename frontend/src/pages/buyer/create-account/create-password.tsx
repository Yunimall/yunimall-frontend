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
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";


const formSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

const CreatePassword = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate("/verification");
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto ">
                <div className="flex mb-5 space-x-4">
                        {/* Back Arrow Icon */}
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <p className="mt-1 font-bold">Password</p>

                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Confirm password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            className="w-full bg-[#051449] text-white py-3"
                            type="submit"
                        >
                            Done
                        </Button>

                    </form>
                </div>
            </div>
        </Form>

    );
};

export default CreatePassword;