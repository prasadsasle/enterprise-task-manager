import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth.js';
import { Eye, EyeOff, User, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (isRegistering) {
                await auth.register(username, password);
                console.log("Successfully registered")
            }
            const data = await auth.login(username, password);

            if (data?.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('username', data.username);
                localStorage.setItem('user', JSON.stringify(data));
                setIsLoggedIn(true);
                navigate('/');
                console.log("Successfully logged in")
            }
        } catch (err) {
            setError(isRegistering
                ? 'Registration failed. Username may be taken.'
                : 'Login failed. Check credentials.');
            console.error("Auth error:", err);
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
             style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
             }}>

            {/* Animated background elements */}
            <div className="position-absolute w-100 h-100 overflow-hidden">
                <div className="position-absolute rounded-circle opacity-10"
                     style={{
                         background: 'rgba(255,255,255,0.1)',
                         width: '300px',
                         height: '300px',
                         top: '10%',
                         left: '80%',
                         animation: 'float 6s ease-in-out infinite'
                     }}></div>
                <div className="position-absolute rounded-circle opacity-10"
                     style={{
                         background: 'rgba(255,255,255,0.1)',
                         width: '200px',
                         height: '200px',
                         bottom: '20%',
                         left: '10%',
                         animation: 'float 8s ease-in-out infinite reverse'
                     }}></div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div className="card shadow-lg border-0"
                             style={{
                                 borderRadius: '20px',
                                 backdropFilter: 'blur(10px)',
                                 background: 'rgba(255, 255, 255, 0.95)',
                                 transform: 'translateY(0)',
                                 transition: 'all 0.3s ease'
                             }}>

                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <div className="mb-3">
                                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                             style={{
                                                 width: '60px',
                                                 height: '60px',
                                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                 color: 'white'
                                             }}>
                                            <User size={24} />
                                        </div>
                                    </div>
                                    <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
                                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                                    </h2>
                                    <p className="text-muted mb-0">
                                        {isRegistering
                                            ? 'Join us and start managing your tasks'
                                            : 'Sign in to your account to continue'}
                                    </p>
                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="alert alert-danger border-0 rounded-3 mb-4"
                                         style={{
                                             background: 'rgba(220, 53, 69, 0.1)',
                                             color: '#dc3545',
                                             animation: 'slideInDown 0.3s ease'
                                         }}>
                                        <div className="d-flex align-items-center">
                                            <AlertCircle size={18} className="me-2" />
                                            {error}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Username Field */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                                            Username
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control border-0 rounded-3 ps-5"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Enter your username"
                                                required
                                                style={{
                                                    background: '#f7fafc',
                                                    height: '50px',
                                                    fontSize: '16px',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                                                onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                                            />
                                            <User
                                                size={18}
                                                className="position-absolute text-muted"
                                                style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field (Registration only) */}
                                    {isRegistering && (
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                                                Email
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type="email"
                                                    className="form-control border-0 rounded-3 ps-5"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    required
                                                    style={{
                                                        background: '#f7fafc',
                                                        height: '50px',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                                                    onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                                                />
                                                <Mail
                                                    size={18}
                                                    className="position-absolute text-muted"
                                                    style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Password Field */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                                            Password
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control border-0 rounded-3 ps-5 pe-5"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                required
                                                minLength="6"
                                                style={{
                                                    background: '#f7fafc',
                                                    height: '50px',
                                                    fontSize: '16px',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                                                onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                                            />
                                            <Lock
                                                size={18}
                                                className="position-absolute text-muted"
                                                style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute text-muted p-0"
                                                style={{ right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field (Registration only) */}
                                    {isRegistering && (
                                        <div className="mb-4">
                                            <label htmlFor="confirmPassword" className="form-label fw-semibold" style={{ color: '#4a5568' }}>
                                                Confirm Password
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="form-control border-0 rounded-3 ps-5 pe-5"
                                                    id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm your password"
                                                    required
                                                    minLength="6"
                                                    style={{
                                                        background: '#f7fafc',
                                                        height: '50px',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                                                    onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                                                />
                                                <Lock
                                                    size={18}
                                                    className="position-absolute text-muted"
                                                    style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-link position-absolute text-muted p-0"
                                                    style={{ right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn w-100 mb-4 border-0 rounded-3 fw-semibold"
                                        disabled={isLoading}
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            height: '50px',
                                            fontSize: '16px',
                                            transition: 'all 0.3s ease',
                                            transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                    >
                                        {isLoading ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                {isRegistering ? 'Creating Account...' : 'Signing In...'}
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <CheckCircle size={18} className="me-2" />
                                                {isRegistering ? 'Create Account' : 'Sign In'}
                                            </div>
                                        )}
                                    </button>

                                    {/* Toggle Form */}
                                    <div className="text-center">
                                        <p className="text-muted mb-2">
                                            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-link fw-semibold p-0"
                                            onClick={toggleForm}
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {isRegistering ? 'Sign In' : 'Create Account'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .form-control:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
      `}</style>
        </div>
    );
}

export default Login;