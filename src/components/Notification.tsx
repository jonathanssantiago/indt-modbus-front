import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  message: string;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

const Notification = ({
  message,
  severity,
  open,
  onClose,
  autoHideDuration = 6000,
}: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
