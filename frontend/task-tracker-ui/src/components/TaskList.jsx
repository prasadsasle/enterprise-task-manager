import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import taskService from '../services/task';
import { Plus, Edit3, Trash2, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskService.getAllTasks();
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'TODO':
                return <AlertCircle className="w-4 h-4 text-orange-500" />;
            case 'IN_PROGRESS':
                return <Clock className="w-4 h-4 text-blue-500" />;
            case 'DONE':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'TODO':
                return `${baseClasses} bg-orange-100 text-orange-800`;
            case 'IN_PROGRESS':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'DONE':
                return `${baseClasses} bg-green-100 text-green-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dueDate, status) => {
        if (!dueDate || status === 'DONE') return false;
        return new Date(dueDate) < new Date();
    };

    const navigateToEdit = (id) => {
        navigate(`/tasks/${id}`)
    };

    const navigateToNew = () => {
        navigate('/tasks/new')
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm border border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
                            <p className="text-gray-600">Manage and track your team's tasks efficiently</p>
                        </div>
                        <button
                            onClick={navigateToNew}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            Create New Task
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Total Tasks</p>
                                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <AlertCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {tasks.filter(t => t.status === 'IN_PROGRESS').length}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {tasks.filter(t => t.status === 'DONE').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                            <p className="text-gray-600 mb-6">Get started by creating your first task</p>
                            <button
                                onClick={navigateToNew}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create Task
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {tasks.map(task => (
                                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{task.title}</div>
                                                {task.description && (
                                                    <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                                                        {task.description}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className={getStatusBadge(task.status)}>
                                                    {getStatusIcon(task.status)}
                                                    {task.status === 'TODO' ? 'To Do' :
                                                        task.status === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className={`text-sm ${isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                                        {formatDate(task.dueDate)}
                                                    </span>
                                                {isOverdue(task.dueDate, task.status) && (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                            Overdue
                                                        </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => navigateToEdit(task.id)}
                                                    className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(task.id)}
                                                    className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-full">
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this task? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;