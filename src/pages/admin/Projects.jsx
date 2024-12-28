import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ProjectService from "@/services/admin/Projects"; // Import your ProjectService
import ProjectCard from "@/components/card/ProjectCard";
import { Button } from "@/components/ui/button";
import DialogComponent from "@/components/diologue/Diologue";
import SkeletonCard from "@/components/skeletons/TaskCardSkeleton";
import useToastNotification from "@/hooks/useToastNotification";
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  const { data: projects, isLoading: isLoadingProjects, error: projectsError, refetch } = useQuery(
    "projects",
    ProjectService.fetchProjects
  );

  const showToast = useToastNotification();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.filter((member) => member.id !== memberId)
    );
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const createMutation = useMutation((data) => ProjectService.createProject(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      refetch();
      showToast("Project added successfully!", "success");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.name?.[0] || "Failed to add project!";
      showToast(errorMessage, "error");
    },
  });

  const handleAddProject = (data) => {
    if (
      data.name.trim() &&
      data.description.trim() &&
      data.start_date &&
      data.end_date &&
      selectedMembers.length > 0
    ) {
      createMutation.mutate({ ...data, members: selectedMembers.map((member) => member.id) });
    } else {
      showToast("Please fill in all fields and add at least one member.", "error");
    }
  };

  if (isLoadingProjects) {
    return <SkeletonCard />;
  }

  if (projectsError) {
    return <p>Error loading projects: {projectsError.message}</p>;
  }

  return (
    <>
      <div className="flex justify-end">
        <motion.a
          whileHover={{ scale: 1.2 }}
          className="bg-sky-400 p-3 rounded-lg"
          onHoverStart={event => { }}
          onClick={() => setIsDialogOpen(true)}
          onHoverEnd={event => { }}
        >
          Add new project
        </motion.a>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {!projects.length && <div>No Projects Found</div>}

        <DialogComponent
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Add New Project"
          description="Fill in the details of the new project."
          inputs={[
            {
              label: "Project Name",
              id: "name",
              name: "name",
              value: newProject.name,
              onChange: handleInputChange,
            },
            {
              label: "Description",
              id: "description",
              name: "description",
              value: newProject.description,
              onChange: handleInputChange,
            },
            {
              label: "Start Date",
              id: "start_date",
              name: "start_date",
              value: newProject.start_date,
              onChange: handleInputChange,
            },
            {
              label: "End Date",
              id: "end_date",
              name: "end_date",
              value: newProject.end_date,
              onChange: handleInputChange,
            },
          ]}
          onSubmit={handleAddProject}
          submitButtonText="Add Project"
          cancelButtonText="Cancel"
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
          handleRemoveMember={handleRemoveMember}
        />


      </div>
    </>

  );
};

export default ProjectsPage;
