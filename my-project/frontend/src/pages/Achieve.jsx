import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTasks } from '../api/api';

const Achievements = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        console.log('Fetched tasks:', fetchedTasks);
        setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const shareTask = (task) => {
    const shareData = {
      title: task.task_name,
      text: task.description,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Task shared successfully'))
        .catch((error) => console.log('Error sharing task:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  const filteredStreakTasks = tasks.filter(task => task.streak >= 7);
  const filteredCompletedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white py-4 px-8 flex justify-between items-center">
        <motion.h1 className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          Achievements
        </motion.h1>
        <Link to="/tasks">
          <motion.button
            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded shadow-md hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Go to Tasks
          </motion.button>
        </Link>
      </div>

      {loading ? (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Completed Tasks */}
          <motion.div className="bg-white p-6 shadow-md rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
            {filteredCompletedTasks.length > 0 ? (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {filteredCompletedTasks.map((task, idx) => (
                  <motion.li key={idx} className="border p-4 rounded mb-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    <h3 className="text-lg font-semibold">{task.task_name}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    {/* Share Button */}
                    <button
                      onClick={() => shareTask(task)}
                      className="bg-orange-500 text-white mt-4 px-4 py-2 rounded shadow-md hover:bg-orange-600 transition-all duration-300">
                      Share Task
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </motion.div>
          {/* Tasks with Streak >= 7 */}
          <motion.div
            className="bg-white p-6 shadow-md rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-semibold mb-4">Tasks with 7-Day Streak</h2>
            {filteredStreakTasks.length > 0 ? (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {filteredStreakTasks.map((task, idx) => (
                  <motion.li key={idx} className="border p-4 rounded mb-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    <h3 className="text-lg font-semibold">{task.task_name}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <p className="text-green-600 font-semibold">{task.streak}-day streak</p>
                    {/* Share Button */}
                    <button onClick={() => shareTask(task)}
                      className="bg-orange-500 text-white mt-4 px-4 py-2 rounded shadow-md hover:bg-orange-600 transition-all duration-300">
                      Share Task
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="text-gray-500">No tasks with a 7-day streak yet.</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
