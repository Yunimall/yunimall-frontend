import { useNavigate } from "react-router-dom";
import backIcon from "@/assets/back.svg";
import groupIcon from "@/assets/group.svg";
import mastercardLogo from "@/assets/mastercard.svg";
import userImage from "@/assets/shirt.svg";

const BProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex mb-5 space-x-4">
                    <img src={backIcon} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                    <p className="mt-1 font-bold">Profile</p>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center space-y-4 pb-6 border-b">
                    <img
                        src={userImage}
                        alt="User"
                        className="w-20 h-20 rounded-full border-2 border-yellow-400"
                    />
                    <h2 className="font-bold text-lg text-center">Your name</h2>
                    <div className="flex items-center space-x-1">
                        <img src={groupIcon} alt="Vendors" className="w-4 h-4" />
                        <span className="text-sm">30 vendors</span>
                    </div>
                    <button className="px-4 py-1 border rounded-md text-blue-500 font-medium">Edit profile</button>
                </div>

                {/* User Information */}
                <div className="mt-6 space-y-6">
                    {/* Name */}
                    <div className="pb-4 border-b">
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="font-semibold">Your Name</p>
                    </div>

                    {/* Address */}
                    <div className="pb-4 border-b">
                        <p className="text-gray-500 text-sm">Address</p>
                        <p className="font-semibold">Your Address</p>
                    </div>

                    {/* Phone */}
                    <div className="pb-4 border-b">
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="font-semibold">Your Number</p>
                    </div>

                    {/* Card Section */}
                    <div className="pb-4 border-b">
                        <p className="text-gray-500 text-sm">Your card</p>
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <p className="flex items-center">
                                    <span className="mr-2">•••• 1234</span>
                                    <img src={mastercardLogo} alt="Mastercard" className="w-6 h-6" />
                                </p>
                                <p className="text-gray-500 text-sm mt-1">12/34</p>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={() => navigate('/buyer/profile/saved-cards')} className="text-blue-500 text-sm font-medium" >Edit</button>
                                <button className="text-red-500 text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BProfile;
