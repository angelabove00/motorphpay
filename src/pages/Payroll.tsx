
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { employees, timeLogs } from '@/data/sampleData';
import { calculateSalaryDetails } from '@/utils/payrollCalculations';
import PayrollCard from '@/components/payroll/PayrollCard';
import { SalaryCalculation } from '@/types/employee';

const Payroll = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [calculation, setCalculation] = useState<SalaryCalculation | null>(null);
  
  const handleCalculate = () => {
    if (!selectedEmployeeId) return;
    
    const employeeId = parseInt(selectedEmployeeId, 10);
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (!employee) return;
    
    const weekStart = '2023-06-12';
    const weekEnd = '2023-06-16';
    
    const result = calculateSalaryDetails(employee, timeLogs, weekStart, weekEnd);
    setCalculation(result);
  };
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Payroll Processing</h1>
        <p className="text-muted-foreground mb-8">Calculate employee salaries with deductions</p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Calculate Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name} ({employee.employeeNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={handleCalculate} disabled={!selectedEmployeeId}>
                Calculate Salary
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {calculation && (
          <div className="max-w-md mx-auto">
            <PayrollCard calculation={calculation} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Payroll;
