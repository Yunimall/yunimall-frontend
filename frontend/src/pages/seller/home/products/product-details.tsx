import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "@/assets/back.svg";
import right from "@/assets/arrow-right.svg";
import star from "@/assets/gold-star.svg";
import { Button } from '@/components/ui/button';

const ProductDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state; // Access the product data passed via state

    if (!product) return <p>Product not found!</p>;

    return (
        <div className="max-w-full mx-auto ">
            {/* Back Button */}
            <img className='absolute p-5' src={back} alt="" onClick={() => navigate(-1)} />

            {/* Product Details */}
            <img
                src={product.image}
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


                <p className="text-xl text-black font-bold mb-4">{product.price}</p>
                <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipis cing elit.
                    Ultricies eleifend eget ut proin id pulvi nar faucibus.
                    Vulputate massa eget ipsum mus nullam. Mauris praesent duis...
                </p>
                <div className='flex space-x-3 mt-4'>
                    <p className="text-black font-bold">Read More</p>
                    <img className='pt-1' src={right} alt="" />
                </div>

                <div className="flex flex-col mt-6 space-y-3">
                    <Button className="px-4 py-2 bg-[#051449] h-[48px] text-white rounded-md">Edit product</Button>
                    <Button className="px-4 py-2 bg-[#FFC7C7] h-[48px] text-[#F92D2D] font-bold rounded-md">Delete product</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
