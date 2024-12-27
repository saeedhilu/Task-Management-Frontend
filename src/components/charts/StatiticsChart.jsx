import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 
const BarChart = ({ stats }) => {
    console.log('stats is :');
    
  const data = {
    labels: ['Total Projects', 'Total Tasks', 'Total Users', 'Completed Projects'],
    datasets: [
      {
        label: 'Counts',
        data: [stats.total_projects, stats.total_tasks, stats.total_users, stats.completed_projects],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
