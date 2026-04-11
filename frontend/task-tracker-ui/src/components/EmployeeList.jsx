import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import employeeService from '../services/employee';
import { User, Edit, Trash2, Plus, Search, Users } from 'lucide-react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getAll();
                setEmployees(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load employees');
                setLoading(false);
                console.error(err);
            }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        try {
            await employeeService.remove(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (err) {
            setError('Failed to delete employee');
            console.error(err);
        }
    };

    const navigateToNewEmployee = () => {
        navigate('/employees/new');
    };

    const navigateToEditEmployee = (id) => {
        navigate(`/employees/edit/${id}`);
    };

    if (loading) return <div className="text-center my-4">Loading employees...</div>;
    if (error) return <div className="alert alert-danger my-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Employee Management
                                </h1>
                                <p className="text-gray-600 mt-1">Manage your team members</p>
                            </div>
                        </div>
                        <button
                            onClick={navigateToNewEmployee}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Add Employee</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Search Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employees by name, email, or position..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Employee Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((emp) => (
                        <div
                            key={emp.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
                        >
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                                        <User className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{emp.name}</h3>
                                        <p className="text-gray-600 text-sm">{emp.position}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <p className="text-gray-700 text-sm">
                                        <span className="font-medium">Email:</span> {emp.email}
                                    </p>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => navigateToEditEmployee(emp.id)}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                                        // className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                                        // className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEmployees.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                            <Users className="h-12 w-12 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No employees found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first employee'}
                        </p>
                        <button
                            onClick={navigateToNewEmployee}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center space-x-2"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Add Employee</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeList;
