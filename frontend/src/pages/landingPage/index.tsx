
"use client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { cn } from "@/lib/utils";

export default function HeroUi() {
    const navigate = useNavigate();
    return (
        <div
            className="relative min-h-screen w-full overflow-hidden bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: 'url(/background.png)' }}
        >
            {/* Dark overlay for the background image */}
            {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}

            {/* Navbar */}
            <div className="relative z-20 mx-auto mt-4 max-w-7xl text-[#000000] px-4">
                <div className="bg-[#ffffffdc] rounded-2xl px-6 py-2 flex justify-between items-center shadow-md">
                    <div className="text-xl font-bold tracking-tight">
                         <img src="/Yunimall.svg" alt="Yunimall Logo" className="w-24 h-10 sm:h-12" />
                        {/* <img src="/yunimall-logo.jpg" alt="Yunimall Logo" className="h-10 sm:h-12 rounded-2xl" /> */}
                    </div>
                    <nav className="space-x-4 sm:space-x-6 font-medium text-sm sm:text-lg hidden md:flex">
                        {["Home", "About", "Services", "Contact"].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert(`${item} — Coming soon!`);
                                }}
                                className="hover:underline cursor-pointer"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-[#000000] text-white hover:bg-[#222121] hover:text-white dark:hover:bg-[#2B366F] shadow-md"
                        onClick={() => navigate('/create-account-buyer')}
                    >
                        Create Account →
                    </Button>
                </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-start justify-start min-h-[calc(100vh-100px)] px-4 sm:px-8 md:px-24 pt-16 sm:pt-20 text-white">
                <div className="border-0 rounded-2xl bg-black/50 w-full max-w-screen-md p-6 sm:p-8 md:p-12">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight">
                        Welcome To Yunimall
                    </h1>
                    <span className="italic font-light text-xl sm:text-2xl md:text-3xl block mt-2">
                        Your Campus Marketplace, Reinvented.
                    </span>

                    <p className="mt-4 text-base sm:text-lg text-gray-200">
                        Yunimall is your student-powered marketplace — built to connect student buyers with on-campus entrepreneurs, making it easy to discover, buy, and sell goods and services right within your university community.
                    </p>


                    <div className="mt-6 flex flex-col sm:flex-row gap-4 text-[#2B366F]">
                        <Button
                            size="lg"
                            className="bg-[#000000] hover:bg-[#222121] text-white w-full sm:w-auto"
                            onClick={() => navigate('/create-account-buyer')}
                        >
                            Become a Buyer!
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white text-[#000000] hover:bg-gray-300 shadow-xl w-full sm:w-auto"
                            onClick={() => navigate('/login')}
                        >
                            Login →
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}
