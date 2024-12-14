import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export const PRIORITY_CHOICES = {
  low: 'text-green-700',
  medium: 'text-yellow-600',
  high: 'text-red-600',
  urgent: 'text-red-900 font-bold',
};


export function CardComponent({ task, className, ...props }) {
    const userEmail = useSelector((state) => state.auth.user.email);
  const taskProperties = [
    { label: "Status", value: task.status },
    { label: "Priority", value: task.priority },
    { label: "Due Date", value: task.due_date },
    { label: "Members", value: task.assigned_to.map(email => email === userEmail ? 'You' : email).join(', ') },
  ];
  
  return (
    <Card className={clsx("w-[380px] shadow-lg rounded-lg overflow-hidden ", className)} {...props}>
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
        <CardDescription className="text-gray-500">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
            <div className="flex-1 space-y-2">
              {taskProperties.map(({ label, value }, index) => (
                <div key={index} className={`flex  space-x-2 ${PRIORITY_CHOICES[value]}`}>
                  <span className="font-medium">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
