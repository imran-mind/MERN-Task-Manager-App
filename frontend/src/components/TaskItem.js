import React from 'react'
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { deleteTask, updateTaskById } from '../api';
import { notify } from '../utils';

function TaskItem({ item, fetchTasks, enableUpdateTask }) {

    const handleToggleCheckUncheck = async () => {
        try {
            const body = {
                taskName: item.taskName,
                isDone: !item.isDone
            }
            console.log(item._id, body);
            const { success, message } = await updateTaskById(item._id, body);
            if (success) {
                notify(message, 'warning');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to update task ', 'error');
        }
    }

    const handleDeleteTask = async () => {
        try {
            const { success, message } = await deleteTask(item._id);
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to delete task ', 'error');
        }
    }

    return (
        <div className="d-flex flex-column w-100">
            <div className="m-2 p-2 border
            bg-light w-100 rounded-3 d-flex 
            justify-content-between align-items-center">
                <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                    {item.taskName}
                </span>
                <div>
                    <button
                        onClick={handleToggleCheckUncheck}
                        type="button"
                        className="btn btn-success btn-sm me-2"><FaCheck />
                    </button>
                    <button type="button"
                        onClick={() => enableUpdateTask(item)}
                        className="btn btn-primary btn-sm me-2"><FaPencilAlt />
                    </button>
                    <button type="button"
                        onClick={handleDeleteTask}
                        className="btn btn-danger btn-sm"><FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem