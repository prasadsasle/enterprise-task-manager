import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '../services/task';
import employeeService from '../services/employee';
import { Save, ArrowLeft, User, Calendar, FileText, Flag, CheckCircle } from 'lucide-react';

function TaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TODO',
        dueDate: '',
        employeeId: ''
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesResponse = await employeeService.getAll();
                setEmployees(employeesResponse.data);

                if (id) {
                    const taskResponse = await taskService.getTaskById(id);
                    setTask(taskResponse.data);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!task.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!task.employeeId) {
            newErrors.employeeId = 'Please select an employee';
        }

        if (!task.dueDate) {
            newErrors.dueDate = 'Due date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSaving(true);
        try {
            if (id) {
                await taskService.updateTask(id, task);
            } else {
                await taskService.createTask(task);
            }
            navigate('/tasks');
        } catch (err) {
            console.error('Error saving task:', err);
        } finally {
            setSaving(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'TODO':
                return <Flag className="w-5 h-5 text-orange-500" />;
            case 'IN_PROGRESS':
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            case 'DONE':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            default:
                return <Flag className="w-5 h-5 text-gray-500" />;
        }
    };

    const handleBack = () => {
        navigate('/tasks')
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading form...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {id ? 'Edit Task' : 'Create New Task'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {id ? 'Update task information' : 'Add a new task to your project'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="p-8">
                        <div className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4" />
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                        errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter task title..."
                                />
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4" />
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    placeholder="Enter task description..."
                                />
                            </div>

                            {/* Status and Due Date Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Status Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        {getStatusIcon(task.status)}
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={task.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    >
                                        <option value="TODO">📋 To Do</option>
                                        <option value="IN_PROGRESS">🔄 In Progress</option>
                                        <option value="DONE">✅ Done</option>
                                    </select>
                                </div>

                                {/* Due Date Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4" />
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={task.dueDate}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                            errors.dueDate ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                    />
                                    {errors.dueDate && (
                                        <p className="mt-2 text-sm text-red-600">{errors.dueDate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Employee Selection */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4" />
                                    Assigned Employee
                                </label>
                                <select
                                    name="employeeId"
                                    value={task.employeeId}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                        errors.employeeId ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                    }`}
                                >
                                    <option value="">Select an employee...</option>
                                    {employees.map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name} ({employee.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.employeeId && (
                                    <p className="mt-2 text-sm text-red-600">{errors.employeeId}</p>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    onClick={handleSubmit}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {id ? 'Update Task' : 'Create Task'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Title:</span>
                            <span className="font-medium">{task.title || 'No title'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Status:</span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getStatusIcon(task.status)}
                                {task.status === 'TODO' ? 'To Do' : task.status === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Due Date:</span>
                            <span className="font-medium">{task.dueDate || 'No due date'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Assigned to:</span>
                            <span className="font-medium">
                                {task.employeeId ? employees.find(e => e.id === task.employeeId)?.name : 'No employee selected'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;