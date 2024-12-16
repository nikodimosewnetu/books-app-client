import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        axios
            .post('https://books-app-server-ruddy.vercel.app/user/login', { username, password })
            .then((response) => {
                const { username, token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', username);
                enqueueSnackbar('Login successful', { variant: 'success' });
                navigate('/home', { state: { username } });
            })
            .catch((error) => {
                enqueueSnackbar('Login failed', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Login</h2>
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
                    onClick={handleLogin}
                >
                    Login
                </button>
                <div className="text-center">
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
