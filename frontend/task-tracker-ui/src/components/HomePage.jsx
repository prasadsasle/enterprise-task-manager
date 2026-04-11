import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth';
import employeeService from "../services/employee.js";
import taskService from '../services/task';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentUser] = useState({ username: 'Admin' });
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // console.log("cn: " + currentUser.username);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        setMounted(true);
    }, [currentUser, navigate]);

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
        setIsLoggedIn(false);
    };

    if (!currentUser) {
        navigate('/login');
        return null;
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Logged out successfully!</h2>
                    <p className="text-gray-300">You would be redirected to login page in your actual app.</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeesRes, tasksRes] = await Promise.all([
                    employeeService.getAll(),
                    taskService.getAllTasks()
                ]);

                const employees = employeesRes.data;
                const tasks = tasksRes.data;

                setStats([
                    {
                        title: 'Total Employees',
                        value: employees.length,
                        link: '/employees',
                        icon: '👥',
                        gradient: 'from-blue-600 via-blue-700 to-indigo-800',
                        shadowColor: 'shadow-blue-500/25',
                        bgGradient: 'from-blue-50 to-indigo-100'
                    },
                    {
                        title: 'Active Tasks',
                        value: tasks.filter(t => t.status === 'IN_PROGRESS').length,
                        link: '/tasks',
                        icon: '⚡',
                        gradient: 'from-amber-500 via-orange-600 to-red-600',
                        shadowColor: 'shadow-orange-500/25',
                        bgGradient: 'from-orange-50 to-red-100'
                    },
                    {
                        title: 'Completed Tasks',
                        value: tasks.filter(t => t.status === 'DONE').length,
                        link: '/tasks',
                        icon: '✅',
                        gradient: 'from-emerald-500 via-green-600 to-teal-700',
                        shadowColor: 'shadow-green-500/25',
                        bgGradient: 'from-green-50 to-emerald-100'
                    }
                ]);

            } catch (err) {
                setError('Failed to load dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.3); }
                }
                
                @keyframes slide-in-left {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slide-in-right {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slide-in-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes bounce-in {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    70% { transform: scale(0.9); opacity: 0.9; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes wiggle {
                    0%, 7% { transform: rotateZ(0); }
                    15% { transform: rotateZ(-15deg); }
                    20% { transform: rotateZ(10deg); }
                    25% { transform: rotateZ(-10deg); }
                    30% { transform: rotateZ(6deg); }
                    35% { transform: rotateZ(-4deg); }
                    40%, 100% { transform: rotateZ(0); }
                }
                
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
                .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
                .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
                .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
                .animate-gradient-shift { 
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: gradient-shift 4s ease infinite;
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-wiggle { animation: wiggle 1s ease-in-out; }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .card-hover {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .card-hover:hover {
                    transform: translateY(-12px) rotateY(5deg) rotateX(5deg);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
                }
                
                .text-gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .btn-glow {
                    position: relative;
                    overflow: hidden;
                }
                
                .btn-glow::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                
                .btn-glow:hover::before {
                    left: 100%;
                }
                
                .floating-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                
                .floating-elements::before,
                .floating-elements::after {
                    content: '';
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
                    border-radius: 50%;
                    animation: float 8s ease-in-out infinite;
                }
                
                .floating-elements::before {
                    top: 10%;
                    left: 10%;
                    animation-delay: 0s;
                }
                
                .floating-elements::after {
                    bottom: 10%;
                    right: 10%;
                    animation-delay: 4s;
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Animated Background */}
                <div className="floating-elements"></div>

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>

                <div className="relative z-10 container mx-auto px-4 py-8">
                    {/* Welcome Header */}
                    <div className={`text-center mb-12 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
                        <header className="flex flex-col lg:flex-row justify-between items-center mb-8 glass-effect rounded-3xl p-8 shadow-2xl border border-white/10">
                            <div className="text-left mb-6 lg:mb-0">
                                <h1 className="text-4xl lg:text-6xl font-black text-gradient mb-4 animate-gradient-shift">
                                    Welcome back, {currentUser?.username || 'Admin'}!
                                    <span className="inline-block ml-2 animate-wiggle">👋</span>
                                </h1>
                                <p className="text-xl text-gray-300 font-medium">
                                    Let's conquer today with style and efficiency ✨
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="group relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 btn-glow"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="animate-wiggle">
                                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                                Logout
                            </button>
                        </header>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${mounted ? 'animate-bounce-in' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div
                                    className="group relative glass-effect rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/20 cursor-pointer card-hover"
                                    onClick={() => navigate(stat.link)}
                                >
                                    {/* Animated Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>

                                    {/* Content */}
                                    <div className="relative z-10 text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.bgGradient} rounded-3xl mb-6 text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ${stat.shadowColor} shadow-lg`}>
                                            <span className="animate-wiggle">{stat.icon}</span>
                                        </div>
                                        <h3 className="text-5xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                                            {stat.value}
                                        </h3>
                                        <p className="text-gray-300 font-semibold mb-6 group-hover:text-white transition-colors text-lg">
                                            {stat.title}
                                        </p>
                                        <button
                                            className={`bg-gradient-to-r ${stat.gradient} text-white px-8 py-3 rounded-2xl font-bold shadow-lg ${stat.shadowColor} hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 btn-glow`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(stat.link);
                                            }}
                                        >
                                            View All →
                                        </button>
                                    </div>

                                    {/* Floating particles */}
                                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-300"></div>
                                    <div className="absolute top-1/2 left-4 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className={`${mounted ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
                            <div className="group relative glass-effect rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-blue-500/30 card-hover">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                                <div className="relative z-10">
                                    <h5 className="flex items-center text-3xl font-black text-white mb-6 group-hover:text-blue-300 transition-colors">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                            </svg>
                                        </div>
                                        Employee Management
                                    </h5>
                                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                        Manage your dream team with advanced tools and insights
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 btn-glow"
                                            onClick={() => navigate('/employees')}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                            </svg>
                                            View Team
                                        </button>
                                        <button
                                            className="bg-white/10 backdrop-blur-sm border-2 border-blue-500 text-blue-300 hover:bg-blue-500/20 hover:text-white px-6 py-4 rounded-2xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 btn-glow"
                                            onClick={() => navigate('/employees/new')}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                                            </svg>
                                            Add Member
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${mounted ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
                            <div className="group relative glass-effect rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-green-500/30 card-hover">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                                <div className="relative z-10">
                                    <h5 className="flex items-center text-3xl font-black text-white mb-6 group-hover:text-green-300 transition-colors">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-green-500/25">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        Task Management
                                    </h5>
                                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                        Create, assign, and track tasks with powerful automation
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 btn-glow"
                                            onClick={() => navigate('/tasks')}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                            </svg>
                                            View Tasks
                                        </button>
                                        <button
                                            className="bg-white/10 backdrop-blur-sm border-2 border-green-500 text-green-300 hover:bg-green-500/20 hover:text-white px-6 py-4 rounded-2xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 btn-glow"
                                            onClick={() => navigate('/tasks/new')}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                                            </svg>
                                            Create Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;