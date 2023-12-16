export const errorhandler = (statusCode, message) => { 
    const express = require('error:' + statusCode);
    error.statusCode = statusCode;
    error.message = message;
    return errorhandler;
}