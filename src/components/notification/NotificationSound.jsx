import React from 'react';
// import notificationSound from '@/assets/notification.mp3';
import notificationSound from '../../assets/notification.mp3';


const NotificationSound = () => {
  const audio = new Audio(notificationSound);

  const playSound = () => {

    audio.play();
  };

  return { playSound };
};

export default NotificationSound;
