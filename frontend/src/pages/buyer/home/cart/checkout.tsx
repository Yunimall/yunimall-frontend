import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import mastercard from "@/assets/mastercard.svg";
import axios from "axios";
import Swal from "sweetalert2";




const formSchema = z.object({
    card_number: z.string().nonempty("Card number is required"),
    cvv: z.string().nonempty("CVV is required"),
    expiry_month: z.string().nonempty("Expiring month is required"),
    expiry_year: z.string().nonempty("Expiring year is required"),
    currency: z.string().nonempty("Currency number is required"),
    amount: z.string().nonempty("Amount is required"),
    email: z.string().nonempty("Email is required"),
    fullname: z.string().nonempty("Fullname is required"),
    phone_number: z.string().nonempty("Phone Number is required"),
});

export function CheckoutPage() {

    // Retrieve cart data from navigation state
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    const [loading, setLoading] = useState(false);

    const [authMode, setAuthMode] = useState<null | "pin" | "otp">(null);
    const [authPayload, setAuthPayload] = useState<any>(null);
    const [authField, setAuthField] = useState<Record<string, string>>({});
    const [_txRef, setTxRef] = useState<string | null>(null);
    const [flwRef, setFlwRef] = useState<string | null>(null);
    // const [pin, setPin] = useState("");
    const [otp, setOtp] = useState("");

    // Dummy user address
    const userAddress = {
        name: "Your Name",
        address: "Plot 13, Pan-Atlantic, Lekki",
        city: "Lagos",
        phone: "+2348169945591",
    };

    // Shipping Options
    const [shippingMethod, setShippingMethod] = useState("door-delivery");
    const shippingFee = shippingMethod === "door-delivery" ? 1000 : 0;


    // Calculate Total Price
    const itemsTotal = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    const totalPrice = itemsTotal + shippingFee;

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            card_number: "",
            cvv: "",
            expiry_month: "",
            expiry_year: "",
            currency: "NGN",
            amount: totalPrice.toFixed(2),
            email: "",
            fullname: "",
            phone_number: "",
        },
    });

    // api url
    const API_URL = import.meta.env.VITE_API_URL;

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log("Submitted Data:", data);
        try {
            // // Only send startDate and endDate to the API
            const apidata = {
                card_number: data.card_number,
                cvv: data.cvv,
                expiry_month: data.expiry_month,
                expiry_year: data.expiry_year,
                currency: data.currency,
                amount: data.amount,
                email: data.email,
                fullname: data.fullname,
                phone_number: data.phone_number,
            };


            const token = localStorage.getItem("accessToken"); // or whatever key you used

            // Make the POST request with the token in the header
            const response = await axios.post(
                `${API_URL}/api/payment`,
                apidata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response);
            if (response.data.status === "authorization_required") {
                const { mode, payload, auth_fields } = response.data;
                setAuthMode(mode); // e.g., "pin"
                setAuthPayload(payload);

                // ✅ Convert array to object: ["pin"] → { pin: "" }
                if (Array.isArray(auth_fields)) {
                    const structuredAuthFields = Object.fromEntries(
                        auth_fields.map((key: string) => [key, ""])
                    );
                    setAuthField(structuredAuthFields);
                } else {
                    setAuthField({});
                }

                setTxRef(payload.tx_ref);
            } else {
                navigate("/buyer/congratulations");
            }

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

    // handle authorize payment function
    const handleAuthorizePayment = async () => {
        setLoading(true);
        const payloadWithPin = {
            ...authPayload,
        };



        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.post(`${API_URL}/api/payment/authorize`, {
                payload: payloadWithPin,
                mode: authMode,
                auth_fields: authField,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if OTP is needed
            if (response.data.status === "otp_required") {
                setAuthMode("otp");
                setFlwRef(response.data.flw_ref); // save this for validation step
            } else {
                navigate("/buyer/congratulations");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Authorization Failed",
                text: "Please check your PIN or try again.",
                confirmButtonColor: "#003F88",
            });
        } finally {
            setLoading(false);
        }
    };

    // to validate otp
    const handleValidateOtp = async () => {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        try {
            await axios.post(`${API_URL}/api/payment/validate`, {
                otp,
                flw_ref: flwRef,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("cart");
            navigate("/buyer/congratulations");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "OTP Validation Failed",
                text: "Please try again with the correct OTP.",
                confirmButtonColor: "#003F88",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDone = () => {
        form.handleSubmit(onSubmit)();
    };


    return (
        <div className="p-6 max-w-lg mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                    <img src={back} alt="" onClick={() => navigate(-1)} />
                    <h2 className="text-xl font-bold pb-1">Checkout</h2>
                </div>
            </div>

            {/* Address Section */}
            <div className="border-b pb-4 mb-4 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-500">YOUR ADDRESS</p>
                    <button className="text-[#051449] text-sm bg-inherit">Change Address</button>
                </div>
                <p className="font-semibold">{userAddress.name}</p>
                <p className="text-sm text-gray-600">{userAddress.address}, {userAddress.city}</p>
                <p className="text-sm text-gray-600">{userAddress.phone}</p>
            </div>

            {/* Order Items */}
            <div className="border-b pb-4 mb-4">
                <p className="text-sm font-semibold text-gray-500">ORDER ITEM(S)</p>
                {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4 mt-2">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md" />
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-gray-500 text-sm">{item.brand}</p>
                            <p className="text-sm">x{item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delivery Method */}
            <div className="border-b pb-4 mb-4">
                <p className="text-sm font-semibold text-gray-500">SELECT A DELIVERY METHOD</p>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="mt-2 space-y-2">
                    <div className="flex items-start space-x-2 border p-3 rounded-lg">
                        <RadioGroupItem value="door-delivery" id="door" className="mt-1" />
                        <label htmlFor="door" className="flex-1 text-sm">
                            <p className="font-semibold">Door Delivery</p>
                            <p className="text-gray-500">Delivered by <strong>Thur 1 Sep</strong>. Shipping fee: <strong>NGN 1000</strong></p>
                        </label>
                    </div>
                    <div className="flex items-start space-x-2 border p-3 rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                        <label htmlFor="pickup" className="flex-1 text-sm">
                            <p className="font-semibold">Pickup (Pick it up at the seller's address)</p>
                            <p className="text-gray-500">Available from <strong>Thur 1 Sep</strong></p>
                        </label>
                    </div>
                </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-500">YOUR CARD</p>
                </div>

                {/* onsubmit, anything withing this form would be submitted */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Card Number */}
                        <FormField
                            control={form.control}
                            name="card_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                                            <Input
                                                placeholder="0000 0000 0000 0000"
                                                className="bg-transparent outline-none text-gray-700"
                                                {...field}
                                            />
                                            <img src={mastercard} alt="Mastercard" className="w-8 h-6 ml-2" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Expiry Month & Year */}
                        <div className="flex space-x-4">
                            <FormField
                                control={form.control}
                                name="expiry_month"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Expiry Month</FormLabel>
                                        <FormControl>
                                            <Input placeholder="MM" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="expiry_year"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Expiry Year</FormLabel>
                                        <FormControl>
                                            <Input placeholder="YY" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* CVV */}
                        <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Currency & Amount */}
                        <div className="flex space-x-4">
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Currency</FormLabel>
                                        <FormControl>
                                            <Input placeholder="NGN" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Fullname */}
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone Number */}
                        <FormField
                            control={form.control}
                            name="phone_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+234..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>

            {/* Order Summary */}
            <div className="text-sm space-y-2 border-b pb-4">
                <div className="flex justify-between">
                    <p>Items total</p>
                    <p>₦{itemsTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>₦{shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>₦{totalPrice.toFixed(2)}</p>
                </div>
            </div>

            {/* Confirm Order Button */}
            <Button className="w-full mt-6 bg-[#051449] text-white py-3 text-lg rounded-lg"
                type="button"
                onClick={handleDone}
                loading={loading}>
                Confirm order
            </Button>

            {/* Modal Overlay for OTP or PIN */}
            {(authMode === "otp" || (authMode === "pin" && authField)) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        {/* OTP Modal */}
                        {authMode === "otp" && (
                            <>
                                <h2 className="text-lg font-bold mb-4 text-center">Enter OTP</h2>
                                <label className="block text-sm font-semibold mb-1">One-Time Password</label>
                                <Input
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <Button
                                    className="mt-4 w-full bg-[#051449] text-white"
                                    onClick={handleValidateOtp}
                                    loading={loading}
                                >
                                    Validate OTP
                                </Button>
                            </>
                        )}

                        {/* PIN Modal */}
                        {authMode === "pin" && authField && (
                            <>
                                <h2 className="text-lg font-bold mb-4 text-center">Card Authentication</h2>
                                <div className="space-y-4">
                                    {Object.keys(authField).map((fieldKey) => (
                                        <div key={fieldKey}>
                                            <label className="block text-sm font-semibold mb-1">
                                                Enter your card {fieldKey.toUpperCase()}
                                            </label>
                                            <Input
                                                placeholder={`Enter ${fieldKey}`}
                                                type={fieldKey === "pin" ? "password" : "text"}
                                                value={authField[fieldKey]}
                                                onChange={(e) =>
                                                    setAuthField((prev) => ({
                                                        ...prev,
                                                        [fieldKey]: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    className="mt-4 w-full bg-[#051449] text-white"
                                    onClick={handleAuthorizePayment}
                                    loading={loading}
                                >
                                    Authorize with {authMode.toUpperCase()}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div >
    );
}
