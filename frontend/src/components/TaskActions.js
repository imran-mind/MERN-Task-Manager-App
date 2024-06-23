import React, { useEffect, useState } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa';
import { createTask, updateTaskById } from '../api';
import { notify } from '../utils';

function TaskActions({ fetchTasks, updateTask }) {
    const [input, setInput] = useState('');

    const handleAddTask = async () => {
        const taskBody = {
            taskName: input,
            isDone: false
        }
        try {
            const data = await createTask(taskBody);
            const { message, success } = data;
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to create task', 'error');
        }
    };
    const handleUpdateTask = async () => {
        const taskBody = {
            taskName: input,
            isDone: updateTask.isDone
        }
        try {
            const data = await updateTaskById(updateTask._id, taskBody);
            const { message, success } = data;
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to create task', 'error');
        }
    };

    const handleTask = () => {
        if (input && updateTask) {
            handleUpdateTask();
        } else if (input && updateTask === null) {
            handleAddTask();
        }
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 w-100">
            <div className="input-group flex-grow-1 me-2">
                <input type="text"
                    className="form-control me-1"
                    placeholder="Add a new task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={() => handleTask()}
                    type="button"
                    className="btn btn-success btn-sm me-2">
                    <FaPlus className='m-2' />
                </button>
            </div>
            <div className="input-group flex-grow-1 ">
                <span className="input-group-text"><FaSearch /></span>
                <input type="text"
                    className="form-control"
                    placeholder="Search tasks" />
            </div>
        </div>
    )
}

export default TaskActions