import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveBook = () => {
        const token = localStorage.getItem('token');
        const data = new FormData();
        data.append('title', title);
        data.append('author', author);
        data.append('publishYear', publishYear);
        data.append('image', image);

        axios.post('https://books-app-server-ruddy.vercel.app/books', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(() => {
            enqueueSnackbar('Book created successfully!', { variant: 'success' });
            navigate('/home');
        })
        .catch((error) => {
            enqueueSnackbar('Failed to create book. Please try again.', { variant: 'error' });
            console.error('Error creating book:', error.response);
        });
    };

    return (
        <div className="container py-5">
            <BackButton />
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Create New Book</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="Enter book title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="form-control"
                        placeholder="Enter author's name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publishYear" className="form-label">Publish Year</label>
                    <input
                        type="number"
                        id="publishYear"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="form-control"
                        placeholder="Enter publish year"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Book Cover Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control"
                    />
                </div>

                <button
                    className="btn btn-primary w-100 py-2 mt-4"
                    onClick={handleSaveBook}
                >
                    Save Book
                </button>
            </div>
        </div>
    );
};

export default CreateBooks;
