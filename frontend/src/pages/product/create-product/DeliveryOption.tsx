import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";

const DeliveryOptionForm: React.FC = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<string>('selectAll');

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleProceed = () => {
        if (selectedOption) {
            navigate('/create-product/preview');
        } else {
            alert('Please select a delivery option.');
        }
    };

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-6 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                    <p className="text-lg font-bold">Delivery Option</p>
                </div>

                {/* Instruction */}
                <p className="text-sm text-gray-600 mb-8">
                    Select a delivery option for this product. This action cannot be reversed.
                </p>

                {/* Delivery Options */}
                <div className="space-y-4">
                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'selectAll' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('selectAll')}>
                        <p className="font-semibold">Select all</p>
                        <p className="text-sm text-gray-600">
                            You are choosing both options and the buyer gets to decide which one to choose.
                        </p>
                    </div>
                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'doorDelivery' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('doorDelivery')}>
                        <p className="font-semibold">Door Delivery</p>
                        <p className="text-sm text-gray-600">
                            You are to deliver the product to the buyer's address.
                        </p>
                    </div>
                    <div className={`border p-4 rounded-lg cursor-pointer ${selectedOption === 'pickup' ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => handleOptionChange('pickup')}>
                        <p className="font-semibold">Pickup (Pick it up at the seller's address)</p>
                        <p className="text-sm text-gray-600">
                            The buyer gets to come over to your store to get the product.
                        </p>
                    </div>
                </div>

                {/* Proceed Button */}
                <Button className="w-full bg-[#051449] text-white py-3 mt-6" type="button" onClick={handleProceed}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default DeliveryOptionForm;