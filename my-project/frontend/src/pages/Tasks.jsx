import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [timeCategories, setTimeCategories] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map(task => ({
        ...task, timeLimit: calculateTimeLimit(task.deadline),}));
      setTasks(updatedTasks);
      updateTimeCategories(updatedTasks);}, 86400000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task) => {
    const timeLimit = calculateTimeLimit(task.deadline);
    const updatedTask = {
      ...task,
      id: uuidv4(),
      timeLimit,
      streak: task.isRecursive ? 0 : null,
      lastStreakUpdate: null,
      completed: false,
    };
    const updatedTasks = [...tasks, updatedTask];
    setTasks(updatedTasks);
    updateTimeCategories(updatedTasks);
  };

  const calculateTimeLimit = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const diffTime = Math.abs(deadlineDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  };

  const updateTimeCategories = (updatedTasks) => {
    const groupedTasks = updatedTasks.reduce((acc, task) => {
      if (!acc[task.timeLimit]) {
        acc[task.timeLimit] = [];
      }
      acc[task.timeLimit].push(task);
      return acc;
    }, {});
    setTimeCategories(groupedTasks);
  };

  const markTaskAsDone = (taskId) => {
    const currentDate = new Date().toDateString();

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId && task.isRecursive) {
        if (task.lastStreakUpdate === currentDate) {
          alert('You can only update the streak once per day.');
          return task;
        }

        return { 
          ...task, streak: task.streak + 1, lastStreakUpdate: currentDate
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    updateTimeCategories(updatedTasks);
  };

  const markAsComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTimeCategories(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateTimeCategories(updatedTasks);
  };

  const editTask = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
    updateTimeCategories(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        className="w-1/4 bg-white p-4 border-r border-gray-200 overflow-y-auto"
        initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-lg font-semibold mb-4">To Do List</h2>
        <div className="mb-4">
          <label>Filter Tasks:</label>
          <select onChange={(e) => setFilter(e.target.value)} className="w-full p-2 border">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Search tasks..." className="w-full p-2 border" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        {Object.keys(timeCategories).map((category) => (
          <motion.div key={category} className="mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{category}</span>
              <span className="text-sm text-gray-500">({timeCategories[category].length})</span>
            </div>
          </motion.div>
        ))}
        {/* Button to navigate to achievements page */}
        <button
          onClick={() => navigate('/Achieve')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
          View Achievements
        </button>
      </motion.div>
      {/* Task List */}
      <motion.div
        className="w-3/4 bg-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-bold mb-4">Tasks</h3>
        <ul className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li key={task.id} className="bg-gray-100 p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{task.name}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">{task.timeLimit}</p>
                    {/* Display streak for recursive tasks */}
                    {task.isRecursive && (
                      <p className="text-sm text-gray-500">Streak: {task.streak} days</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => markAsComplete(task.id)}
                      className={`px-2 py-1 rounded ${
                        task.completed ? 'bg-green-500' : 'bg-blue-500'
                      } text-white`}>
                      {task.completed ? 'Completed' : 'Mark as Complete'}
                    </button>
                    {task.isRecursive && !task.completed && (
                      <button
                        onClick={() => markTaskAsDone(task.id)}
                        className="px-2 py-1 bg-yellow-500 rounded text-white">
                        Add Streak
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-2 py-1 bg-red-500 rounded text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>
      </motion.div>
      {/* Task Adder Sidebar */}
      <motion.div
        className="w-3/4 bg-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h3 className="text-xl font-bold mb-4">Add Task</h3>
        <form onSubmit={(e) => {e.preventDefault();
            const task = {
              name: e.target.name.value,
              description: e.target.description.value,
              deadline: e.target.deadline.value,
              isRecursive: e.target.isRecursive.checked,
            };
            addTask(task);
            e.target.reset();
          }}>
          <div className="mb-4">
            <label>Name</label>
            <input type="text" name="name" className="w-full p-2 border" required/>
          </div>
          <div className="mb-4">
            <label>Description</label>
            <textarea name="description" className="w-full p-2 border" required/>
          </div>
          <div className="mb-4">
            <label>Deadline</label>
            <input type="date" name="deadline" className="w-full p-2 border" required/>
          </div>
          <div className="mb-4">
            <label>
              <input type="checkbox" name="isRecursive"/> Recursive
            </label>
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
            Add Task
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Tasks;
