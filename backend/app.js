const express = require('express');
const cors = require('cors');
const todoRoutes = require('./src/routes/todoRoutes')
const database = require('./src/config/database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});