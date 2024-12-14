import React, { useState } from 'react';
import { CardComponent } from '@/components/card/Card';
import FetchTask from '@/services/user/TaskListingService';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Dropdown from '@/components/dropedown/Dropedown';
import SkeletonCard from '@/components/skeletons/TaskCardSkeleton';

const TaskListing = () => {
  const userEmail = useSelector((state) => state.auth.user.email);
  const [selectedStatus, setSelectedStatus] = useState('todo');
  const { data: tasks, isLoading, isError } = useQuery(
    ['tasks', userEmail, selectedStatus],
    () => FetchTask(userEmail, selectedStatus)
  );

  if (isLoading) return <SkeletonCard/>
  if (isError) return <p>Error loading tasks.</p>;

  return (
    <div className='pl-3' >
      
      <Dropdown
        selectedStatus={selectedStatus}
        onChange={setSelectedStatus}
      />

    
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {tasks?.length === 0 ? (
    <p>No tasks available at the moment.</p>
  ) : (
    tasks.map((task) => <CardComponent key={task.id} task={task} />)
  )}
</div>

    </div>
  );
};

export default TaskListing;
