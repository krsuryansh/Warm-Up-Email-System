import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
