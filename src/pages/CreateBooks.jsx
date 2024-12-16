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
    const [loading, setLoading] = useState(false); // Loading state for button
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // Handle file selection
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Validation check before submitting the form
    const validateForm = () => {
        if (!title || !author || !publishYear) {
            enqueueSnackbar('Please fill all required fields: title, author, and publish year.', { variant: 'error' });
            return false;
        }
        if (isNaN(publishYear) || publishYear <= 0) {
            enqueueSnackbar('Please enter a valid publish year.', { variant: 'error' });
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSaveBook = async () => {
        // Validate form data before proceeding
        if (!validateForm()) return;

        const token = localStorage.getItem('token');  // Get JWT token from localStorage
        if (!token) {
            enqueueSnackbar('Authentication failed! Please login.', { variant: 'error' });
            return;
        }

        const data = new FormData();
        data.append('title', title);
        data.append('author', author);
        data.append('publishYear', publishYear);
        if (image) {
            data.append('image', image);  // Append the image file if provided
        }

        setLoading(true); // Set loading state to true while sending the request
        try {
            // Make POST request to backend with form data
            const response = await axios.post('https://books-app-server-ruddy.vercel.app/books', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,  // Send the JWT token in the Authorization header
                },
            });

            // On success
            console.log('Server Response:', response.data); // Log the response data (useful for debugging or further handling)
            enqueueSnackbar('Book created successfully!', { variant: 'success' });
            resetForm();  // Reset form fields after successful submission
            navigate('/home');  // Redirect to the home page or any other page you prefer
        } catch (error) {
            // On error
            if (error.response) {
                enqueueSnackbar(error.response.data.message || 'Failed to create book. Please try again.', { variant: 'error' });
            } else {
                enqueueSnackbar('Network error. Please try again later.', { variant: 'error' });
            }
            console.error('Error creating book:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Reset form fields after submission
    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setPublishYear('');
        setImage(null);
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
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>

                <button
                    className="btn btn-primary w-100 py-2 mt-4"
                    onClick={handleSaveBook}
                    disabled={loading}  // Disable the button while loading
                >
                    {loading ? 'Saving...' : 'Save Book'}
                </button>
            </div>
        </div>
    );
};

export default CreateBooks;
