import { useNavigate } from "react-router-dom";
import backIcon from '@/assets/back.svg';

const orders = [
    { id: 1, name: "Item Name", deliveryDate: "20 Aug" },
    { id: 2, name: "Item Name", deliveryDate: "20 Aug" },
    { id: 3, name: "Item Name", deliveryDate: "20 Aug" },
    { id: 4, name: "Item Name", deliveryDate: "20 Aug" },
];

const TrackOrders = () => {
    const navigate = useNavigate();

    const handleSeeMore = (id: number) => {
        navigate(`/buyer/track-orders/${id}`);
    };

    return (
        <div className="bg-white-500 bg-opacity-75  z-50 min-h-screen">
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
                <div className="flex flex-col space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-lg">{order.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Delivery date: <strong>{order.deliveryDate}</strong>
                            </p>
                            <button
                                onClick={() => handleSeeMore(order.id)}
                                className="font-semibold text-[#051449] mt-3 flex items-center hover:underline"
                            >
                                See More →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackOrders;
