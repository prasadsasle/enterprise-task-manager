import React, { useEffect, useState } from 'react';
import employeeService from '../services/employee';
import { ChevronDown, User, Search } from 'lucide-react';

function EmployeeDropdown({ employees = [], onSelect, selectedId = null }) {
    const [employeeList, setEmployeeList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        employeeService.getAll()
            .then((res) => setEmployeeList(res.data))
            .catch(console.error);
    }, []);

    const filteredEmployees = employeeList.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedEmployee = employeeList.find(emp => emp.id === selectedId);

    const handleSelect = (employee) => {
        onSelect(employee.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = () => {
        onSelect('');
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-left shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
                            <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            {selectedEmployee ? (
                                <div>
                                    <div className="font-medium text-gray-900">{selectedEmployee.name}</div>
                                    <div className="text-sm text-gray-500">{selectedEmployee.position}</div>
                                </div>
                            ) : (
                                <div className="text-gray-500">Select Employee</div>
                            )}
                        </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Employee Options */}
                    <div className="max-h-60 overflow-y-auto">
                        {/* Clear Selection Option */}
                        <button
                            type="button"
                            onClick={handleClear}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-500">Clear Selection</div>
                                    <div className="text-sm text-gray-400">No employee selected</div>
                                </div>
                            </div>
                        </button>

                        {/* Employee List */}
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <button
                                    key={emp.id}
                                    type="button"
                                    onClick={() => handleSelect(emp)}
                                    className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 ${
                                        selectedId === emp.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${
                                            selectedId === emp.id
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                                : 'bg-gradient-to-r from-blue-100 to-purple-100'
                                        }`}>
                                            <User className={`h-4 w-4 ${
                                                selectedId === emp.id ? 'text-white' : 'text-blue-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-medium ${
                                                selectedId === emp.id ? 'text-blue-900' : 'text-gray-900'
                                            }`}>
                                                {emp.name}
                                            </div>
                                            <div className={`text-sm ${
                                                selectedId === emp.id ? 'text-blue-600' : 'text-gray-500'
                                            }`}>
                                                {emp.position}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-gray-500">
                                <User className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <div className="text-sm">No employees found</div>
                                <div className="text-xs text-gray-400 mt-1">Try adjusting your search</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

export default EmployeeDropdown;
