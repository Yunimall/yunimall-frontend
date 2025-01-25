import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductCreationSuccess = () => {
    const navigate = useNavigate();

    const goToStore = () => {
        navigate('/');
    };

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center h-screen z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[400px] mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Congratulations</h1>
                <p className="text-gray-600 mb-6">Your product has been created. It's been reviewed and we'll get back to you soon</p>
                <Button
                    className="w-full bg-[#051449] text-white py-3"
                    onClick={goToStore}
                >
                    Go to store
                </Button>
            </div>
        </div>
    );
};

export default ProductCreationSuccess;