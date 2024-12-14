"use client";

import React from "react";
import { motion } from "framer-motion";

import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchSelectInput from "../input/SearchResult";
import SearchProjectSelect from "../input/SerchProjectLIst";

const DialogComponent = ({
  open,
  onClose,
  title,
  description,
  inputs,
  onSubmit,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  selectedMembers,
  setSelectedMembers,
  handleRemoveMember,
  // for task 
  selectedProject,
  setSelectedProject,
  handleRemoveProject

}) => {
  console.log('titile is :', title);
  
  const handleSubmit = () => {
    if (inputs.every((input) => input.value.trim()) && selectedMembers.length > 0) {
      const formData = {
        ...inputs.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
        members: selectedMembers.map((member) => member.id), // Include member IDs
      };
      console.log('Form datais :',formData);
      
      onSubmit(formData);
    } else {
      console.error("All fields and members are required.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        {
          title === 'Add New Task' ? (
            <>
            <SearchProjectSelect 
            
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            />
            <div className="mt-4">
          <p className="font-semibold">Selected Projects:</p>
          {selectedProject?.map((project) => (
            <motion.div
              key={project.id}
              className="flex items-center w-full bg-slate-300 rounded-xl mt-2 justify-between space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              style={{ flexShrink: 0, flexGrow: 1 }}
            >
              <span>{project.name}</span>
              <Button variant="inherit" size="sm" onClick={() => handleRemoveProject(project.id)}>
                x
              </Button>
            </motion.div>
          ))}
        </div>
            </>
          ) : (
            ''
          )
        }

        {/* Member Selection */}
        <SearchSelectInput
          selectedUsers={selectedMembers || []}  // Default to empty array
          setSelectedMembers={setSelectedMembers}
        />

        <div className="mt-4">
          <p className="font-semibold">Selected Members:</p>
          {selectedMembers?.map((member) => (
            <motion.div
              key={member.id}
              className="flex items-center w-full bg-slate-300 rounded-xl mt-2 justify-between space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              style={{ flexShrink: 0, flexGrow: 1 }}
            >
              <span>{member.username}</span>
              <Button variant="inherit" size="sm" onClick={() => handleRemoveMember(member.id)}>
                x
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {inputs.map(({ label, id, name, value, onChange, type = "text" }) => (
            <div key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                type={name === "start_date" || name === "end_date" || name === "due_date" ? "date" : type}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!inputs.every((input) => input.value.trim()) || selectedMembers.length === 0}
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
