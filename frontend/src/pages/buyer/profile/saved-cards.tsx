import { useNavigate } from "react-router-dom";
import backIcon from "@/assets/back.svg";
import cardImage from "@/assets/cards.svg"; // Assuming the illustration is saved as cards.svg

const SavedCard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-10 md:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center mb-6 space-x-4">
                    <img src={backIcon} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                    <p className="mt-1 font-bold text-lg">Saved card</p>
                </div>

                {/* Card Illustration */}
                <div className="flex justify-center mb-8">
                    <img src={cardImage} alt="Saved Cards" className="w-60 h-40 object-contain" />
                </div>

                {/* No Card Text */}
                <div className="text-center mb-8">
                    <h2 className="font-bold text-lg">No Saved Card Yet</h2>
                    <p className="text-gray-500 text-sm mt-2">Add your card details to purchase with ease.</p>
                </div>

                {/* Add Card Button */}
                <div className="flex justify-center">
                    <button onClick={() => navigate('/buyer/add-card')} className="w-full max-w-[300px] bg-blue-900 text-white py-3 rounded-md font-medium">
                        Add card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedCard;
