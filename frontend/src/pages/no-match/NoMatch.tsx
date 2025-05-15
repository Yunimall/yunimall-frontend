import { useNavigate } from "react-router-dom";

const NoMatch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6] p-4 text-center">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-5xl font-bold text-[#2B366F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#2B366F] text-white rounded-md hover:bg-[#1f285a] transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NoMatch;
