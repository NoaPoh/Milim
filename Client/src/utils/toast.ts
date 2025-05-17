import { toast } from 'react-hot-toast';

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    duration: 2000,
    style: {
      padding: '16px',
      color: '#4a2101',
    },
    iconTheme: {
      primary: '#96d4b5',
      secondary: '#FFFAEE',
    },
  });

export const showErrorToast = (message: string) =>
  toast.error(message, {
    duration: 2000,
    style: {
      padding: '16px',
      color: '#4a2101',
    },
    iconTheme: {
      primary: '#e26d79',
      secondary: '#FFFAEE',
    },
  });
