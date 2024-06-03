import { useState } from 'react'

import './App.css'
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ListPage from './components/ListPage';
import AppPage from './components/AppPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
  
}

export default App
