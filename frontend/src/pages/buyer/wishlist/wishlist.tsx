// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import star from "@/assets/star.svg";
import book from "@/assets/box.svg";
import cup from "@/assets/sushi.svg";
import plant from "@/assets/plant.png";
import cactus from "@/assets/shirt.svg";
import person from "@/assets/bag.svg";
import back from "@/assets/back.svg";

interface Item {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
}

const wishlistItems: Item[] = [
    { id: 1, name: "Book", brand: "Brand", price: "$0.00", image: book },
    { id: 2, name: "Cup", brand: "Brand", price: "$0.00", image: cup },
    { id: 3, name: "Plant", brand: "Brand", price: "$0.00", image: plant },
    { id: 4, name: "Cactus", brand: "Brand", price: "$0.00", image: cactus },
    { id: 5, name: "Person", brand: "Brand", price: "$0.00", image: person },
];

const WishlistPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRemoveClick = (id: number) => {
        // Implement remove functionality here
        console.log(`Removing item with id: ${id}`);
    };

    return (
        <div className="bg-white-500 bg-opacity-75 flex z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <h2 className="text-xl font-bold pb-1">Wishlist</h2>
                    </div>
                </div>

                <hr className="border-t border-gray-300 mb-5" />

                <div className="flex flex-col space-y-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-gray-500 text-sm">{item.brand}</p>
                                <button onClick={() => handleRemoveClick(item.id)} className="text-red-500 text-sm mt-1">Remove</button>
                            </div>
                            <p className="font-bold text-right">{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
