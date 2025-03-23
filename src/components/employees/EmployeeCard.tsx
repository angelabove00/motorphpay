
import React from 'react';
import { Employee } from '@/types/employee';
import { formatDate } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const { name, employeeNumber, birthday, position } = employee;
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <Card 
      className="overflow-hidden transition-all-200 hover:shadow-md cursor-pointer animate-slide-up" 
      onClick={onClick}
    >
      <CardHeader className="bg-secondary/50 flex flex-row items-center gap-4 pb-4">
        <Avatar className="h-12 w-12 border">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {position}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-4 grid gap-2">
        <div className="grid grid-cols-2 gap-1">
          <span className="text-sm font-medium">Employee ID:</span>
          <span className="text-sm">{employeeNumber}</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <span className="text-sm font-medium">Birthday:</span>
          <span className="text-sm">{formatDate(birthday)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
