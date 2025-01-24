import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccountCreated = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-10 text-center">
                <p className="text-xl font-bold mb-3">Congratulations</p>
                <p className="text-lg mb-5">Your seller's account has been created</p>
                <Button className="bg-[#000080] text-white w-full py-3" onClick={() => navigate('/')}>
                    Okay
                </Button>
            </div>
        </div>
    );
};

export default AccountCreated;
