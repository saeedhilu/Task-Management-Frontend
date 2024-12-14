import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "react-query";
import UserSearchService from "@/services/admin/SearchUsers";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Spinner from "../spinner/Spinner";

export default function SearchSelectInput({setSelectedMembers, selectedUsers}) {
  const [searchTerm, setSearchTerm] = useState("");
    console.log('Selected users are :',selectedUsers);
    
  const { data: results, isLoading, refetch } = useQuery(
    ["searchUsers", searchTerm],
    () => UserSearchService.searchUsers(searchTerm),
    {
      enabled: searchTerm.length>0, 
      refetchOnWindowFocus: false,
    }
  );

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleSearch = () => {
    refetch(); // Refetch on search
  };

  const handleSelect = (user) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.some((u) => u.id === user.id)) {
        return prevSelected.filter((u) => u.id !== user.id); // Deselect if already selected
      }
      return [...prevSelected, user]; // Add user if not already selected
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
          placeholder="Search users..."
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

      {isLoading && (
        <div className="mt-2 text-center">
          <Spinner />
        </div>
      )}

      {results?.results?.length > 0 && (
        <motion.ul
          className="absolute w-1/2 border bg-black rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-auto"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          {results.results.map((user) => (
            <li
              key={user.id}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                selectedUsers.some((u) => u.id === user.id)
                  ? "bg-indigo-500 text-white"
                  : ""
              }`}
              onClick={() => handleSelect(user)}
            >
              <span>{user.username}</span>
              {selectedUsers.some((u) => u.id === user.id) && (
                <Check className="h-5 w-5 text-white" />
              )}
            </li>
          ))}
        </motion.ul>
      )}

      {results?.results?.length === 0 && searchTerm.trim() !== "" && (
        <div className="mt-2 text-center">No users found.</div>
      )}

     
    </div>
  );
}
