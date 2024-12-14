import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useMutation, useQueryClient } from 'react-query';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import TasksService from '@/services/admin/Tasks';
import useToastNotification from '@/hooks/useToastNotification';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export const PRIORITY_CHOICES = {
  low: 'text-green-700',
  medium: 'text-yellow-600',
  high: 'text-red-600',
  urgent: 'text-red-900 font-bold',
};

const TaskCard = ({  task }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const updateMutation = useMutation(
    (data) => TasksService.updateTasks(task.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        showToast('Task updated successfully!', 'success');
        reset();
      },
      onError: () => showToast('Failed to update task!', 'error'),
    }
  );

  const deleteMutation = useMutation(
    () => TasksService.deleteTasks(task.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        showToast('Task deleted successfully!', 'success');
      },
      onError: () => showToast('Failed to delete task!', 'error'),
    }
  );

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };
  const username = useSelector((state) => state.auth.user.usernmae);
  console.log("user name is :", username);
  
  // Task details display
  const taskProperties = [
    { label: "Status", value: task.status },
    { label: "Priority", value: task.priority },
    { label: "Due Date", value: task.due_date },
    { label: "Members", value: task.members_usernames.map(userName => userName === username ? 'You' : userName).join(', ') },
  ];

  return (
    <Card className="w-full max-w-sm shadow-md rounded-lg overflow-hidden">
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
      <CardFooter className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleSubmit(onSubmit)}
          className="flex items-center space-x-2 text-green-500"
        >
          <MdOutlineEdit />
          <span>Edit</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => deleteMutation.mutate()}
          className="flex items-center space-x-2 text-red-500"
        >
          <RiDeleteBinLine />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
