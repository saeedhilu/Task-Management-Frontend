import { useQuery } from 'react-query';
import DashboardStatitics from '@/services/admin/DashboardStatitics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BarChart from '../charts/StatiticsChart';

const DashboardCard = () => {
  const { data: stats, isLoading, error } = useQuery('dashboardCardStats', DashboardStatitics);

  console.log('====================================');
  console.log("hey are you okey ? ");
  console.log('====================================');
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="grid grid-cols-2 md:gap-10 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>   
        <CardContent>
          <p className="text-3xl font-bold">{stats.total_projects}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.total_tasks}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.total_users}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.completed_projects}</p>
        </CardContent>
      </Card>
      <BarChart stats={stats}/>
    </div>
  );
};

export default DashboardCard;




