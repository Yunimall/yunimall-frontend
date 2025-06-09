import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import box from "@/assets/box.svg";
import search from "@/assets/search.svg";
import bag from "@/assets/bag.svg";
import Swal from "sweetalert2";

interface Deal {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageBlob: string;
}



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

    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve Emailfrom localStorage
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
    }, []);

    const handleLogout = (redirectUrl: string = "/login") => {
        return () => {
            localStorage.clear();

            Swal.fire({
                title: "Logged Out",
                text: "You have been logged out successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1600);
        };
    };
    return (

        // sidebar
        <div
            className={`pt-4 flex flex-col justify-between fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
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
                <div className="cursor-pointer font-bold">
                    Hi, {email}
                </div>
                <div className="cursor-pointer font-bold" onClick={() => navigate("/buyer/create-account-seller")}>
                    Create a store
                </div>
                <div className="cursor-pointer font-bold mt-2" onClick={handleLogout("/login")}>
                    Log out
                </div>
            </div>
        </div>
    );
};

const DealDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [deals, setDeals] = useState<Record<string, Deal[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // api url
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchDeals = async () => {
            const cached = localStorage.getItem("cachedDeals");

            if (cached) {
                // ✅ Use cached data
                setDeals(JSON.parse(cached));
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem("accessToken");

                const response = await axios.get(`${API_URL}/api/product`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const products: Deal[] = response.data;

                if (!Array.isArray(products) || products.length === 0) {
                    setDeals({});
                    setError("No products available.");
                } else {
                    const groupedDeals: Record<string, Deal[]> = {
                        topDeals: products.slice(0, 4),
                        schoolLife: products.slice(4, 7),
                        foodLife: products.slice(7, 9),
                        bestSelling: products.slice(9, 13),
                    };

                    setDeals(groupedDeals);
                    localStorage.setItem("cachedDeals", JSON.stringify(groupedDeals)); // ✅ Save to cache
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);


    const handleDealClick = (deal: Deal) => {
        navigate(`/buyer/deals/${deal.name.toLowerCase().replace(/\s+/g, '-')}`, { state: deal });
    };

    const handleCartClick = () => {
        navigate('/buyer/cart');
    };

    const renderSection = (title: string, items: Deal[] = [], grid: boolean = false) => {
        return (
            <div className="mt-6">
                <div className="flex justify-between p-2 pt-4">
                    <div className="font-bold">{title}</div>
                    <div className="text-[#051449] cursor-pointer">See All</div>
                </div>
                {items.length === 0 ? (
                    <p className="text-gray-500 p-2">No products in this category.</p>
                ) : (
                    <div className={grid ? "grid grid-cols-2 gap-4" : "flex space-x-4 overflow-x-auto scrollbar-hide p-2"}>
                        {items.map((deal) => (
                            <div key={deal.id} className="border rounded-md p-4 cursor-pointer min-w-[160px]" onClick={() => handleDealClick(deal)}>
                                <img src={deal.imageBlob} alt={deal.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                <h3 className="font-semibold">{deal.name}</h3>
                                <p className="text-gray-500">{deal.brand}</p>
                                <p className="text-black font-bold">₦{deal.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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

                {loading ? (
                    <p className="p-4 text-center">Loading products...</p>
                ) : error ? (
                    <p className="p-4 text-center text-red-500">{error}</p>
                ) : (
                    <>
                        {renderSection("Top Deal", deals.topDeals)}
                        {renderSection("School Life", deals.schoolLife)}
                        {renderSection("Food Is Life", deals.foodLife)}
                        {renderSection("Best Selling Items", deals.bestSelling, true)}
                    </>
                )}
            </div>
        </div>
    );
};

export default DealDashboard;