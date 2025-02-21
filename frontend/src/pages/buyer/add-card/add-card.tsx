import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import back from "@/assets/back.svg";
import mastercardIcon from "@/assets/mastercard.svg";

// Zod Schema
const formSchema = z.object({
    cardNumber: z.string().nonempty("Card number is required"),
    expDate: z.string().nonempty("Expiring date is required"),
    cvv: z.string().nonempty("CVV is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddCardPage: React.FC = () => {
    const navigate = useNavigate();

    // React Hook Form with Zod Resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: "",
            expDate: "",
            cvv: "",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Card Added:", data);
        // Implement card submission logic here
    };

    return (
        <div className="bg-white flex justify-center items-center min-h-screen p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src={back}
                        alt="Back"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer"
                    />
                    <h2 className="text-lg font-bold">Add card</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Card Number */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Card Number</label>
                        <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1 ${errors.cardNumber ? 'border border-red-500' : ''}`}>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                {...register("cardNumber")}
                                className="flex-1 bg-transparent outline-none text-gray-700"
                            />
                            <img src={mastercardIcon} alt="Mastercard" className="w-8 h-6 ml-2" />
                        </div>
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                        )}
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="flex space-x-4 mb-4">
                        {/* Expiry Date */}
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">Expiring Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                {...register("expDate")}
                                className={`w-full bg-gray-100 rounded-lg px-3 py-2 mt-1 outline-none text-gray-700 ${errors.expDate ? 'border border-red-500' : ''}`}
                            />
                            {errors.expDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.expDate.message}</p>
                            )}
                        </div>

                        {/* CVV */}
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                placeholder="123"
                                {...register("cvv")}
                                className={`w-full bg-gray-100 rounded-lg px-3 py-2 mt-1 outline-none text-gray-700 ${errors.cvv ? 'border border-red-500' : ''}`}
                            />
                            {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold"
                    >
                        Add card
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCardPage;
