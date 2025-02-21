import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import mastercard from "@/assets/mastercard.svg";

export function CheckoutPage() {
    // Retrieve cart data from navigation state
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };

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

    // Payment Details
    const cardDetails = {
        lastFour: "1234",
        expiry: "12/34",
        brand: "mastercard",
    };

    // Calculate Total Price
    const itemsTotal = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    const totalPrice = itemsTotal + shippingFee;

    const navigate = useNavigate();

    const handleConfirmOrder = () => {
        navigate("/congratulations");
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
                    <button
                        className="text-[#051449] text-sm"
                        onClick={() => navigate("/buyer/add-card")}
                    >
                        Add new card
                    </button>
                </div>
                <Card className="mt-2">
                    <CardContent className="p-3 flex items-center justify-between ">
                        <div className="space-y-8">
                            <p className="text-lg font-semibold">•••• •••• •••• {cardDetails.lastFour}</p>
                            <p className="text-sm text-gray-500">{cardDetails.expiry}</p>
                        </div>
                        <div className="text-[#051449] text-sm space-y-8">
                            <img src={mastercard} alt="" className="pl-12" />
                            <button>Edit</button> <span>•</span> <button>Delete</button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary */}
            <div className="text-sm space-y-2 border-b pb-4">
                <div className="flex justify-between">
                    <p>Items total</p>
                    <p>${itemsTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
            </div>

            {/* Confirm Order Button */}
            <Button className="w-full mt-6 bg-[#051449] text-white py-3 text-lg rounded-lg" onClick={handleConfirmOrder}>
                Confirm order
            </Button>
        </div>
    );
}
