import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import profile from "@/assets/profile.svg";
import icon from "@/assets/icon-profile.svg";
import mastercard from "@/assets/mastercard.svg";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-full mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                    <img src={back} alt="" onClick={() => navigate(-1)} />

                    <h2 className="text-xl font-bold pb-1">Profile</h2>
                </div>
                <div className="text-gray-600 font-black text-2xl">⋮</div>
            </div>

            {/* Profile Section */}
            <div className="text-center mb-6">
                <Avatar className="w-20 h-20 mx-auto mb-2">
                    <AvatarImage src={profile} alt="Profile picture" />
                    <AvatarFallback>YN</AvatarFallback>
                </Avatar>
                <h1 className="text-md font-bold">Your name</h1>


                <div className="flex items-center justify-center pt-2 space-x-1">
                    <img src={icon} alt="" />
                    <p className="text-gray-500 text-sm">30 vendors</p>
                </div>

                <Button variant="outline" className="mt-4 border-[#051449]">Edit profile</Button>
            </div>

            <Separator className="my-4" />

            {/* Store Information */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-sm text-gray-500">Store Name</h2>
                    <p className="text-md font-bold">Your Name</p>
                </div>

                <Separator className="my-4" />

                <div>
                    <h2 className="text-sm text-gray-500">Address</h2>
                    <p className="text-md font-bold">Your Address</p>
                </div>
                <Separator className="my-4" />
                <div>
                    <h2 className="text-sm text-gray-500">Phone</h2>
                    <p className="text-md font-bold">Your Number</p>
                </div>
            </div>

            <Separator className="my-4" />

            {/* Card Section */}
            <div>
                <h2 className="text-sm text-gray-500 mb-2">Your card</h2>
                <Card className="border-black rounded-lg">
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-1">
                            <div className="w-10 h-6 rounded-lg flex items-center justify-center">
                                ••••
                            </div>
                            <div className="w-10 h-6 rounded-lg flex items-center justify-center">
                                ••••
                            </div>
                            <p className="text-base font-medium">1234</p>
                        </div>
                        <div className="flex items-center space-x-2">
                        <img src={mastercard} alt="" />
                        </div>
                    </CardContent>
                    <CardContent className="flex items-center justify-between px-4 py-2">
                        <p className="text-sm">12/34</p>
                        <div className="flex">
                            <Button variant="link" size="sm">
                                Edit
                            </Button>
                            <div className="pt-1">
                                •
                            </div>
                            <Button variant="link" size="sm">
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
