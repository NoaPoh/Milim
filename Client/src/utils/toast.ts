import { toast } from 'react-hot-toast';

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    duration: 2000,
    style: {
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#96d4b5',
      secondary: '#FFFAEE',
    },
  });
