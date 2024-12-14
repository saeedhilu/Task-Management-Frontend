import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Input } from "@/components/ui/input";
import ProjectSearchService from "@/services/admin/ProjectSearch";
import Spinner from "../spinner/Spinner";

export default function SearchProjectSelect({ setSelectedProject,selectedProject }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: results, isLoading, refetch } = useQuery(
    ["searchProjects", searchTerm],
    () => ProjectSearchService.searchProjects(searchTerm),
    {
      enabled: searchTerm.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearch = () => refetch();

  const handleSelect = (projectd) => {
    setSelectedProject((prevSelected) => {
      if (prevSelected.some((u) => u.id === projectd.id)) {
        return prevSelected.filter((u) => u.id !== user.id); // Deselect if already selected
      }
      return [...prevSelected, projectd]; // Add user if not already selected
    });
  };
  const handleOk = () => {
    setSearchTerm(""); // Clear the search input
    // setSelectedMembers([]); // Clear selected users
    // // Optionally: Add any additional steps after OK (e.g., proceed to next step, etc.)
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative flex gap-3">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
        />
        <button
          type="button"
          className="px-4 py-1   bg-indigo-500 text-white rounded-lg"
          onClick={handleOk}
        >
          OK
        </button>
      </div>

      {isLoading && <div className="mt-2 text-center"><Spinner/></div>}

      {results?.results?.length > 0 && (
        <motion.ul
          className="absolute w-1/2 border bg-black rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {results.results.map((project) => (
            <li
              key={project.id}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-500 hover:text-white"
              onClick={() => handleSelect(project)}
            >
              {project.name}
            </li>
          ))}
        </motion.ul>
      )}

      {results?.results?.length === 0 && searchTerm.trim() !== "" && (
        <div className="mt-2 text-center">No projects found.</div>
      )}
    </div>
  );
}
