import React from "react";
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
  import { Input } from "@/components/ui/input";
  import { FiSave, FiEdit, FiTrash2 } from "react-icons/fi";

const CommentsDiologue = ({
  isOpen,
  onClose,
  comments,
  editCommentId,
  editCommentText,
  handleEditCommentChange,
  handleEditCommentSubmit,
  handleCancelEdit,
  handleEditClick,
  handleDeleteComment,
  pagination,
  setPagination,
}) => {
    console.log('Comments are :', comments);
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="flex flex-col h-96  overflow-auto justify-center items-center mx-auto my-auto">

        <div >
          <DialogHeader>
            <DialogTitle >Comments</DialogTitle>
          </DialogHeader>
          <div >
            {comments?.map((c) => (
              <div key={c.id} >
                {editCommentId === c.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      className=" "
                      rows="1"
                      value={editCommentText}
                      onChange={handleEditCommentChange}
                    />
                    <button
                      onClick={handleEditCommentSubmit}
                      className=" transition"
                    >
                      <FiSave size={24} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className=" transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <strong >{c.username}:</strong>{" "}
                      <span >{c.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(c.id, c.text)}
                        className=" transition"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className=" transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {pagination.page < pagination.totalPages && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            >
              Load More
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDiologue;



// import React, { useEffect, useRef } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { FiSave, FiEdit, FiTrash2 } from "react-icons/fi";

// const CommentsDiologue = ({
//   isOpen,
//   onClose,
//   comments,
//   editCommentId,
//   handleEditClick,
//   handleEditCommentSubmit,
//   handleDeleteComment,
//   handleCancelEdit,
//   pagination,
//   setPagination,
// }) => {
//   const editableRef = useRef(null);

//   useEffect(() => {
//     if (editCommentId && editableRef.current) {
//       // Focus on the editable div and place cursor at the end
//       const range = document.createRange();
//       const sel = window.getSelection();
//       range.selectNodeContents(editableRef.current);
//       range.collapse(false);
//       sel.removeAllRanges();
//       sel.addRange(range);
//       editableRef.current.focus();
//     }
//   }, [editCommentId]);

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <div>
//           <DialogHeader>
//             <DialogTitle>Comments</DialogTitle>
//           </DialogHeader>
//           <div>
//             {comments.map((comment) => (
//               <div key={comment.id} className="mb-4">
//                 <div className="flex justify-between items-center">
//                   {editCommentId === comment.id ? (
//                     <div
//                       ref={editableRef}
//                       contentEditable
//                       suppressContentEditableWarning
//                       className="w-full p-2 border rounded-md focus:outline-none focus:ring"
//                       onBlur={(e) =>
//                         handleEditCommentSubmit(comment.id, e.target.innerText)
//                       }
//                     >
//                       {comment.text}
//                     </div>
//                   ) : (
//                     <div>
//                       <strong>{comment.username}:</strong> <span>{comment.text}</span>
//                     </div>
//                   )}
//                   <div className="flex items-center gap-2">
//                     {editCommentId !== comment.id ? (
//                       <button
//                         onClick={() => handleEditClick(comment.id)}
//                         className="p-2 hover:underline"
//                         title="Edit"
//                       >
//                         <FiEdit />
//                       </button>
//                     ) : (
//                       <div>
//                         <button
//                           onClick={handleEditCommentSubmit}
//                           className="p-2 hover:underline"
//                           title="Save"
//                         >
//                           <FiSave />
//                         </button>
//                         <button
//                           onClick={handleCancelEdit}
//                           className="p-2 hover:underline"
//                           title="Cancel"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     )}
//                     <button
//                       onClick={() => handleDeleteComment(comment.id)}
//                       className="p-2 hover:underline"
//                       title="Delete"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {pagination.page < pagination.totalPages && (
//             <button
//               onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
//               className="mt-4 p-2 rounded-md hover:underline"
//             >
//               Load More
//             </button>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CommentsDiologue;