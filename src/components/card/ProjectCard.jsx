import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from 'react-query';
import ProjectService from '@/services/admin/Projects';
import useToastNotification from '@/hooks/useToastNotification';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const ProjectCard = ({ project }) => {
    console.log('====================================');
    console.log('prpject  is :', project);
    console.log('====================================');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const updateMutation = useMutation(
    (data) => ProjectService.updateProject(project.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        showToast('Project updated successfully!', 'success');
        reset();
      },
      onError: (error) => showToast('Failed to update project!', 'error'),
    }
  );

  const deleteMutation = useMutation(
    () => ProjectService.deleteProject(project.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        showToast('Project deleted successfully!', 'success');
      },
      onError: (error) => showToast('Failed to delete project!', 'error'),
    }
  );

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-sm shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold ">{project.name}</CardTitle>
        <CardDescription className="text-sm ">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong >Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
          <p><strong >End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
          <p><strong >Created By:</strong> User ID {project.created_by}</p>
          <p>
            <strong>
                Members : 
            </strong>
            {project.members_usernames.map((name,idx)=>(
                <p key={idx}>
                    •                    {name}
                </p>
            ))}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4">
        <Button type="submit" variant="outline" className="flex items-center space-x-2 text-green-500">
          <MdOutlineEdit />
          <span>Edit</span>
        </Button>
        <Button variant="outline" color="red" onClick={() => deleteMutation.mutate()} className="flex items-center space-x-2">
          <RiDeleteBinLine />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
