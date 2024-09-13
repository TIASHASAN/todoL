const express = require('express');
const { markAsAchievement, getAchievements } = require('../controllers/achievementController');
const router = express.Router();

router.post('/mark-achievement', markAsAchievement);
router.get('/achievements', getAchievements);

module.exports = router;
