import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import star from "@/assets/gold-star.svg";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";

const Rating = () => {
    const ratings = [
        {
            name: "Item name",
            rating: 5.0,
            date: "20/08/2022",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet vestibulum elit cursus lectus et.",
        },
        {
            name: "Item name",
            rating: 5.0,
            date: "20/08/2022",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet vestibulum elit cursus lectus et.",
        },
        {
            name: "Item name",
            rating: 5.0,
            date: "20/08/2022",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet vestibulum elit cursus lectus et.",
        },
    ];
    const navigate = useNavigate();
    return (
        <div className="p-6 max-w-full mx-auto">
            {/* Header */}

            <div className="flex items-center gap-2 pt-5 mb-6 space-x-1">
                <img src={back} alt="" onClick={() => navigate(-1)} />

                <h2 className="text-xl font-bold pb-1">Rating</h2>
            </div>


            <Separator className="mb-4" />

            {/* Ratings List */}
            <div className="space-y-4">
                {ratings.map((rating, index) => (
                    <Card key={index} className="border rounded-lg">
                        <CardContent className="p-4">
                            <div className="flex flex-col justify-between items-start space-y-2">
                                <h2 className="text-base font-medium">{rating.name}</h2>

                                <div className="flex items-center space-x-1">
                                    <img src={star} alt="" />
                                    <p className="text-sm font-medium">{rating.rating}</p>
                                    <span className="text-gray-400">•</span>
                                    <p className="text-sm text-gray-500">{rating.date}</p>
                                </div>
                                
                            </div>
                            <p className="text-sm text-gray-600">{rating.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Rating;
