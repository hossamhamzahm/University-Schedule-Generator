import express from 'express';

interface Request extends express.Request {
    student_username?: string; // Add your custom property here
}

export default Request;