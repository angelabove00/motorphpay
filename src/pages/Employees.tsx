
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import EmployeeCard from '@/components/employees/EmployeeCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { employees } from '@/data/sampleData';
import { Employee } from '@/types/employee';
import { formatDate } from '@/utils/formatters';

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Directory</h1>
        <p className="text-muted-foreground mb-8">View and manage employee information</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee} 
              onClick={() => setSelectedEmployee(employee)}
            />
          ))}
        </div>
        
        <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">Employee Number:</span>
                  <span>{selectedEmployee.employeeNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">Name:</span>
                  <span>{selectedEmployee.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">Birthday:</span>
                  <span>{formatDate(selectedEmployee.birthday)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">Position:</span>
                  <span>{selectedEmployee.position}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">Hourly Rate:</span>
                  <span>₱{selectedEmployee.hourlyRate.toFixed(2)}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Employees;
