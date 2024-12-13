import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignUp = () => {
        axios
            .post('https://books-app-server-ruddy.vercel.app/user/signup', { username, email, password })
            .then(() => {
                enqueueSnackbar('Sign Up successful', { variant: 'success' });
                navigate('/');
            })
            .catch(error => {
                enqueueSnackbar('Sign up failed', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        placeholder="Enter username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <div className="text-center">
                    <p>Already have an account? <Link to='/'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
