import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../services/employee';
import { User, Mail, Briefcase, Save, ArrowLeft, UserPlus } from 'lucide-react';

function EmployeeForm() {
    const { id } = useParams();
    const isEditing = Boolean(id);
    // const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        position: '',
    });

    useEffect(() => {
        if (isEditing) {
            employeeService.getById(id).then((res) => setEmployee(res.data)).catch(console.error);
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const action = isEditing
                ? await employeeService.update(id, employee)
                : await employeeService.create(employee);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/employees')
        }, 1000);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     const action = isEditing
    //         ? employeeService.update(id, employee)
    //         : employeeService.create(employee);
    //
    //     action
    //         .then(() => navigate('/employees'))
    //         .catch(console.error);
    // };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/*<button*/}
                            {/*    onClick={handleBack}*/}
                            {/*    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition-colors duration-200"*/}
                            {/*>*/}
                            {/*    <ArrowLeft className="h-6 w-6 text-gray-600" />*/}
                            {/*</button>*/}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                                {isEditing ? (
                                    <User className="h-8 w-8 text-white" />
                                ) : (
                                    <UserPlus className="h-8 w-8 text-white" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    {isEditing ? 'Edit Employee' : 'Add New Employee'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {isEditing ? 'Update employee information' : 'Create a new employee record'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>

                        <div className="p-8">
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="name"
                                            name="name"
                                            value={employee.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                                            placeholder="Enter employee's full name"
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={employee.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                                            placeholder="Enter employee's email address"
                                        />
                                    </div>
                                </div>

                                {/* Position Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Position
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="position"
                                            value={employee.position}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                                            placeholder="Enter job position"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            <Save className="h-5 w-5" />
                                        )}
                                        <span>
                      {isSubmitting ? 'Saving...' : (isEditing ? 'Update Employee' : 'Create Employee')}
                    </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mt-6 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Guidelines</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>Ensure the email address is valid and unique</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>Position should reflect the employee's current role</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>All fields are required for successful submission</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;
