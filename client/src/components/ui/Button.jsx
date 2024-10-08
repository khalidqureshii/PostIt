// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
};

export default Button;
