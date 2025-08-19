// import { useNavigate } from "react-router-dom";
// import backIcon from '@/assets/back.svg';

// const orders = [
//     { id: 1, name: "Item Name", deliveryDate: "20 Aug" },
//     { id: 2, name: "Item Name", deliveryDate: "20 Aug" },
//     { id: 3, name: "Item Name", deliveryDate: "20 Aug" },
//     { id: 4, name: "Item Name", deliveryDate: "20 Aug" },
// ];

// const TrackOrders = () => {
//     const navigate = useNavigate();

//     const handleSeeMore = (id: number) => {
//         navigate(`/buyer/track-orders/${id}`);
//     };

//     return (
//         <div className="bg-white-500 bg-opacity-75  z-50 min-h-screen">
//             <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-4 md:p-4 overflow-y-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-1">
//                     <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
//                         <img src={backIcon} alt="" onClick={() => navigate(-1)} />
//                         <h2 className="text-xl font-bold pb-1">Track Order</h2>
//                     </div>
//                 </div>

//                 {/* Line Separator */}
//                 <hr className="border-t border-gray-300 mb-5" />

//                 {/* Orders List */}
//                 <div className="flex flex-col space-y-4">
//                     {orders.map((order) => (
//                         <div key={order.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                             <h3 className="font-semibold text-lg">{order.name}</h3>
//                             <p className="text-gray-600 text-sm mt-1">
//                                 Delivery date: <strong>{order.deliveryDate}</strong>
//                             </p>
//                             <button
//                                 onClick={() => handleSeeMore(order.id)}
//                                 className="font-semibold text-[#051449] mt-3 flex items-center hover:underline"
//                             >
//                                 See More →
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TrackOrders;


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backIcon from '@/assets/back.svg';
interface Order {
    id: number;
    name: string;
    deliveryDate: string;
    status?: string;
    totalAmount?: number;
    // what re all the properties?
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
                setLoading(true);
                const response = await fetch('/api/orders/user/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch orders');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSeeMore = (id: number) => {
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
                            <div key={order.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-lg">{order.name}</h3>
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