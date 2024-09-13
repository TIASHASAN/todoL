import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

// Sample images for the carousel
const carouselImages = [
  'https://via.placeholder.com/100x100?text=Image+1',
  'https://via.placeholder.com/100x100?text=Image+2',
  'https://via.placeholder.com/100x100?text=Image+3',
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center px-10 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          MyLogo
        </div>
        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-10">
        {/* Text Section */}
        <section className="text-center my-12">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Welcome to My To-Do List App!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your tasks efficiently with our simple and intuitive platform. Stay organized and never miss a deadline again.
          </p>
        </section>

        {/* Carousel Section */}
        <h2 className="text-3xl font-bold text-center mb-6">
            User Achievements
        </h2>
        <Slider {...carouselSettings}>
            {carouselImages.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`Carousel Image ${index + 1}`}
                    className="w-full h-auto object-cover"/>
                </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
