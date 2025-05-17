import { FaUserPlus, FaSearch, FaComments, FaHeart } from "react-icons/fa";

const steps = [
  {
    title: "Create an Account",
    description: "Sign up and create your profile with accurate biodata details.",
    icon: <FaUserPlus className="text-4xl text-pink-500" />,
  },
  {
    title: "Search & Filter",
    description: "Use filters to find biodata that matches your preferences.",
    icon: <FaSearch className="text-4xl text-purple-500" />,
  },
  {
    title: "Contact Information",
    description: "Send contact requests and start a secure conversation.",
    icon: <FaComments className="text-4xl text-rose-400" />,
  },
  {
    title: "Match & Proceed",
    description: "Find your perfect match and move ahead with confidence.",
    icon: <FaHeart className="text-4xl text-pink-600" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-pink-50 via-white to-rose-100 ">
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">
        How This Website Works
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl  p-6 text-center hover:border-pink-400 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-pink-100"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
