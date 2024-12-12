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
        <div className="container p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="lead display-4 mt-5">Books List</h1>
                <Link to="/books/create">
                    <CiSquarePlus className="display-5" />
                </Link>
                <span className="mx-2">Welcome, {usernameLocal}!</span>
                <button
                    className="btn btn-primary my-3"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
            <BooksTable books={books} />
        </div>
    );
};

export default Home;
