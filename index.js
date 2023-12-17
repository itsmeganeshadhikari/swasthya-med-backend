const app = require('./src/app');
const dotenv = require('dotenv').config(); // dotenv is a package that allows us to store environment variables in a .env file
const port = process.env.PORT || 3000; // process.env.PORT is an environment variable that is set by Heroku

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

