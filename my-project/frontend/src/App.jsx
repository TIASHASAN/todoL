// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error!', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>{data ? data.message : 'Loading...'}</h1>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Achieve from './pages/Achieve';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/achieve" element={<Achieve />} />
      </Routes>
    </Router>
  );
}

export default App;