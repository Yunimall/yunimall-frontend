import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import vase from '@/assets/vase.png';
import controller from '@/assets/controller.png';

export function Cart() {
    // Sample cart items (replace with actual data from backend)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Item Name", brand: "Brand", price: 0.0, quantity: 1, image: vase },
        { id: 2, name: "Item Name", brand: "Brand", price: 0.0, quantity: 1, image: controller },
        { id: 3, name: "Item Name", brand: "Brand", price: 0.0, quantity: 1, image: controller },
        { id: 4, name: "Item Name", brand: "Brand", price: 0.0, quantity: 1, image: controller },
    ]);

    // Handle quantity change
    const updateQuantity = (id: number, change:number ) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        );
    };

    // Handle item removal
    const removeItem = (id:number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const navigate = useNavigate();

    // Handle checkout button click
    const handleCheckout = () => {
        // Navigate to the checkout page and pass cart data as state
        navigate("/buyer/checkout", { state: { cartItems } });
    };
    

    return (
        <div className="p-6 max-w-full mx-auto flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                    <img src={back} alt="" onClick={() => navigate(-1)} />
                    <h2 className="text-xl font-bold pb-1">Your Cart</h2>
                </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 border-b pb-4">
                        {/* Item Image */}
                        <img src={item.image} alt={item.name} className="w-24 h-24" />

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-gray-500 text-sm">{item.brand}</p>
                            {/* Quantity Selector */}
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, -1)}
                                >
                                    −
                                </Button>
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    readOnly
                                    className="w-10 text-center border-none"
                                />
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-[#051449] text-white"
                                    onClick={() => updateQuantity(item.id, 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between space-y-12">
                            {/* Price */}
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                            {/* Remove Button */}
                            <button
                                className="text-red-500 text-sm"
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Button */}
            <Button
                className="w-full mt-6 bg-[#051449] text-white py-3 text-lg rounded-lg"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </div>
    );
}