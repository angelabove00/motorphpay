
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { employees, timeLogs } from '@/data/sampleData';
import { calculateWeeklyHoursWorked } from '@/utils/payrollCalculations';

const Dashboard = () => {
  // Generate data for hours worked chart
  const hoursData = employees.map(employee => ({
    name: employee.name.split(' ')[0],
    hours: calculateWeeklyHoursWorked(employee.id, timeLogs)
  }));
  
  // Calculate on-time vs late statistics
  const allTimeInLogs = timeLogs.map(log => {
    const timeInDate = new Date(`2000-01-01T${log.timeIn}`);
    const isLate = timeInDate > new Date(`2000-01-01T08:10:00`); // After grace period
    return isLate ? 'late' : 'onTime';
  });
  
  const onTimeCount = allTimeInLogs.filter(status => status === 'onTime').length;
  const lateCount = allTimeInLogs.filter(status => status === 'late').length;
  
  const attendanceData = [
    { name: 'On Time', value: onTimeCount },
    { name: 'Late', value: lateCount }
  ];
  
  const COLORS = ['#0088FE', '#FF8042'];
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Payroll system overview and statistics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Weekly Hours Worked</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hoursData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Employee Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold">{employees.length}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Avg. Hours/Week</p>
                <p className="text-3xl font-bold">
                  {(hoursData.reduce((acc, curr) => acc + curr.hours, 0) / hoursData.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl font-bold">
                  {((onTimeCount / (onTimeCount + lateCount)) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
