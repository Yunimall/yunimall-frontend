import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backIcon from '@/assets/back.svg';

const API_URL = import.meta.env.VITE_API_URL;

interface Order {
    id: string; // UUID from backend
    name: string;
    deliveryDate: string;
    status?: string;
    totalAmount?: number;
    // Add more fields here if backend sends them (items, seller, etc.)
}

const TrackOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) throw new Error("No access token found");

                setLoading(true);
                const response = await fetch(`${API_URL}/api/orders/user/orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const text = await response.text(); // get raw response
                console.log("Orders API raw response:", text);

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status} - ${text}`);
                }

                const data = JSON.parse(text);
                setOrders(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch orders");
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSeeMore = (id: string) => {
        navigate(`/buyer/track-orders/${id}`);
    };

    // Loading state
    if (loading) {
        return (
            <div className="bg-white-500 bg-opacity-75 z-50 min-h-screen">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                            <img src={backIcon} alt="" onClick={() => navigate(-1)} />
                            <h2 className="text-xl font-bold pb-1">Track Order</h2>
                        </div>
                    </div>
                    <hr className="border-t border-gray-300 mb-5" />
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-600">Loading orders...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white-500 bg-opacity-75 z-50 min-h-screen">
                <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                            <img src={backIcon} alt="" onClick={() => navigate(-1)} />
                            <h2 className="text-xl font-bold pb-1">Track Order</h2>
                        </div>
                    </div>
                    <hr className="border-t border-gray-300 mb-5" />
                    <div className="flex justify-center items-center py-8">
                        <div className="text-red-600">Error: {error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white-500 bg-opacity-75 z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                        <img src={backIcon} alt="" onClick={() => navigate(-1)} />
                        <h2 className="text-xl font-bold pb-1">Track Order</h2>
                    </div>
                </div>
                {/* Line Separator */}
                <hr className="border-t border-gray-300 mb-5" />

                {/* Orders List */}
                {orders.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold text-lg">{order.id}</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Delivery date: <strong>{order.deliveryDate}</strong>
                                </p>
                                {order.status && (
                                    <p className="text-gray-600 text-sm mt-1">
                                        Status: <strong>{order.status}</strong>
                                    </p>
                                )}
                                <button
                                    onClick={() => handleSeeMore(order.id)}
                                    className="font-semibold text-[#051449] mt-3 flex items-center hover:underline"
                                >
                                    See More →
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-600">No orders found</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrders;
