import { Button } from '@/components/ui/button';
import back from "@/assets/back.svg";
import { useNavigate } from "react-router-dom";
import profile from "@/assets/profile.png";
import right from "@/assets/right-arrow.svg";
import add from "@/assets/add.svg";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageBlob: string;
    description: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // api url
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);

        const fetchProducts = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const res = await axios.get(`${API_URL}/api/product`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Ensure it's an array before setting
                if (Array.isArray(res.data)) {
                    console.log(res.data)
                    setProducts(res.data);
                } else {
                    console.error("Expected array but got:", res.data);
                    setProducts([]);
                    Swal.fire({
                        icon: "warning",
                        title: "No Products Found",
                        text: "The response was not an array of products.",
                    });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to load products.",
                });
                setProducts([]); // fallback to empty array to prevent .map() crash
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product: Product) => {
        const productRoute = product.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/seller/products/${productRoute}`, { state: product });
    };

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
        <div className="bg-white-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[1460px] lg:w-full mx-auto p-5 md:p-5 overflow-y-auto">
                {/* Header */}
                <div className='flex justify-between'>
                    <div className="flex flex-row space-x-3 mb-6">
                        <img src={back} alt="" onClick={() => navigate(-1)} />
                        <div>
                            <h1 className="text-xl font-bold pb-2 pt-5">Hello, {email}</h1>
                            <p className="text-gray-500">Here is your dashboard</p>
                            <div className="cursor-pointer font-bold mt-2" onClick={handleLogout()}>
                                Log out
                            </div>
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

                {/* Buttons */}
                <div className='pb-4'>
                    <Button
                        onClick={() => navigate('/seller/sales-report')}
                        className="flex justify-between px-4 py-2 bg-[#051449] text-white rounded-md w-full h-[48px]">
                        Your sales report
                        <img src={right} alt="right" className="w-5" />
                    </Button>
                </div>

                <div className="flex justify-between space-x-4 mb-6">
                    <Button
                        onClick={() => navigate('/seller/orders')}
                        className="w-[157px] h-[48px] flex items-center px-4 py-2 bg-[#FED440] text-[#333333] rounded-md">
                        Orders
                        <span className="bg-[#333333] text-white text-sm w-5 h-5 flex justify-center items-center rounded-full">
                            2
                        </span>
                    </Button>
                    <Button
                        onClick={() => navigate("/seller/create-product")}
                        className="w-[157px] h-[48px] flex items-center px-4 py-2 bg-[#A5FFC3] text-[#333333] rounded-md">
                        <img src={add} alt="add" className="w-5 mr-2" />
                        New product
                    </Button>
                </div>

                {/* Product List */}
                <h2 className="text-lg font-bold mb-4">Your Products</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : Array.isArray(products) && products.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p className="text-lg font-semibold">No products available.</p>
                        <p className="text-sm">Click "New product" to add your first one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
                        {Array.isArray(products) &&
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border rounded-md p-4 cursor-pointer"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <img
                                        src={product.imageBlob || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                        onError={(e) =>
                                            (e.currentTarget.src = "/placeholder.png")
                                        }
                                    />
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-gray-500">{product.brand}</p>
                                    <p className="text-black font-bold">₦{product.price}</p>
                                </div>
                            ))}
                    </div>
                )}


            </div>
        </div>
    );
};

export default Dashboard;
