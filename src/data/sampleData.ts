
import { Employee, TimeLog } from '@/types/employee';

export const employees: Employee[] = [
  {
    id: 1,
    employeeNumber: 'EMP001',
    name: 'John Doe',
    birthday: '1990-05-15',
    position: 'Software Developer',
    hourlyRate: 500
  },
  {
    id: 2,
    employeeNumber: 'EMP002',
    name: 'Jane Smith',
    birthday: '1992-08-22',
    position: 'UI/UX Designer',
    hourlyRate: 450
  },
  {
    id: 3,
    employeeNumber: 'EMP003',
    name: 'Michael Johnson',
    birthday: '1985-03-10',
    position: 'Project Manager',
    hourlyRate: 600
  },
  {
    id: 4,
    employeeNumber: 'EMP004',
    name: 'Emily Williams',
    birthday: '1993-11-28',
    position: 'Quality Assurance',
    hourlyRate: 400
  }
];

export const timeLogs: TimeLog[] = [
  // Employee 1 logs
  { employeeId: 1, date: '2023-06-12', timeIn: '08:05:00', timeOut: '17:10:00' },
  { employeeId: 1, date: '2023-06-13', timeIn: '08:02:00', timeOut: '17:05:00' },
  { employeeId: 1, date: '2023-06-14', timeIn: '08:15:00', timeOut: '17:30:00' },
  { employeeId: 1, date: '2023-06-15', timeIn: '08:00:00', timeOut: '17:00:00' },
  { employeeId: 1, date: '2023-06-16', timeIn: '08:07:00', timeOut: '17:15:00' },
  
  // Employee 2 logs
  { employeeId: 2, date: '2023-06-12', timeIn: '08:30:00', timeOut: '17:45:00' },
  { employeeId: 2, date: '2023-06-13', timeIn: '08:00:00', timeOut: '17:00:00' },
  { employeeId: 2, date: '2023-06-14', timeIn: '08:05:00', timeOut: '17:10:00' },
  { employeeId: 2, date: '2023-06-15', timeIn: '08:08:00', timeOut: '17:20:00' },
  { employeeId: 2, date: '2023-06-16', timeIn: '08:10:00', timeOut: '17:15:00' },
  
  // Employee 3 logs
  { employeeId: 3, date: '2023-06-12', timeIn: '08:00:00', timeOut: '17:00:00' },
  { employeeId: 3, date: '2023-06-13', timeIn: '08:05:00', timeOut: '17:10:00' },
  { employeeId: 3, date: '2023-06-14', timeIn: '08:03:00', timeOut: '17:05:00' },
  { employeeId: 3, date: '2023-06-15', timeIn: '08:02:00', timeOut: '17:00:00' },
  { employeeId: 3, date: '2023-06-16', timeIn: '07:58:00', timeOut: '17:05:00' },
  
  // Employee 4 logs
  { employeeId: 4, date: '2023-06-12', timeIn: '08:10:00', timeOut: '17:15:00' },
  { employeeId: 4, date: '2023-06-13', timeIn: '08:12:00', timeOut: '17:20:00' },
  { employeeId: 4, date: '2023-06-14', timeIn: '08:05:00', timeOut: '17:10:00' },
  { employeeId: 4, date: '2023-06-15', timeIn: '08:03:00', timeOut: '17:05:00' },
  { employeeId: 4, date: '2023-06-16', timeIn: '08:07:00', timeOut: '17:10:00' }
];
