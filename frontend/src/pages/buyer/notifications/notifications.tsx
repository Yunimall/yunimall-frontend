import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";

interface Notification {
    id: number;
    title: string;
    message: string;
    deliveryDate: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        title: "Order Confirmed",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eleifend eget ut proin id pulvinar faucibus.",
        deliveryDate: "20 Aug",
    },
    {
        id: 2,
        title: "Order Confirmed",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eleifend eget ut proin id pulvinar faucibus.",
        deliveryDate: "20 Aug",
    },
    {
        id: 3,
        title: "Order Confirmed",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eleifend eget ut proin id pulvinar faucibus.",
        deliveryDate: "20 Aug",
    },
];

const NotificationPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-center gap-2 pt-5 mb-6">
                <img src={back} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer" />
                <h2 className="text-xl font-bold">Notification</h2>
            </div>

            <hr className="border-t border-gray-300 mb-5" />
            
            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold text-lg">{notification.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Delivery date: <span className="font-semibold">{notification.deliveryDate}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;
