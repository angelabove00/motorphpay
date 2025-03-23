
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="border-b glass-effect dark:glass-effect-dark sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3 transition-all-200 hover:opacity-80">
            <img 
              src="/motorph-logo.png" 
              alt="MotorPH Logo" 
              className="h-10 w-auto" 
            />
            <span className="font-medium tracking-tight text-lg">MotorPH Payroll</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/employees" 
            className="text-sm font-medium transition-all-200 hover:text-primary/80">
            Employees
          </Link>
          <Link 
            to="/payroll" 
            className="text-sm font-medium transition-all-200 hover:text-primary/80">
            Payroll
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm font-medium transition-all-200 hover:text-primary/80">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
