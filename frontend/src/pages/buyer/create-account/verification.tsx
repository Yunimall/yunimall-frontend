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
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


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

    const [phone, setPhone] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve phonefrom localStorage
        const storedPhone = localStorage.getItem("phone");
        setPhone(storedPhone);
    }, []);

    // api url
    const API_URL = import.meta.env.VITE_API_URL;

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submitted Data:", data);
        try {

            // // Only send startDate and endDate to the API
            const apidata = {
                phone: phone,
                code: data.verification,
            };

            // Make the POST request with the token in the header
            const response = await axios.post(`${API_URL}/api/user-management/verify-code`, apidata);

            console.log(response);
            Swal.fire({
                title: "User registered & Verified",
                text: "User registered successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/login");
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

    const handleResend = async () => {
        try {

            const apidata = {
                phone: phone,
            };

            // Make the POST request with the token in the header
            const response = await axios.post(`${API_URL}/api/user-management/resend-code`, apidata);

            console.log(response);
            Swal.fire({
                title: "Code Resent",
                text: "Code Resent Successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
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
                        <p className="font-thin mb-4">We've sent a <a className="text-[#051449] font-bold" >6-digit code</a> to your number insert it to verify account</p>
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
                                            placeholder="&#x25CB;  &#x25CB;  &#x25CB;  &#x25CB;  &#x25CB;  &#x25CB;" // Grey circle characters

                                            maxLength={5}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <p className="font-thin">Didn't recieve a code?<a className="text-[#051449] font-bold" onClick={handleResend}> Resend</a></p>
                            <Button
                                className="w-full bg-[#051449] text-white py-3"
                                type="button"
                                onClick={handleDone}
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