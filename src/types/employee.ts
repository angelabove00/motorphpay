
export interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  birthday: string;
  position: string;
  hourlyRate: number;
}

export interface TimeLog {
  employeeId: number;
  date: string;
  timeIn: string;
  timeOut: string;
}

export interface SalaryCalculation {
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  weekStart: string;
  weekEnd: string;
  hoursWorked: number;
  grossSalary: number;
  deductions: {
    sss: number;
    philhealth: number;
    pagibig: number;
    tax: number;
    total: number;
  };
  netSalary: number;
}

export type DeductionType = 'sss' | 'philhealth' | 'pagibig' | 'tax';
