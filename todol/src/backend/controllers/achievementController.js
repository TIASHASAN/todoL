exports.markAsAchievement = (req, res) => {
    const { task_id, is_shared } = req.body;
    const user_id = req.user.id;
  
    db.query(
      'INSERT INTO achievements (task_id, user_id, is_shared) VALUES (?, ?, ?)',
      [task_id, user_id, is_shared],
      (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('Task marked as achievement');
      }
    );
  };
  
  exports.getAchievements = (req, res) => {
    db.query(
      'SELECT * FROM achievements WHERE is_shared = TRUE',
      (err, achievements) => {
        if (err) return res.status(500).send('Server error');
        res.json(achievements);
      }
    );
  };
  