import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import TasksService from '@/services/admin/Tasks';
import useToastNotification from '@/hooks/useToastNotification';
import DialogComponent from '../diologue/Diologue';
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { FiSend, FiEdit, FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import CommentService from '@/services/admin/Comment';
import { FaRegCommentAlt } from "react-icons/fa";
import CommentsDiologue from '../diologue/CommandDiologue';
import { MentionsInput, Mention } from 'react-mentions'
import TaskUsers from '@/services/user/TaskUsers';
import './mentions.css'
import Spinner from '../spinner/Spinner';

export const PRIORITY_CHOICES = {
  low: 'text-green-700',
  medium: 'text-yellow-600',
  high: 'text-red-600',
  urgent: 'text-red-900 font-bold',
};

const TaskCard = ({ task }) => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const queryClient = useQueryClient();
  const showToast = useToastNotification();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(task.members_usernames.map((username) => ({ id: username[1], username })));
  const username = useSelector((state) => state.auth.user.username);

  // Diologue fields

  const [dialogInputs, setDialogInputs] = useState([
    { label: 'Title', id: 'title', name: 'title', value: task.title, onChange: (e) => handleInputChange(e, 'title') },
    { label: 'Description', id: 'description', name: 'description', value: task.description, onChange: (e) => handleInputChange(e, 'description') },
    { label: 'Status', id: 'status', name: 'status', value: task.status, onChange: (e) => handleInputChange(e, 'status') },
    { label: 'Priority', id: 'priority', name: 'priority', value: task.priority, onChange: (e) => handleInputChange(e, 'priority') },
    { label: 'Due Date', id: 'due_date', name: 'due_date', value: task.due_date, onChange: (e) => handleInputChange(e, 'due_date') },
  ]);

  const handleInputChange = (e, name) => {
    setDialogInputs((prevInputs) =>
      prevInputs.map((input) => (input.name === name ? { ...input, value: e.target.value } : input))
    );
  };

  const updateMutation = useMutation(
    (data) => TasksService.updateTasks(task.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        showToast('Task updated successfully!', 'success');
        reset();
        setDialogOpen(false);
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

  const handleUpdateSubmit = (formData) => {
    updateMutation.mutate({
      ...formData,
      assigned_to: selectedMembers.map((member) => member.id),
    });
  };

  const taskProperties = [
    { label: "Status", value: task.status },
    { label: "Priority", value: task.priority },
    { label: "Due Date", value: task.due_date },
    { label: "Members", value: task.members_usernames.map(userName => userName[0] === username ? 'You' : userName[0]).join(', ') },
  ];

  const { data: fetchedComments, isLoading, isError,refetch } = useQuery(
    ['comments', task.id],
    () => CommentService.fetchComments(task.id),
    { keepPreviousData: true }
  );
  console.log('Task and Result is :',task, fetchedComments);
  
  

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(fetchedComments ? fetchedComments.results : []);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [ isCommentLoad, setIsCommenLoading] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const {data:taskUsers,isLoading:userLoading,isError:useError}  = useQuery(
    ['taskUsers',task.id],
    () =>  TaskUsers(task.id)
  )

  const handleCommentSubmit = async () => {
    
    if (comment.trim()) {
      setIsCommenLoading(true)
      try {
        
        const newComment = { task: task.id, text: comment };
        queryClient.invalidateQueries('comments');
        console.log('New comment is :',newComment);
        
        await CommentService.createComment(newComment);
        
        showToast('Comment added successfully.', 'success');
        setComment('');
        
      } catch (error) {
        console.error('Error posting comment:', error);
      }finally{
        setIsCommenLoading(false)
      }
    }
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const handleEditCommentSubmit = async () => {
    if (editCommentText.trim()) {
      try {
        const updatedComment = { text: editCommentText };
        console.log('Hello', updatedComment);
        await CommentService.updateComment(editCommentId, updatedComment);
        
        setEditCommentId(null);
        setEditCommentText('');
        refetch()
        showToast('Comment updated successfully.', 'success');
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditCommentId(commentId);
    setEditCommentText(currentText);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText('');
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await CommentService.deleteComment(commentId);
      showToast('Comment deleted successfully.', 'success');
      refetch()
    } catch (error) {
      showToast('Error occurred. Please try again.', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
              <div className="flex-1 space-y-2">
                {taskProperties.map(({ label, value }, index) => (
                  <div key={index} className={`flex space-x-2 ${PRIORITY_CHOICES[value]}`}>
                    <span className="font-medium">{label}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
            <MentionsInput
                  value={comment}
                  onChange={handleCommentChange}
                  className="w-96 react-mentions__dropdown-menu"
                  placeholder="Add a comment..."
                >
                    <Mention
                      trigger="@"
                      data={taskUsers?.map((user) => ({
                        id: user.id,
                        display: user.username,
                      }))}
                      onAdd={(id, display) => {
                        const trimmedDisplay = display.trim(); 
                        const mentionString = `@${trimmedDisplay} `; 
                        setComment((prev) => prev.replace(/@\S+/g, '') + mentionString); 
                        setMentions((prev) => [...prev, { id, display: trimmedDisplay }]);
                      }}
                    />
                  </MentionsInput>
              <Button onClick={handleCommentSubmit}>
                    {isCommentLoad ? <Spinner/> : <FiSend /> }
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-4 justify-start">
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            <MdOutlineEdit />
            Edit
          </Button>
          <Button variant="outline" onClick={() => deleteMutation.mutate()}>
            <RiDeleteBinLine />
            Delete
          </Button>
          <button
            className="bg-gray-500 flex items-center gap-1 px-4 py-2 rounded-md hover:bg-gray-600 transition"
            onClick={() => setIsDialogOpen(true)}
          >
            <FaRegCommentAlt /> ({fetchedComments?.filter((c)=> task?.id == c.task).length})
          </button>
          <CommentsDiologue
            isOpen={isDialogOpen}
            onClose={setIsDialogOpen}
            comments={fetchedComments?.filter((c)=> task?.id == c.task)}
            editCommentId={editCommentId}
            editCommentText={editCommentText}
            handleEditCommentChange={handleEditCommentChange}
            handleEditCommentSubmit={handleEditCommentSubmit}
            handleCancelEdit={handleCancelEdit}
            handleEditClick={handleEditClick}
            handleDeleteComment={handleDeleteComment}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoading}
            isError={isError}
          />
        </CardFooter>
      </Card>

      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Edit Task"
        description="Update task details below."
        onSubmit={handleUpdateSubmit}
        inputs={dialogInputs}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        handleRemoveMember={(id) =>
          setSelectedMembers((prev) => prev.filter((member) => member.id !== id))
        }
      />
    </motion.div>
  );
};

export default TaskCard;








