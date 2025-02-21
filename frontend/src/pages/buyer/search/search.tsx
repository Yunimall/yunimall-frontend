import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '@/assets/search.svg';
import backIcon from '@/assets/back.svg';
import plant1 from '@/assets/profile.png'; // Replace with actual image paths
import plant2 from '@/assets/shoe.png';
import phone from '@/assets/phone.png';
import controller from '@/assets/controller.png';

interface Item {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
}

const recommendedItems: Item[] = [
    { id: 1, name: "Item Name", brand: "Brand", price: "$0", image: plant1 },
    { id: 2, name: "Item Name", brand: "Brand", price: "$0", image: plant2 },
    { id: 3, name: "Item Name", brand: "Brand", price: "$0", image: phone },
    { id: 4, name: "Item Name", brand: "Brand", price: "$0", image: controller },
];

const RecommendedPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [sortBy, setSortBy] = useState("Recommended");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSortChange = (option: string) => {
        setSortBy(option);
        setShowPopup(false);
    };

    const handleReset = () => {
        setSortBy("Recommended");
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen bg-white relative">
            {/* Header */}
            <div className="flex items-center p-4 border-b">
                <button onClick={() => navigate(-1)}>
                    <img src={backIcon} alt="Back" className="w-5 h-5 mr-4" />
                </button>
                <h2 className="text-lg font-bold">Search</h2>
            </div>

            {/* Search and Sort */}
            <div className="p-4 space-y-4">
                {/* Search Bar */}
                <div className="flex items-center bg-gray-100 rounded-md p-2">
                    <img src={searchIcon} alt="Search" className="w-5 h-5 mr-2" />
                    <input
                        type="text"
                        placeholder="Search item"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent focus:outline-none flex-1"
                    />
                </div>

                {/* Sort Button */}
                <button
                    className="border rounded-md px-3 py-2 flex justify-between items-center w-full"
                    onClick={() => setShowPopup(true)}
                >
                    <span>Sort by: {sortBy}</span>
                    <span>▾</span>
                </button>
            </div>

            {/* Recommended Section */}
            <div className="px-4">
                <h3 className="font-bold text-lg mb-4">
                    {searchQuery ? `Results for "${searchQuery}"` : "Recommended"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {recommendedItems.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-2 cursor-pointer"
                            onClick={() => navigate(`/items/${item.id}`)}
                        >
                            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2" />
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-gray-500 text-xs">{item.brand}</p>
                            <p className="font-bold text-sm">{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup Sort Menu */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end flex-col z-50">
                    <div className="bg-white rounded-t-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg">Sort by:</h4>
                            <button onClick={handleReset} className="text-blue-500">Reset</button>
                        </div>
                        <div className="space-y-4">
                            {["Popular", "University", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSortChange(option)}
                                    className={`w-full text-left ${sortBy === option ? 'font-bold text-blue-600' : ''}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendedPage;
