exports.addTask = (req, res) => {
    const { title, description, deadline, element_id } = req.body;
    const user_id = req.user.id;
  
    db.query(
      'INSERT INTO tasks (title, description, deadline, element_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, deadline, element_id, user_id],
      (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('Task added');
      }
    );
  };
  
  exports.getTasks = (req, res) => {
    const user_id = req.user.id;
  
    db.query(
      'SELECT * FROM tasks WHERE user_id = ? AND element_id = ?',
      [user_id, req.params.element_id],
      (err, tasks) => {
        if (err) return res.status(500).send('Server error');
        res.json(tasks);
      }
    );
  };
  
  exports.addTaskElement = (req, res) => {
    const { element_name, frequency } = req.body;
    const user_id = req.user.id;
  
    db.query(
      'INSERT INTO task_elements (element_name, frequency, user_id) VALUES (?, ?, ?)',
      [element_name, frequency, user_id],
      (err) => {
        if (err) return res.status(500).send('Server error');
        res.send('Task element added');
      }
    );
  };
  