import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/tasks');
        console.log('API response:', response.data);
        const allTasks = response.data.tasks;
        console.log('All tasks:', allTasks);
        const achievements = allTasks.filter(task => task.completed || task.streak >= 7);
        console.log('Filtered achievements:', achievements);
        setTasks(achievements);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides shown at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="w-full fixed top-0 left-0 bg-orange-500 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold cursor-pointer">
            To-Do App
          </h1>
          
          <div className="space-x-4">
            {/* Get Started Button */}
            <Link to="/register">
              <button className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                Get Started
              </button>
            </Link>

            {/* Login Button */}
            <Link to="/login">
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Motivational Quote Section */}
      <main className="flex-grow flex flex-col pt-24 pl-8">
        <div className="text-left px-4">
          <h2 className="text-4xl font-semibold text-orange-500 mt-20 mb-4">
            "Stay Organized, Stay Ahead!"
          </h2>
          <p className="text-gray-600 text-lg">
            Take control of your day by managing tasks efficiently with our easy-to-use To-Do app.
          </p>
        </div>

        {/* Carousel Component */}
        <div className="my-12 px-4">
          {loading ? (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <Slider {...settings}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="p-2 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-md font-semibold text-orange-500">{task.task_name}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 mt-4 bg-blue-100 text-blue-700 rounded-lg shadow-md w-full text-center">
                      <p className="text-lg font-semibold">Streak: {task.streak}</p>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className='text-gray-700 text-sm italic mt-2'>
                      {task.created_at} was the time the user started the task
                    </motion.p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-gray-600">No achievements to display.</p>
                </div>
              )}
            </Slider>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
