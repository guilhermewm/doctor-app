import React from 'react';

import './styles.scss';

type ErrorMessageProps = {
    text?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({text}) => {
    
    return (
        <div className="error">{text}</div>
    )
}

export default ErrorMessage;
