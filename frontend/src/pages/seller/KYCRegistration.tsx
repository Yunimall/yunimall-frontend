import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import back from "@/assets/back.svg";
import cameraIcon from "@/assets/camera.svg";
import { useNavigate } from "react-router-dom";

const KYCRegistration: React.FC = () => {
    const navigate = useNavigate();
    const [frontCard, setFrontCard] = useState<string | null>(null);
    const [backCard, setBackCard] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setCard: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCard(URL.createObjectURL(file));
        }
    };

    const handleProceed = () => {
        if (frontCard && backCard) {
            navigate('/create-account-seller/bvn-registration');
        } else {
            alert('Please upload both front and back pictures of your school I.D card.');
        }
    };

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-6 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                    <p className="text-lg font-bold">KYC Registration</p>
                </div>

                {/* Instruction */}
                <p className="text-sm text-gray-600 mb-8">
                    Take a front and back picture of your <span className="font-bold">school I.D card</span> to continue.
                </p>

                {/* Front of the Card */}
                <div className="mb-6">
                    <p className="text-sm font-semibold mb-2">Front of the card</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleFileChange(event, setFrontCard)}
                        className="hidden"
                        id="front-card-upload"
                    />
                    <label htmlFor="front-card-upload" className="border border-gray-300 rounded-lg w-full h-40 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                        {frontCard ? (
                            <img src={frontCard} alt="Front of the card" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <>
                                <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8" />
                                <p className="text-sm text-gray-500 mt-2">Click to start</p>
                            </>
                        )}
                    </label>
                </div>

                {/* Back of the Card */}
                <div className="mb-8">
                    <p className="text-sm font-semibold mb-2">Back of the card</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleFileChange(event, setBackCard)}
                        className="hidden"
                        id="back-card-upload"
                    />
                    <label htmlFor="back-card-upload" className="border border-gray-300 rounded-lg w-full h-40 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                        {backCard ? (
                            <img src={backCard} alt="Back of the card" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <>
                                <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8" />
                                <p className="text-sm text-gray-500 mt-2">Click to start</p>
                            </>
                        )}
                    </label>
                </div>

                {/* Proceed Button */}
                <Button className="w-full bg-[#051449] text-white py-3" type="button" onClick={handleProceed}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default KYCRegistration;
