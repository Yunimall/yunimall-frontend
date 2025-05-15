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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    gender: z.string().min(1, { message: "Please select a gender" }),
    university: z.string().min(1, { message: "Please select a university" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

const CreateAccountForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            gender: "",
            university: "",
            password: "",
            confirmPassword: "",
        },
    });
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submitted Data:", data);
        try {

            // // Only send startDate and endDate to the API
            const apidata = {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                gender: data.gender,
                universityAcronym: data.university,
                password: data.password
            };

            // Make the POST request with the token in the header
            const response = await axios.post("/api/user-management/register", apidata);

            console.log(response);
            localStorage.setItem("phone", data.phone);
            navigate("/verification");
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
    return (
        <div className="fixed inset-0 overflow-y-auto bg-opacity-50 flex md:items-center justify-center">
            <div className="bg-white sm:h-screen md:h-auto md:rounded-xl md:shadow-xl w-full max-w-xl p-6">
                {/* Back Button */}


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        {/* Buyer Info Tab */}
                        {currentTab === 0 && (
                            <div className="space-y-6 ">
                                <div className="flex flex-row space-x-3 pt-10">
                                    <button onClick={() => navigate(-1)} className="top-4 left-4">
                                        <img src={back} alt="Back" className="w-6 h-6" />
                                    </button>
                                    <p className="mt-1 font-bold">Create an account</p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    {...field}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+234800000000"
                                                    {...field}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="johndoe@example.com"
                                                    {...field}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="university"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>University</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select your university" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PAU">PAU</SelectItem>
                                                        <SelectItem value="CU">CU</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="text-sm text-gray-600">
                                    By signing up, you have agreed to our
                                    <a className="text-[#051449]" href="">
                                        {" "}
                                        privacy policy
                                    </a>{" "}
                                    and{" "}
                                    <a className="text-[#051449]" href="">
                                        terms & conditions
                                    </a>
                                    .
                                </div>
                                <Button
                                    type="button"
                                    className="w-full bg-[#051449] text-white rounded-md py-3 hover:bg-blue-800 transition duration-300"
                                    onClick={() => setCurrentTab(currentTab + 1)}
                                >
                                    Proceed
                                </Button>
                                <div className="text-center text-sm mt-4">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-[#051449]">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Password Tab */}
                        {currentTab === 1 && (
                            <div className="space-y-6">
                                <div className="flex flex-row space-x-3 pt-10">
                                    <button onClick={() => setCurrentTab(currentTab - 1)} className="top-4 left-4">
                                        <img src={back} alt="Back" className="w-6 h-6" />
                                    </button>
                                    <h1 className="font-bold">Password</h1>
                                </div>
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
                                    type="button"
                                    onClick={handleDone}
                                >
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

export default CreateAccountForm;