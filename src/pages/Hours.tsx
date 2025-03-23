
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { employees, timeLogs } from '@/data/sampleData';
import { calculateWeeklyHoursWorked } from '@/utils/payrollCalculations';
import { formatNumber } from '@/utils/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Hours = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  
  const selectedEmployeeIdNumber = selectedEmployeeId ? parseInt(selectedEmployeeId, 10) : 0;
  const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeIdNumber);
  
  const employeeTimeLogs = timeLogs.filter(log => log.employeeId === selectedEmployeeIdNumber);
  const totalHoursWorked = selectedEmployeeIdNumber 
    ? calculateWeeklyHoursWorked(selectedEmployeeIdNumber, timeLogs) 
    : 0;
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hours Calculation</h1>
        <p className="text-muted-foreground mb-8">Calculate weekly work hours for employees</p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Employee</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        {selectedEmployee && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedEmployee.name}'s Attendance</h2>
              <div className="bg-secondary rounded-full px-4 py-2 flex items-center">
                <span className="text-sm font-medium mr-2">Total Hours:</span>
                <span className="text-lg font-bold">{formatNumber(totalHoursWorked)}</span>
              </div>
            </div>
            
            <Card className="animate-slide-up">
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeTimeLogs.map((log, index) => {
                      const timeInDate = new Date(`2000-01-01T${log.timeIn}`);
                      const isLate = timeInDate > new Date(`2000-01-01T08:10:00`);
                      
                      // Simple calculation for display
                      const startTime = new Date(`2000-01-01T${log.timeIn}`);
                      const endTime = new Date(`2000-01-01T${log.timeOut}`);
                      const diffInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
                      
                      return (
                        <TableRow key={index}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.timeIn.substring(0, 5)}</TableCell>
                          <TableCell>{log.timeOut.substring(0, 5)}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                isLate ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {isLate ? 'Late' : 'On Time'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {diffInHours.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Hours;
