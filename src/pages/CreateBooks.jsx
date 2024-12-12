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
            enqueueSnackbar('Book created successfully');
            navigate('/home');
        })
        .catch((error) => {
            console.error('Error creating book:', error.response);
            enqueueSnackbar('Failed to create book', { variant: 'error' });
        });
    };
    

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="my-4">Create Book</h1>
            <div className="p-4">
                <label className="my-4">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='mx-5 px-4 py-2' />
            </div>
            <div className="p-4">
                <label className="my-4">Author</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className='mx-5 px-4 py-2' />
            </div>
            <div className="p-4">
                <label className="my-4">Publish Year</label>
                <input
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className='mx-5 px-4 py-2' />
            </div>
            <div className="my-4">
                <label className='text-xl mr-4 text-gray-500'>Image</label>
                <input type="file"
                    onChange={(e) => { setImage(e.target.files[0]); }}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>

            <button className='btn btn-primary btn-lg' onClick={handleSaveBook}>Save</button>
        </div>
    );
}

export default CreateBooks;
