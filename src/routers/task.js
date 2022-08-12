const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, owner: req.user._id });
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// GET /tasks?completed=...&limit=...&skip=...&sortBy=field:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: Number.parseInt(req.query.limit),
                skip: Number.parseInt(req.query.skip),
                sort,
            },
        });
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(404).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) return res.status(400).send();

    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndRemove({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
