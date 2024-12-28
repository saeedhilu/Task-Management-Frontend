import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import CommentService from '@/services/admin/Comment';
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiSend, FiEdit, FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import { Button } from "@/components/ui/button"

export const PRIORITY_CHOICES = {
  low: 'text-green-700',
  medium: 'text-yellow-600',
  high: 'text-red-600',
  urgent: 'text-red-900 font-bold',
};

export function CardComponent({ task, className, ...props }) {
  const userEmail = useSelector((state) => state.auth.user.email);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  console.log('====================================');
  console.log('Edited comment id Is :', editCommentId);
  console.log('====================================');
  const taskProperties = [
    { label: 'Status', value: task.status },
    { label: 'Priority', value: task.priority },
    { label: 'Due Date', value: task.due_date },
    {
      label: 'Members',
      value: task.assigned_to.map(email => email === userEmail ? 'You' : email).join(', ')
    },
  ];

  const userName = useSelector((state) => state.auth.user.username)
  console.log('====================================');
  console.log('user ane is :', userName);
  console.log('====================================');
  useEffect(() => {
    async function fetchComments() {
      const fetchedComments = await CommentService.fetchComments(pagination.page);
      console.log('====================================');
      console.log('Comments are :', fetchedComments);
      console.log('====================================');
      setComments(fetchedComments.results);
      setPagination({ page: fetchedComments.page, totalPages: fetchedComments.total_pages });
    }
    fetchComments();
  }, [pagination.page]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const newComment = {
          task: task.id,
          text: comment,
        };
        await CommentService.createComment(newComment);
        setComment('');
        const updatedComments = await CommentService.fetchComments(pagination.page);
        setComments(updatedComments.results);
        setPagination({ page: updatedComments.page, totalPages: updatedComments.total_pages });
      } catch (error) {
        console.error('Error posting comment:', error);
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
        await CommentService.updateComment(editCommentId, updatedComment);
        setEditCommentId(null);
        setEditCommentText('');
        const updatedComments = await CommentService.fetchComments(pagination.page);
        setComments(updatedComments.results);
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
    await CommentService.deleteComment(commentId);
    const updatedComments = await CommentService.fetchComments(pagination.page);
    setComments(updatedComments.results);
    setPagination({ page: updatedComments.page, totalPages: updatedComments.total_pages });
  };
  console.log('Comments is :', comments);
  console.log('----------------Task  is :', task);


  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={clsx("w-[380px] shadow-lg rounded-lg overflow-hidden", className)} {...props}>
          <CardHeader className="p-6">
            <CardTitle className="text-2xl font-bold flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
              {task.title}
              <p className="text-base text-gray-500 ml-2 truncate" title={task.project}>
                ({task.project})
              </p>
            </CardTitle>
            <CardDescription className="text-gray-500">{task.description}</CardDescription>
          </CardHeader>



          <CardContent className="p-6">
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
              <div className='flex gap-2'>
                <Textarea
                  className="w-full p-2 border rounded-md"
                  rows="1"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Button
                  className="mt-2  px-4 py-2 rounded-md flex items-center space-x-2"
                  onClick={handleCommentSubmit}
                >
                  <FiSend />
                  <span>Send</span>
                </Button>

              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md">
                    View Comments ({comments?.filter((c) => c.task === task.id).length})
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    {comments?.filter((c) => c.task === task.id).map((c) => (
                      <div key={c.id} className="p-2 flex items-center space-x-2">
                        {editCommentId === c.id ? (
                          <>
                            <Textarea
                              className="w-full p-2 border rounded-md"
                              rows="0"
                              value={editCommentText}
                              onChange={handleEditCommentChange}
                            />

                            <FiSave onClick={handleEditCommentSubmit} size={29} />


                            <button onClick={handleCancelEdit} className="text-gray-500">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <strong>{userName === c.username ? 'You' : c.username}:</strong> {c.text}
                            {userName == c.username && (
                              <>
                                <FiEdit onClick={() => handleEditClick(c.id, c.text)} />
                                <FiTrash2 onClick={() => handleDeleteComment(c.id)} />
                              </>

                            )}

                          </>
                        )}
                      </div>
                    ))}

                    {pagination.page < pagination.totalPages && (
                      <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                      >
                        Load More
                      </button>
                    )}

                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

export default CardComponent;
