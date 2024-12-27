import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useMutation, useQueryClient } from 'react-query';
import ProjectService from '@/services/admin/Projects';
import useToastNotification from '@/hooks/useToastNotification';
import { motion } from 'framer-motion';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import DialogComponent from '../diologue/Diologue';

const ProjectCard = ({ project }) => {
  const { reset } = useForm();
  const queryClient = useQueryClient();
  const showToast = useToastNotification();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInputs, setDialogInputs] = useState([
    { label: 'Name', id: 'name', name: 'name', value: project.name, onChange: (e) => handleInputChange(e, 'name') },
    { label: 'Description', id: 'description', name: 'description', value: project.description, onChange: (e) => handleInputChange(e, 'description') },
    { label: 'Start Date', id: 'start_date', name: 'start_date', value: project.start_date, onChange: (e) => handleInputChange(e, 'start_date') },
    { label: 'End Date', id: 'end_date', name: 'end_date', value: project.end_date, onChange: (e) => handleInputChange(e, 'end_date') },
  ]);
  console.log('Projecdt is :', project);
  
  const [selectedMembers, setSelectedMembers] = useState(project.members_usernames.map((username) => ({ id: username[0  ], username })));
  console.log("Checkinmg memebers aer :", selectedMembers);
  
  const updateMutation = useMutation(
    (data) => ProjectService.updateProject(project.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        showToast('Project updated successfully!', 'success');
        reset();
        setDialogOpen(false); // Close dialog on success
      },
      onError: () => showToast('Failed to update project!', 'error'),
    }
  );

  const deleteMutation = useMutation(
    () => ProjectService.deleteProject(project.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        showToast('Project deleted successfully!', 'success');
      },
      onError: () => showToast('Failed to delete project!', 'error'),
    }
  );

  // Handle input changes
  const handleInputChange = (e, name) => {
    setDialogInputs((prevInputs) =>
      prevInputs.map((input) => (input.name === name ? { ...input, value: e.target.value } : input))
    );
  };

  const handleEdit = () => {
    setDialogOpen(true);
  };

  const handleUpdateSubmit = (formData) => {
    updateMutation.mutate({
      ...formData,
      members: selectedMembers.map((member) => member.id),
    });
  };

  return (
    <>
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
      <Card className="w-full max-w-sm shadow-md rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
          <CardDescription className="text-sm">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Created By:</strong> User ID {project.created_by}
            </p>
            <p>
              <strong>Members:</strong>
              {project.members_usernames.map((name, idx) => (
                <p key={idx}>• {name[1]}</p>
              ))}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center space-x-2 text-green-500"
            onClick={handleEdit}
          >
            <MdOutlineEdit />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => deleteMutation.mutate()}
            className="flex items-center space-x-2"
          >
            <RiDeleteBinLine />
            <span>Delete</span>
          </Button>
        </CardFooter>
      </Card>
      </motion.div>

      {/* Dialog for Editing */}
      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Edit Project"
        description="Update project details below."
        inputs={dialogInputs}
        onSubmit={handleUpdateSubmit}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        handleRemoveMember={(id) =>
          setSelectedMembers((prev) => prev.filter((member) => member.id !== id))
        }
      />
    </>
  );
};

export default ProjectCard;
