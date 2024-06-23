const express = require('express');
const app = express();
require('dotenv').config();
require('./Modals/db');
const TaskRouter = require('./Routes/TaskRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9090;
app.get('/', (req, res) => {
    res.send('Hello from server')
});
app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})