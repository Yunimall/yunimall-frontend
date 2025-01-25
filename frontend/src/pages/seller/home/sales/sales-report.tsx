import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from "@/assets/back.svg";

const SalesReport: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto p-5 md:p-5">
            {/* Back Button */}
            <div className="flex flex-row space-x-3 pt-5 mb-6 ">
                <img src={back} alt="" onClick={() => navigate(-1)} />
                <div>
                    <h1 className="text-xl font-bold">Sales report</h1>
                </div>
            </div>

            {/* Promote Button */}
            <button className="w-full bg-[#051449] text-white py-3 rounded-md text-center font-medium mb-6">
                Promote your store
            </button>

            {/* Stats Section */}
            <div className="space-y-4">
                {/* Pending Orders */}
                <div className="bg-[#D2DFFF] h-[160px] p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>

                {/* Delivered Orders */}
                <div className="bg-[#FED440] h-[160px] p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">Delivered Orders</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>

                {/* Your Rating */}
                <div className="bg-[#A5FFC3] h-[160px] p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">Your Rating</h3>
                    <p className="text-2xl font-bold">4.6</p>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
