
import { Employee, TimeLog, SalaryCalculation } from '@/types/employee';

// Constants
const STANDARD_HOURS_PER_DAY = 8;
const GRACE_PERIOD_MINUTES = 10;
const WORK_START_TIME = '08:00:00';

// Helper function to calculate time difference in hours
export const calculateHoursWorked = (timeIn: string, timeOut: string): number => {
  const startTime = new Date(`2000-01-01T${timeIn}`);
  const endTime = new Date(`2000-01-01T${timeOut}`);
  
  // Calculate the difference in milliseconds
  const diffInMs = endTime.getTime() - startTime.getTime();
  
  // Convert milliseconds to hours
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  // Round to 2 decimal places
  return Math.round(diffInHours * 100) / 100;
};

// Function to calculate late minutes
export const calculateLateMinutes = (timeIn: string): number => {
  const actualTimeIn = new Date(`2000-01-01T${timeIn}`);
  const workStartTime = new Date(`2000-01-01T${WORK_START_TIME}`);
  const graceEndTime = new Date(workStartTime.getTime() + GRACE_PERIOD_MINUTES * 60 * 1000);
  
  if (actualTimeIn <= graceEndTime) {
    return 0;
  }
  
  const lateInMs = actualTimeIn.getTime() - workStartTime.getTime();
  return Math.floor(lateInMs / (1000 * 60));
};

// Calculate weekly hours worked
export const calculateWeeklyHoursWorked = (employeeId: number, timeLogs: TimeLog[]): number => {
  const employeeLogs = timeLogs.filter(log => log.employeeId === employeeId);
  
  let totalHours = 0;
  for (const log of employeeLogs) {
    const hoursWorked = calculateHoursWorked(log.timeIn, log.timeOut);
    
    // Apply late deduction if applicable
    const lateMinutes = calculateLateMinutes(log.timeIn);
    const lateHours = lateMinutes / 60;
    
    // Deduct late hours but ensure it doesn't go negative
    const adjustedHours = Math.max(hoursWorked - lateHours, 0);
    
    totalHours += adjustedHours;
  }
  
  return Math.round(totalHours * 100) / 100;
};

// Calculate gross salary
export const calculateGrossSalary = (hoursWorked: number, hourlyRate: number): number => {
  return hoursWorked * hourlyRate;
};

// Calculate SSS contribution
export const calculateSSSContribution = (grossSalary: number): number => {
  // This is a simplified calculation
  if (grossSalary <= 3250) return 135;
  if (grossSalary <= 3750) return 157.50;
  if (grossSalary <= 4250) return 180;
  if (grossSalary <= 4750) return 202.50;
  if (grossSalary <= 5250) return 225;
  if (grossSalary <= 5750) return 247.50;
  if (grossSalary <= 6250) return 270;
  if (grossSalary <= 6750) return 292.50;
  if (grossSalary <= 7250) return 315;
  if (grossSalary <= 7750) return 337.50;
  if (grossSalary <= 8250) return 360;
  if (grossSalary <= 8750) return 382.50;
  if (grossSalary <= 9250) return 405;
  if (grossSalary <= 9750) return 427.50;
  if (grossSalary <= 10250) return 450;
  if (grossSalary <= 10750) return 472.50;
  if (grossSalary <= 11250) return 495;
  if (grossSalary <= 11750) return 517.50;
  if (grossSalary <= 12250) return 540;
  if (grossSalary <= 12750) return 562.50;
  if (grossSalary <= 13250) return 585;
  if (grossSalary <= 13750) return 607.50;
  if (grossSalary <= 14250) return 630;
  if (grossSalary <= 14750) return 652.50;
  if (grossSalary <= 15250) return 675;
  if (grossSalary <= 15750) return 697.50;
  if (grossSalary <= 16250) return 720;
  if (grossSalary <= 16750) return 742.50;
  if (grossSalary <= 17250) return 765;
  if (grossSalary <= 17750) return 787.50;
  if (grossSalary <= 18250) return 810;
  if (grossSalary <= 18750) return 832.50;
  if (grossSalary <= 19250) return 855;
  if (grossSalary <= 19750) return 877.50;
  return 900; // Maximum contribution
};

// Calculate PhilHealth contribution
export const calculatePhilHealthContribution = (grossSalary: number): number => {
  // This is a simplified calculation
  const monthlyRate = 0.03; // 3% of monthly basic salary
  const personalShare = 0.015; // Half is paid by employee
  
  // Convert weekly to monthly (approximate)
  const monthlySalary = grossSalary * 4;
  
  if (monthlySalary <= 10000) {
    return 150; // Minimum contribution
  } else if (monthlySalary >= 60000) {
    return 900; // Maximum contribution
  } else {
    return monthlySalary * personalShare;
  }
};

// Calculate Pag-IBIG contribution
export const calculatePagIbigContribution = (grossSalary: number): number => {
  // This is a simplified calculation
  const monthlySalary = grossSalary * 4; // Convert weekly to monthly (approximate)
  
  if (monthlySalary <= 1500) {
    return monthlySalary * 0.01; // 1% of monthly basic salary
  } else {
    return monthlySalary * 0.02; // 2% of monthly basic salary, max of P100
  }
};

// Calculate withholding tax
export const calculateWithholdingTax = (grossSalary: number, sss: number, philhealth: number, pagibig: number): number => {
  // This is a simplified calculation
  const monthlySalary = grossSalary * 4; // Convert weekly to monthly (approximate)
  const taxableIncome = monthlySalary - sss - philhealth - pagibig;
  
  if (taxableIncome <= 20833) {
    return 0;
  } else if (taxableIncome <= 33332) {
    return (taxableIncome - 20833) * 0.2;
  } else if (taxableIncome <= 66666) {
    return 2500 + (taxableIncome - 33333) * 0.25;
  } else if (taxableIncome <= 166666) {
    return 10833.33 + (taxableIncome - 66667) * 0.3;
  } else if (taxableIncome <= 666666) {
    return 40833.33 + (taxableIncome - 166667) * 0.32;
  } else {
    return 200833.33 + (taxableIncome - 666667) * 0.35;
  }
};

// Calculate complete salary details
export const calculateSalaryDetails = (
  employee: Employee,
  timeLogs: TimeLog[],
  weekStart: string,
  weekEnd: string
): SalaryCalculation => {
  const hoursWorked = calculateWeeklyHoursWorked(employee.id, timeLogs);
  const grossSalary = calculateGrossSalary(hoursWorked, employee.hourlyRate);
  
  const sss = calculateSSSContribution(grossSalary);
  const philhealth = calculatePhilHealthContribution(grossSalary);
  const pagibig = calculatePagIbigContribution(grossSalary);
  const tax = calculateWithholdingTax(grossSalary, sss, philhealth, pagibig);
  
  const totalDeductions = sss + philhealth + pagibig + tax;
  const netSalary = grossSalary - totalDeductions;
  
  return {
    employeeId: employee.id,
    employeeName: employee.name,
    employeeNumber: employee.employeeNumber,
    weekStart,
    weekEnd,
    hoursWorked,
    grossSalary,
    deductions: {
      sss,
      philhealth,
      pagibig,
      tax,
      total: totalDeductions
    },
    netSalary
  };
};
