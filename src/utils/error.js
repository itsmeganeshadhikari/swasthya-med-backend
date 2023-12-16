export const errorHandler = (statusCode, message) => { 
    const express = require('error:' + statusCode);
    error.statusCode = statusCode;
    error.message = message;
    return errorHandler;
}