import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import back from "@/assets/back.svg";
import { Button } from '@/components/ui/button';

const PendingOrderDetail: React.FC = () => {
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
                    <div className='w-[67px] h-[24px] pb-1 flex items-center justify-center text-xs rounded-full bg-[#F92D2D40]'>
                        <p>Pending</p>
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

                <div className="flex flex-col mt-6 space-y-3">
                    <Button className="px-4 py-2 bg-[#051449] h-[48px] text-white rounded-md">Mark as Delivered</Button>
                    <Button className="px-4 py-2 bg-[#FFC7C7] h-[48px] text-[#F92D2D] font-bold rounded-md">Cancel Order</Button>
                </div>
            </div>
        </div>
    );
};

export default PendingOrderDetail;
