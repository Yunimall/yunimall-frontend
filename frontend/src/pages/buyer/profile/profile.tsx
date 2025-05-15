import { useState } from "react";
import { useNavigate } from "react-router-dom";
import star from "@/assets/star.svg";
// import search from "@/assets/search.svg";
// import bag from "@/assets/bag.svg";
import shoe from "@/assets/shoe.png";
import shirt from "@/assets/shirt.svg";
import phone from "@/assets/phone.png";
import controller from "@/assets/controller.png";
import lamp from "@/assets/lamp.svg";
// import cases from "@/assets/cases.svg";
import plant from "@/assets/plant.svg";
// import ramen from "@/assets/ramen.svg";
// import sushi from "@/assets/sushi.svg";
import back from "@/assets/back.svg";

interface Deal {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
}

const deals: Deal[] = [
    { id: 1, name: "Item Name", brand: "Brand", price: "$0", image: plant },
    { id: 2, name: "Item Name", brand: "Brand", price: "$0", image: lamp },
    { id: 3, name: "Item Name", brand: "Brand", price: "$0", image: phone },
    { id: 4, name: "Item Name", brand: "Brand", price: "$0", image: controller },
    { id: 5, name: "Item Name", brand: "Brand", price: "$0", image: shoe },
    { id: 6, name: "Item Name", brand: "Brand", price: "$0", image: shirt },
];

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("Popularity");

    const handleDealClick = (deal: Deal) => {
        navigate(`/buyer/deals/${deal.name.toLowerCase().replace(/\s+/g, '-')}`, { state: deal });
    };

    return (
        <div className="bg-white-500 bg-opacity-75 z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <h2 className="text-xl font-bold pb-1">Profile</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <img src="https://via.placeholder.com/80" alt="Seller" className="w-20 h-20 rounded-full border-2 border-yellow-400" />
                    <h2 className="font-bold text-lg text-center">Seller's name</h2>
                    <div className="flex items-center space-x-1">
                        <img src={star} alt="Star" className="w-4 h-4" />
                        <span className="text-sm">4.5 (12)</span>
                    </div>
                    <button className="px-4 py-1 border rounded-md text-blue-500 font-medium">Following</button>
                </div>

                {/* Product Section */}
                <div className="flex justify-between items-center mt-6">
                    <h3 className="font-bold text-lg">12 Products</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value="Popularity">Sort by: Popularity</option>
                        <option value="PriceLowHigh">Price: Low to High</option>
                        <option value="PriceHighLow">Price: High to Low</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {deals.map((deal) => (
                        <div key={deal.id} className="border rounded-lg p-2 cursor-pointer" onClick={() => handleDealClick(deal)}>
                            <img src={deal.image} alt={deal.name} className="w-full h-32 object-cover rounded-md mb-2" />
                            <h4 className="font-semibold text-sm">{deal.name}</h4>
                            <p className="text-gray-500 text-xs">{deal.brand}</p>
                            <p className="font-bold text-sm">{deal.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
