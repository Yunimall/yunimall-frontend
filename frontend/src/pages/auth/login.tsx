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
import SplashScreen from "@/components/ui/splash-screen";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().min(6, "Email must be valid"),
    password: z.string().min(5, "Password must be at least 6 characters"),
});

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();
    const [showSplash, setShowSplash] = useState(false);
    const [loading, setLoading] = useState(false);

    // api url
    const API_URL = import.meta.env.VITE_API_URL;

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log("Submitted Data:", data);
        try {

            // // Only send startDate and endDate to the API
            const apidata = {
                email: data.email,
                password: data.password,
            };

            // Make the POST request with the token in the header
            const response = await axios.post(`${API_URL}/api/auth/login`, apidata);
            const token = response.data.accessToken
            console.log(response);
            localStorage.setItem("email", data.email);
            localStorage.setItem("accessToken", token);

            const decodedToken = jwtDecode(token) as {
                // id: string;
                // email: string;
                // firstName: string;
                // lastName?: string;
                role: string;
            };

            const { role } = decodedToken;

            // console.log("Decoded Token:", { id, email, firstName, lastName, role });

            // const capitalizedFirstName =
            //     firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            // localStorage.setItem("firstName", capitalizedFirstName);

            console.log(role)
            setShowSplash(true);

            // Navigate based on user role
            // Wait for 2 seconds before navigating
            setTimeout(() => {
                // Navigate based on role
                if (role === "seller") {
                    navigate("/seller");
                } else {
                    navigate("/buyer");
                }
            }, 2000);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "An unexpected error occurred.";
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: errorMessage,
                confirmButtonColor: "#003F88",
            });
        } finally {
            setLoading(false);
        }
    };

    if (showSplash) {
        return <SplashScreen />;
    }

    const handleDone = () => {
        form.handleSubmit(onSubmit)();
    };
    // };

    return (
        <Form {...form}>
            <div className=" fixed inset-0 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto flex flex-col justify-between h-full md:h-auto">
                    <div className="md:mb-48">  {/* This div will contain everything above the "Don't have an account?" */}
                        <div className="flex mb-5 space-x-4">
                            {/* Back Arrow Icon */}
                            <img src={back} alt="" onClick={() => navigate('/')} />
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
                                type="button"
                                onClick={handleDone}
                                loading={loading}
                            >

                                Log in
                            </Button>
                        </form>
                    </div>

                    <div className="mt-auto">  {/* This div ensures the content is at the bottom */}
                        <p className="text-center font-thin">
                            Don't have an account?
                            <a href="#" className="text-[#051449] font-bold hover:underline" onClick={() => navigate("/create-account-buyer")}> Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </Form>

    );
};

export default Login;