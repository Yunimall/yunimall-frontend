import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "@/assets/back.svg";
import star from "@/assets/gold-star.svg";
import { Button } from '@/components/ui/button';
import vase from '@/assets/vase.png';
import plant from '@/assets/plant.png';
import phone from '@/assets/phone.png';
import controller from '@/assets/controller.png';
import { useCart } from "@/utils/CartContext";
import Swal from "sweetalert2";

interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
    imageBlob?: string;
}

const products: Product[] = [
    { id: 1, name: 'Vase with Flowers', brand: 'Brand', price: '$0.00', image: vase },
    { id: 2, name: 'Potted Plant', brand: 'Brand', price: '$0.00', image: plant },
    { id: 3, name: 'Vintage Telephone', brand: 'Brand', price: '$0.00', image: phone },
    { id: 4, name: 'Game Controller', brand: 'Brand', price: '$0.00', image: controller },
];


const DealDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state; // Access the product data passed via state

    if (!product) return <p>Product not found!</p>;

    // State to manage the quantity value
    const [quantity, setQuantity] = useState(1);

    // Function to handle increment
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle decrement
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: parseFloat(product.price.replace("₦", "")), // ensure number
            image: product.imageBlob || product.image,
            quantity
        })
        Swal.fire({
            title: "Item Added to Cart",
            text: "You have successfully added an item to cart.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        });
    }

    return (
        <div className="max-w-full mx-auto ">
            {/* Back Button */}
            <img className='absolute p-5' src={back} alt="" onClick={() => navigate(-1)} />

            {/* Product Details */}
            <img
                src={product.imageBlob}
                alt={product.name}
                className="w-full h-[375px] object-cover  mb-4"
            />

            <div className='p-5'>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                <div className='flex justify-between'>
                    <p className="text-gray-500 mb-1 text-sm">{product.brand}</p>
                    <div className='flex'>
                        <img src={star} alt="" /> <p>4.5(12)</p>
                    </div>
                </div>


                <p className="text-xl text-black font-bold mb-4">₦{product.price}</p>
                <p className="text-gray-600 text-sm">
                    rarrrr ipsum dolor sit amet, consectetur adipis cing elit.
                    Ultricies eleifend eget ut proin id pulvi nar faucibus.
                    Vulputate massa eget ipsum mus nullam. Mauris praesent duis...
                </p>

                <div className="flex items-center justify-between mt-4">
                    {/* Seller Info */}
                    <div className="flex flex-row items-center space-x-3">
                        <div>
                            <p className="text-gray-500 text-sm">Seller</p>
                            <img
                                src="https://via.placeholder.com/40" // Replace with actual seller image URL
                                alt="Seller"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        <div>
                            <p
                                className="font-semibold cursor-pointer text-[#051449] hover:underline"
                                onClick={() => navigate("/buyer/seller-profile")}
                            >
                                Ireayo Olota
                            </p>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div>
                        <p className="text-gray-500 text-sm">Quantity</p>
                        <div className="flex items-center border rounded-lg">
                            {/* Decrement Button */}
                            <button
                                className="px-2 py-1 text-lg text-gray-600"
                                onClick={handleDecrement}
                            >
                                −
                            </button>

                            {/* Quantity Display */}
                            <span className="px-3 py-1 font-semibold">{quantity}</span>

                            {/* Increment Button */}
                            <button
                                className="px-2 py-1 text-lg text-white bg-[#051449] rounded-r-lg"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-6 space-y-3">
                    <Button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-[#051449] h-[48px] text-white rounded-md"
                    >
                        Add to cart
                    </Button>
                </div>

                {/* Product List */}
                <h2 className="text-lg font-bold pt-6 pb-2">People also buy</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-md p-4 cursor-pointer"
                        // onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-500">{product.brand}</p>
                            <p className="text-black font-bold">{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealDetail;
