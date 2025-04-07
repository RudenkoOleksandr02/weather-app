import React from 'react';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Alert icon={<IconAlertCircle size={16} />} title="Помилка" color="red">
            {message}
        </Alert>
    );
};

export default ErrorMessage;
