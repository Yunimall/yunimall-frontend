import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";
import cardImage from "@/assets/cards.svg"; // Assuming the illustration is saved as cards.svg

const SavedCard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white-500 bg-opacity-75 z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[600px] mx-auto p-4 md:p-4 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <h2 className="text-xl font-bold pb-1">Saved Card</h2>
                    </div>
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
                    <button onClick={() => navigate('/buyer/add-card')} className="w-full max-w-[300px] bg-[#051449] text-white py-3 rounded-md font-medium">
                        Add card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedCard;
