
import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={cn('container mx-auto py-6 px-4 sm:px-6 animate-fade-in', className)}>
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Payroll System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
