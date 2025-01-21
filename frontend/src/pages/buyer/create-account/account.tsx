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

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    gender: z.string().min(1, { message: "Please select a gender" }),
    university: z.string().min(1, { message: "Please select a university" }),
});

const CreateAccountForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            gender: "",
            university: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        navigate("/create-password");
    };

    return (
        <Form {...form}>
            <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto ">

                    <div className="flex mb-5 space-x-4">
                        {/* Back Arrow Icon */}
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <p className="mt-1 font-bold">Create an account</p>

                    </div>


                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
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
                                                <SelectItem value="university1">University 1</SelectItem>
                                                <SelectItem value="university2">University 2</SelectItem>
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
                            className="w-full bg-[#051449] text-white py-3"
                            type="submit"
                        >
                            Proceed
                        </Button>
                        <div className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <a href="#" className="text-[#051449]">
                                Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </Form>

    );
};

export default CreateAccountForm;