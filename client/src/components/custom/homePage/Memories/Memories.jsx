import React from 'react';
import faculty1 from "@/./assets/faculty1.png";
import { useNavigate } from "react-router-dom";

const studentsImages = [
  faculty1, faculty1, faculty1, faculty1, faculty1, faculty1, faculty1, faculty1,
  faculty1, faculty1, faculty1, faculty1, faculty1, faculty1, faculty1, faculty1,
  faculty1, faculty1, faculty1, faculty1, faculty1, faculty1,
];

const Memories = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex justify-center items-center py-10">
      <div className="text-center">
        {/* Button to go back to Home */}
        <button
          onClick={goBackHome}
          className="mb-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 capitalize"
        >
          Go Back to Home
        </button>

        {/* Image grid with animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {studentsImages.map((image, index) => (
            <div
              key={index}
              className="max-w-sm rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ease-in-out"
            >
              <img
                src={image}
                alt="Student"
                className="min-w-[200px] w-full h-56 object-cover transition-all duration-300 transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memories;
