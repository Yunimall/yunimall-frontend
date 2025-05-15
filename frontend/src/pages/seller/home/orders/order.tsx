import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import back from "@/assets/back.svg";
import { useNavigate } from 'react-router-dom';
import shoe from '@/assets/shoe.png';

interface Order {
    id: number;
    name: string;
    brand: string;
    price: string;
    quantity: number;
    image:string;
    orderNo:string;
    date:string;
}

const Orders: React.FC = () => {
    const [_activeTab, setActiveTab] = useState("pending");

    const navigate = useNavigate();

    const orderData = [
        { id: 1, name: "Item name 1", brand: "Brand", quantity: 1, price: "$0.00", image: shoe, orderNo: "123456789", date: "12, Aug 2022, 2:00 pm" },
        { id: 2, name: "Item name 2", brand: "Brand", quantity: 1, price: "$0.00", image: shoe, orderNo: "123456790", date: "13, Aug 2022, 3:00 pm" },
        { id: 3, name: "Item name 3", brand: "Brand", quantity: 1, price: "$0.00", image: shoe, orderNo: "123456791", date: "14, Aug 2022, 4:00 pm" },
        { id: 4, name: "Item name 4", brand: "Brand", quantity: 1, price: "$0.00", image: shoe, orderNo: "123456792", date: "15, Aug 2022, 5:00 pm" },
        { id: 5, name: "Item name 5", brand: "Brand", quantity: 1, price: "$0.00", image: shoe, orderNo: "123456793", date: "16, Aug 2022, 6:00 pm" },
      ];

    const handlePendingOrderClick = (order: Order) => {
        // Navigate to the product detail page
        const orderRoute = order.name.toLowerCase().replace(/\s+/g, '-'); // Convert name to kebab-case
        navigate(`/seller/orders/pending/${orderRoute}`, { state: order }); // Pass product as state
    };

    const handleDeliveredOrderClick = (order: Order) => {
        // Navigate to the product detail page
        const orderRoute = order.name.toLowerCase().replace(/\s+/g, '-'); // Convert name to kebab-case
        navigate(`/seller/orders/delivered/${orderRoute}`, { state: order }); // Pass product as state
    };

    return (
        <div className="mx-auto p-5 md:p-5">
            <div className="flex items-center gap-2 pt-5 mb-6">
                <img src={back} alt="" onClick={() => navigate(-1)} />

                <h2 className="text-xl font-bold">Orders</h2>
            </div>

            <Tabs defaultValue="pending" onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-white">
                    <TabsTrigger value="pending" className="flex gap-2">
                        Pending <Badge className="w-5 h-5 rounded-full flex items-center justify-center bg-[#F92D2D] text-white">5</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                    {orderData.map((order) => (
                        <Card key={order.id} className="mb-2 cursor-pointer" onClick={() => handlePendingOrderClick(order)}>
                            <CardContent className="flex justify-between items-center p-3">
                                <div className="text-sm">
                                    <p className="font-bold">
                                        {order.quantity}x {order.name}
                                    </p>
                                    <p className="text-gray-500 text-xs ml-3 p-2">{order.brand}</p>
                                </div>
                                <p className="font-bold">{order.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="delivered">
                    {orderData.map((order) => (
                        <Card key={order.id} className="mb-2 cursor-pointer" onClick={() => handleDeliveredOrderClick(order)}>
                            <CardContent className="flex justify-between items-center p-3">
                                <div className="text-sm">
                                    <p className="font-bold">
                                        {order.quantity}x {order.name}
                                    </p>
                                    <p className="text-gray-500 text-xs ml-3 p-2">{order.brand}</p>
                                </div>
                                <p className="font-bold">{order.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Orders;
