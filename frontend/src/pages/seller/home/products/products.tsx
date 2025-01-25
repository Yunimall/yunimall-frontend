import { Button } from '@/components/ui/button';
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import profile from "@/assets/profile.png";
import right from "@/assets/right-arrow.svg";
import add from "@/assets/add.svg";
import vase from '@/assets/vase.png';
import plant from '@/assets/plant.png';
import phone from '@/assets/phone.png';
import controller from '@/assets/controller.png';


interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    image: string;
}

const products: Product[] = [
    { id: 1, name: 'Vase with Flowers', brand: 'Brand', price: '$0.00', image: vase },
    { id: 2, name: 'Potted Plant', brand: 'Brand', price: '$0.00', image: plant },
    { id: 3, name: 'Vintage Telephone', brand: 'Brand', price: '$0.00', image: phone },
    { id: 4, name: 'Game Controller', brand: 'Brand', price: '$0.00', image: controller },
];



const Dashboard = () => {

    const navigate = useNavigate();

    const handleProductClick = (product: Product) => {
        // Navigate to the product detail page
        const productRoute = product.name.toLowerCase().replace(/\s+/g, '-'); // Convert name to kebab-case
        navigate(`/products/${productRoute}`, { state: product }); // Pass product as state
    };


    return (
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1460px] lg:w-full mx-auto p-5 md:p-5 overflow-y-auto">
                {/* Header Section */}
                <div className='flex justify-between'>
                    <div className="flex flex-row space-x-3 mb-6 ">
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <div>
                            <h1 className="text-xl font-bold pb-2 pt-5">Hello, Ire</h1>
                            <p className="text-gray-500">Here is your dashboard</p>
                        </div>
                    </div>
                    <div>
                        <img
                            src={profile}
                            alt="Profile"
                            className="w-12 rounded-full object-cover pt-6"
                            onClick={() => navigate('/seller/profile')}
                        />
                    </div>
                </div>

                <div className='pb-4'>
                    <Button
                        onClick={() => navigate('/seller/sales-report')}
                        className="flex justify-between px-4 py-2 bg-[#051449] text-white rounded-md w-full h-[48px]">
                        Your sales report
                        <img
                            src={right}
                            alt="Profile"
                            className="w-5"
                        />
                    </Button>
                </div>


                {/* Buttons Section */}
                <div className="flex justify-between space-x-4 mb-6">

                    <Button
                        onClick={() => navigate('/seller/orders')}
                        className="w-[157px] h-[48px] flex items-center px-4 py-2 bg-[#FED440] text-[#333333] rounded-md">
                        Orders
                        <span className=" bg-[#333333] text-white text-sm w-5 h-5 flex justify-center rounded-full">
                            2
                        </span>
                    </Button>
                    <Button className="w-[157px] h-[48px] flex items-center px-4 py-2 bg-[#A5FFC3] text-[#333333] rounded-md">
                        <img
                            src={add}
                            alt="Profile"
                            className="w-5"
                        />
                        New product
                    </Button>
                </div>

                {/* Product List */}
                <h2 className="text-lg font-bold mb-4">Your Products</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-md p-4 cursor-pointer"
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-500">{product.brand}</p>
                            <p className="text-black font-bold">{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
