import { useNavigate } from "react-router-dom";
import BackIcon from '@/assets/back.svg';


const vendors = [
    { id: 1, name: "Vendor Name", rating: 4.5, reviews: 12 },
    { id: 2, name: "Vendor Name", rating: 4.5, reviews: 12 },
    { id: 3, name: "Vendor Name", rating: 4.5, reviews: 12 },
    { id: 4, name: "Vendor Name", rating: 4.5, reviews: 12 },
    { id: 5, name: "Vendor Name", rating: 4.5, reviews: 12 },
    { id: 6, name: "Vendor Name", rating: 4.5, reviews: 12 },
];

const FollowedVendors = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center mb-4">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <img src={BackIcon} alt="Back" className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold">Followed vendors</h2>
            </div>

            {/* Vendor List */}
            <div className="space-y-4">
                {vendors.map((vendor) => (
                    <div
                        key={vendor.id}
                        className="flex justify-between items-center border-b pb-3"
                    >
                        <div>
                            <h3 className="font-semibold">{vendor.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="text-yellow-500 mr-1">⭐</span>
                                {vendor.rating} ({vendor.reviews})
                            </div>
                        </div>

                        <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full text-sm">
                            Following
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowedVendors;
