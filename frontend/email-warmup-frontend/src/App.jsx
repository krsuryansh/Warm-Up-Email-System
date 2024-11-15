import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import SmtpSettingsForm  from './Component/Set-smtp.jsx';
import EmailForm from './Component/Email-form.jsx';
import Dashboard from './Component/Dashboard.jsx';


function App() {
  return (
    <Router>
      <div>
        {/* Navbar remains the same across pages */}
        <Navbar />
        
        {/* Page content changes based on route */}
        <div className="container mx-auto min-h-min h-screen">
          <Routes>
            <Route path="/" element={<EmailForm />} />
            <Route path="/Set-smtp" element={<SmtpSettingsForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
