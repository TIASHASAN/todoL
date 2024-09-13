import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [categories, setCategories] = useState(['1 day left', '1 week left', 'Reminder']);
  const [selectedCategory, setSelectedCategory] = useState('1 day left');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', category: '1 day left', isRecurring: false, frequency: '' });
  const navigate = useNavigate();

  // Fetch tasks based on the selected category
  const fetchTasks = async (category) => {
    try {
      // Replace with your backend endpoint
      const response = await axios.get(`http://localhost:5000/api/tasks?category=${category}`);
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    try {
      // Replace with your backend endpoint
      await axios.post('http://localhost:5000/api/tasks', newTask);
      setNewTask({ title: '', category: '1 day left', isRecurring: false, frequency: '' });
      fetchTasks(selectedCategory);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchTasks(category);
  };

  // Add or remove categories
  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category name');
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      fetchTasks(newCategory);
    }
  };

  const handleRemoveCategory = (category) => {
    if (categories.length > 1 && window.confirm(`Are you sure you want to remove the category "${category}"?`)) {
      setCategories(categories.filter(cat => cat !== category));
      if (selectedCategory === category) {
        setSelectedCategory(categories[0]);
        fetchTasks(categories[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex space-x-4 overflow-x-auto">
          {categories.map(category => (
            <div key={category} className="relative">
              <button
                className={`px-4 py-2 rounded-md ${category === selectedCategory ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-orange-400 transition`}
                onClick={() => handleCategoryChange(category)}
              >
                {category} ({tasks.filter(task => task.category === category).length})
              </button>
              <button
                className="absolute top-0 right-0 text-red-500 text-xs"
                onClick={() => handleRemoveCategory(category)}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4">Tasks - {selectedCategory}</h2>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
                {task.isRecurring && <p className="mt-2 text-gray-500">Frequency: {task.frequency}</p>}
              </div>
            ))
          ) : (
            <p>No tasks found for this category.</p>
          )}
        </div>
      </div>

      {/* Task Adder */}
      <div className="bg-white shadow-md p-6 fixed bottom-0 left-0 w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newTask.isRecurring}
              onChange={(e) => setNewTask({ ...newTask, isRecurring: e.target.checked })}
              className="mr-2"
            />
            <label className="text-gray-700">Recurring Task</label>
          </div>
          {newTask.isRecurring && (
            <select
              value={newTask.frequency}
              onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="twice-a-week">Twice a Week</option>
              <option value="monthly">Monthly</option>
            </select>
          )}
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
