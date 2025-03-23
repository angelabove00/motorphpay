
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SalaryCalculation } from '@/types/employee';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface PayrollCardProps {
  calculation: SalaryCalculation;
}

const PayrollCard = ({ calculation }: PayrollCardProps) => {
  const {
    employeeName,
    employeeNumber,
    weekStart,
    weekEnd,
    hoursWorked,
    grossSalary,
    deductions,
    netSalary
  } = calculation;

  return (
    <Card className="overflow-hidden transition-all-200 hover:shadow-md animate-slide-up">
      <CardHeader className="bg-secondary/50">
        <CardTitle className="text-lg">{employeeName}</CardTitle>
        <p className="text-sm text-muted-foreground">ID: {employeeNumber}</p>
        <p className="text-sm text-muted-foreground">
          Week: {weekStart} to {weekEnd}
        </p>
      </CardHeader>
      <CardContent className="pt-6 grid gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Work Summary</h3>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">Hours Worked:</span>
            <span className="text-sm font-medium">{formatNumber(hoursWorked)} hours</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">Gross Salary:</span>
            <span className="text-sm font-medium">{formatCurrency(grossSalary)}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Deductions</h3>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">SSS:</span>
            <span className="text-sm">{formatCurrency(deductions.sss)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">PhilHealth:</span>
            <span className="text-sm">{formatCurrency(deductions.philhealth)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">Pag-IBIG:</span>
            <span className="text-sm">{formatCurrency(deductions.pagibig)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <span className="text-sm">Withholding Tax:</span>
            <span className="text-sm">{formatCurrency(deductions.tax)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1 pt-1 border-t">
            <span className="text-sm font-medium">Total Deductions:</span>
            <span className="text-sm font-medium">{formatCurrency(deductions.total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/30 flex justify-between items-center">
        <span className="text-sm font-medium">Net Salary:</span>
        <span className="text-base font-semibold">{formatCurrency(netSalary)}</span>
      </CardFooter>
    </Card>
  );
};

export default PayrollCard;
