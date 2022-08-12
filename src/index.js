const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
// Adding routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
