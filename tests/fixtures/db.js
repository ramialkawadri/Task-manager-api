const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    name: 'userOne',
    email: 'userone@mail.com',
    password: '2341312@@32',
    _id: userOneId,
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY),
        },
    ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    name: 'userTwo',
    email: 'usertwo@mail.com',
    password: '2341312@@32',
    _id: userTwoId,
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY),
        },
    ],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOneId,
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: false,
    owner: userTwoId,
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();

    await Task.deleteMany();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
};

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    setupDatabase,
};
