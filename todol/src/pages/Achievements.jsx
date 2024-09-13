import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
  const [userAchievements, setUserAchievements] = useState([]);
  const [otherAchievements, setOtherAchievements] = useState([]);
  const navigate = useNavigate();

  // Fetch user completed tasks (achievements) from backend
  const fetchUserAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/userAchievements');
      setUserAchievements(response.data);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    }
  };

  // Fetch random achievements of other users
  const fetchOtherAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/otherAchievements');
      setOtherAchievements(response.data);
    } catch (error) {
      console.error('Error fetching other achievements:', error);
    }
  };

  useEffect(() => {
    fetchUserAchievements();
    fetchOtherAchievements();
  }, []);

  // Toggle visibility of a user’s achievement to other users
  const handleToggleAchievementVisibility = async (achievementId, isVisible) => {
    try {
      await axios.post(`http://localhost:5000/api/toggleAchievementVisibility`, { achievementId, isVisible });
      fetchUserAchievements();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  // Handle social media sharing
  const handleShareAchievement = (achievement) => {
    // You could integrate a third-party library like "react-share" here.
    const shareText = `Check out my achievement: ${achievement.title}`;
    const url = `https://mytodowebsite.com/achievements/${achievement.id}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`;
    
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Achievements</h1>

      {/* User's Achievements */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Completed Tasks</h2>
        <div className="space-y-4">
          {userAchievements.length > 0 ? (
            userAchievements.map((achievement, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                  <p className="text-sm text-gray-500">Completed on: {new Date(achievement.completedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-md ${achievement.isVisible ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    onClick={() => handleToggleAchievementVisibility(achievement.id, !achievement.isVisible)}
                  >
                    {achievement.isVisible ? 'Hide' : 'Show as Achievement'}
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleShareAchievement(achievement)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No completed tasks yet.</p>
          )}
        </div>
      </div>

      {/* Achievements from Other Users */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Other Users' Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherAchievements.length > 0 ? (
            otherAchievements.map((achievement, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
                <p className="text-sm text-gray-500">By: {achievement.username}</p>
              </div>
            ))
          ) : (
            <p>No public achievements available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
