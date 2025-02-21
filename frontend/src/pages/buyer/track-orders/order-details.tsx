import { useNavigate, /*useParams*/ } from "react-router-dom";
import backIcon from '@/assets/back.svg';
import tick1 from '@/assets/tick1.svg';
import tick2 from '@/assets/tick2.svg';
import tick3 from '@/assets/tick3.svg';

const steps = [
    { id: 1, text: "Your order has been confirmed", date: "Sun, 20 Aug", icon: tick1, status: "completed" },
    { id: 2, text: "Your order has been dispatched", date: "Sun, 20 Aug", icon: tick2, status: "completed" },
    { id: 3, text: "You have received your order", date: "Sun, 20 Aug", icon: tick3, status: "completed" },
];

const OrderDetails = () => {
    const navigate = useNavigate();
    // const { id } = useParams();

    return (
        <div className="p-4">
            {/* Header with Back Button */}
            <div className="flex items-center mb-4 border-b pb-2">
                <button onClick={() => navigate(-1)} className="cursor-pointer text-[#051449] font-bold text-lg mr-2">
                    <img src={backIcon} alt="Back" className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold">Track order</h2>
            </div>

            {/* Order Steps */}
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start">
                        {/* Icon and Connector */}
                        <div className="relative flex flex-col items-center mr-4">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-md">
                                <img src={step.icon} alt={`Step ${step.id}`} className="w-5 h-5" />
                            </div>
                            {/* Connector Line */}
                            {index !== steps.length - 1 && (
                                <div className="w-1 flex-1 bg-gray-300"></div>
                            )}
                        </div>

                        {/* Step Details */}
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{step.text}</h3>
                            <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;
