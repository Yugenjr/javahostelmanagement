import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/rooms" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Dashboard /></Layout>} />
        <Route path="/complaints" element={<Layout><Dashboard /></Layout>} />
        <Route path="/payments" element={<Layout><Dashboard /></Layout>} />
        <Route path="/reports" element={<Layout><Dashboard /></Layout>} />
        <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

