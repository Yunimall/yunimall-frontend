import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";
import cameraIcon from "@/assets/camera.svg";

const AddImagesForm: React.FC = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleProceed = () => {
        if (image) {
            navigate('/create-product/delivery-option');
        } else {
            alert('Please upload an image.');
        }
    };

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-6 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                    <p className="text-lg font-bold">Add Images</p>
                </div>

                {/* Instruction */}
                <p className="text-sm text-gray-600 mb-8">
                    Images need to be at least 500 x 500 pixels and a maximum of 1200 x 1200 pixels.
                </p>

                {/* Image Upload */}
                <div className="mb-8">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="border border-gray-300 rounded-lg w-full h-60 flex flex-col items-center justify-center bg-gray-100 cursor-pointer">
                        {image ? (
                            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <>
                                <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8" />
                                <p className="text-sm text-gray-500 mt-2">Browse</p>
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

export default AddImagesForm;
