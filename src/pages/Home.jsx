import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const usernameLocal = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!usernameLocal) {
        navigate('/');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            axios
                .get('https://books-app-server-ruddy.vercel.app/books', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setBooks(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 text-primary">Books List</h1>
                <Link to="/books/create" className="btn btn-lg btn-success">
                    <CiSquarePlus className="display-5" />
                    <span className="ms-2">Add Book</span>
                </Link>
                <div>
                    <span className="me-2">Welcome, {usernameLocal}!</span>
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>
            <BooksTable books={books} />
        </div>
    );
};

export default Home;
