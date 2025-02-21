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
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50 min-h-screen">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1000px] lg:w-full mx-auto p-10 md:p-12 overflow-y-auto">
                {/* Header Section */}
                <div className="flex items-center mb-4 space-x-4">
                    <button onClick={() => navigate(-1)} className="cursor-pointer text-[#051449] font-bold text-lg">
                        <img src={backIcon} alt="Back" className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold">Track Order</h2>
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
