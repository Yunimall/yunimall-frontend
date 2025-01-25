import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "@/assets/back.svg";

const DeliveredOrderDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state; // Access the order data passed via state

    if (!order) return <p>order not found!</p>;

    return (
        <div className="max-w-full mx-auto ">
            {/* Back Button */}
            <img className='absolute p-5' src={back} alt="" onClick={() => navigate(-1)} />

            {/* Product Details */}
            <img
                src={order.image}
                alt={order.name}
                className="w-full h-[375px] object-cover"
            />

            <div className='p-5'>
                <div className='flex justify-between'>
                    <h1 className="text-md font-bold ">{order.name}</h1>
                    <div className='w-[67px] h-[24px] pb-1 flex items-center justify-center text-xs rounded-full bg-[#41CC7040]'>
                        <p>Delivered</p>
                    </div>
                </div>


                <div className='text-sm space-y-3'>
                    <p className="text-gray-500 mb-1 pt-5 pb-2 border-b">{order.brand}</p>
                    <div className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 pb-2">Order no.</span>
                        <span className="font-medium">{order.orderNo}</span>
                    </div>
                    <div className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 pb-2">Price</span>
                        <span className="font-bold">{order.price}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600 pb-2">Order date</span>
                        <span className="font-medium">{order.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveredOrderDetail;
