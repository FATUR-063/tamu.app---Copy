// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestList from './components/GuestList.js';
import AddGuest from './components/AddGuest.js';
import EditGuest from './components/EditGuest.js';
import History from './components/History.js';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-center text-4xl font-bold py-6 bg-blue-500 text-white">
          Buku Tamu Digital
        </h1>
        <Routes>
          <Route path="/" element={<GuestList />} />
          <Route path="/add" element={<AddGuest />} />
          <Route path="/edit/:id" element={<EditGuest />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;