import { useState } from "react";
import { useNavigate } from "react-router-dom";
import box from "@/assets/box.svg";
import search from "@/assets/search.svg";
import bag from "@/assets/bag.svg";
import shoe from "@/assets/shoe.png";
import shirt from "@/assets/shirt.svg";
import phone from "@/assets/phone.png";
import controller from "@/assets/controller.png";
import lamp from "@/assets/lamp.svg";
import cases from "@/assets/cases.svg";
import plant from "@/assets/plant.svg";
import ramen from "@/assets/ramen.svg";
import sushi from "@/assets/sushi.svg";

interface Deal {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
}

const deals: Record<string, Deal[]> = {
    topDeals: [
        { id: 1, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: shoe },
        { id: 2, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: shirt },
        { id: 3, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: phone },
        { id: 4, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: controller },
    ],
    schoolLife: [
        { id: 5, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: lamp },
        { id: 6, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: cases },
        { id: 7, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: plant },
    ],
    foodLife: [
        { id: 8, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: ramen },
        { id: 9, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: sushi },
    ],
    bestSelling: [
        { id: 10, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: shoe },
        { id: 11, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: shirt },
        { id: 12, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: phone },
        { id: 13, name: "Item Name", brand: "Brand", price: "NGN 0.00", image: controller },
    ],
};

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

// Sidebar with Navigation Logic
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleNavigation = (item: string) => {
        switch (item) {
            case "My profile":
                navigate("/buyer/profile");
                break;
            case "Track Orders":
                navigate("/buyer/track-orders");
                break;
            case "Wishlist":
                navigate("/buyer/wishlist");
                break;
            case "Notification":
                navigate("/buyer/notifications");
                break;
            case "Customer Care":
                navigate("/buyer/customer-care");
                break;
            case "Rate":
                navigate("/buyer/rate");
                break;
            default:
                break;
        }
        toggleSidebar(); // Close sidebar after navigation
    };

    return (
        <div
            className={`pt-4 flex flex-col justify-between fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-50`}
        >
            <ul className="p-4 font-bold space-y-4">
                {["My profile", "Track Orders", "Wishlist", "Notification", "Customer Care", "Rate"].map(
                    (item, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer relative flex items-center"
                            onClick={() => handleNavigation(item)}
                        >
                            {item}
                            {idx === 1 && (
                                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    2
                                </span>
                            )}
                        </li>
                    )
                )}
            </ul>
            <div className="p-4 pb-12 mt-auto border-t">
                <div className="cursor-pointer font-bold" onClick={() => navigate("/create-store")}>
                    Create a store
                </div>
                <div className="cursor-pointer font-bold mt-2" onClick={() => navigate("/logout")}>
                    Log out
                </div>
            </div>
        </div>
    );
};

const DealDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const handleDealClick = (deal: Deal) => {
        navigate(`/deals/${deal.name.toLowerCase().replace(/\s+/g, '-')}`, { state: deal });
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const renderSection = (title: string, items: Deal[], grid: boolean = false) => (
        <div className="mt-6">
            <div className="flex justify-between p-2 pt-4">
                <div className="font-bold">{title}</div>
                <div className="text-[#051449] cursor-pointer">See All</div>
            </div>
            <div className={grid ? "grid grid-cols-2 gap-4" : "flex space-x-4 overflow-x-auto scrollbar-hide p-2"}>
                {items.map((deal) => (
                    <div key={deal.id} className="border rounded-md p-4 cursor-pointer min-w-[160px]" onClick={() => handleDealClick(deal)}>
                        <img src={deal.image} alt={deal.name} className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="font-semibold">{deal.name}</h3>
                        <p className="text-gray-500">{deal.brand}</p>
                        <p className="text-black font-bold">{deal.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gray-100">
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1460px] mx-auto p-5 overflow-y-auto relative z-10">
                <div className="m-2 pt-5 flex justify-between">
                    <img src={box} alt="Menu" onClick={toggleSidebar} className="cursor-pointer" />
                    <div className="flex space-x-6">
                        <img src={search} alt="Search" onClick={() => navigate("/buyer/search")} />
                        <img src={bag} alt="Bag" onClick={handleCartClick} />
                    </div>
                </div>
                {renderSection("Top Deal", deals.topDeals)}
                {renderSection("School Life", deals.schoolLife)}
                {renderSection("Food Is Life", deals.foodLife)}
                {renderSection("Best Selling Items", deals.bestSelling, true)}
            </div>
        </div>
    );
};

export default DealDashboard;
