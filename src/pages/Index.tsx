
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout className="max-w-5xl">
      <div className="flex flex-col items-center justify-center pt-8 pb-16 text-center animate-fade-in">
        <img 
          src="/motorphlogo.png" 
          alt="MotorPH Logo" 
          className="h-28 w-auto mb-6 animate-fade-in" 
        />
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          MotorPH Payroll System
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          A simple, intuitive, and powerful payroll system for managing employee information, work hours, and salary calculations for MotorPH.
        </p>
        
        <div className="flex gap-4 mb-16">
          <Button size="lg" onClick={() => navigate('/employees')}>
            View Employees
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/payroll')}>
            Calculate Payroll
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <Card className="transition-all-200 hover:shadow-md animate-slide-up">
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
              <CardDescription>Manage your employee database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                View and manage employee details including employee numbers, names, birthdays, and positions.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/employees')}>
                View Employees
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all-200 hover:shadow-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Hours Calculation</CardTitle>
              <CardDescription>Track employee work hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Calculate the total hours worked by each employee, including overtime and adjustments for late arrivals.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/hours')}>
                Calculate Hours
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all-200 hover:shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Payroll Processing</CardTitle>
              <CardDescription>Process salary calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Calculate gross and net salaries with automatic deductions for government-mandated contributions.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/payroll')}>
                Process Payroll
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
