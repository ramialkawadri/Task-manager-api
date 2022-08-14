const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose.js');

const app = express();

app.use(express.json());
// Adding routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
