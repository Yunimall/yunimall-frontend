import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tickGif from "@/assets/tick.gif"; // Replace with your actual tick GIF path
import sprinklesGif from "@/assets/sprinkles.gif"; // Replace with your actual sprinkles GIF path

export function CongratulationsPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center relative">
            {/* Sprinkles GIF in Background */}
            <img src={sprinklesGif} alt="Sprinkles Animation" className="absolute inset-0 w-full h-full object-cover z-0" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center bg-white p-6  max-w-sm">
                {/* Tick Animation */}
                <img src={tickGif} alt="Success Tick" className="w-16 h-16 mb-4" />

                {/* Text */}
                <h1 className="text-xl font-semibold">Congratulations</h1>
                <p className="text-gray-600 mt-2">Your card has been added</p>

                {/* Button */}
                <Button className="mt-6 bg-[#051449] text-white px-6 py-3 rounded-lg w-full" onClick={() => navigate("/buyer")}>
                    Okay
                </Button>
            </div>
        </div>
    );
}
