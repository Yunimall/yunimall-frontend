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
    email: z.string().min(6, "Email must be valid"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        // navigate("/verification");
    };

    return (
        <Form {...form}>
            <div className=" fixed inset-0 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto flex flex-col justify-between h-full md:h-auto">
                    <div className="md:mb-48">  {/* This div will contain everything above the "Don't have an account?" */}
                        <div className="flex mb-5 space-x-4">
                            {/* Back Arrow Icon */}
                            <img src={back} alt="" onClick={() => navigate(-1)} />
                            <p className="mt-1 font-bold">Log In</p>
                        </div>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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

                            <div className="flex justify-end font-thin">
                                <a>Forgot password</a>
                            </div>

                            <Button
                                className="w-full bg-[#051449] text-white py-3"
                                type="submit"
                            >
                                Log in
                            </Button>
                        </form>
                    </div>

                    <div className="mt-auto">  {/* This div ensures the content is at the bottom */}
                        <p className="text-center font-thin">
                            Don't have an account?
                            <a href="#" className="text-[#051449] font-bold hover:underline"> Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </Form>

    );
};

export default Login;