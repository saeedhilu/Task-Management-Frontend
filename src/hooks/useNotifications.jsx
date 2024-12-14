import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useNotificationWebSocket = (addNotification) => {
  const accessToken = useSelector((state) => state.auth.accessToken); // Get token from Redux state

  useEffect(() => {
    if (!accessToken) {
      console.warn('Access token is missing. Notifications will not work.');
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/auth/ws/notifications/?token=${accessToken}`);
    
    // Open WebSocket connection
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addNotification(data)
      console.log('New Notification:', data); // Handle the notification
      // Example: Update your state or show notification UI
    };

    // Handle errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup: close the socket when component unmounts
    return () => {
      socket.close();
    };
  }, [accessToken]); // Dependency on accessToken to ensure refresh when token changes
};

export default useNotificationWebSocket;
