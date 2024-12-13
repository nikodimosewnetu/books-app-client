import { useState,useEffect } from "react"
import BackButton from "../components/BackButton"
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"

const EditBook = () => {
    const [title,setTitle]= useState('');
    const [author,setAuthor] = useState('');
    const [publishYear,setPublishYear]= useState('');
    const navigate = useNavigate();
    const {id}= useParams();
    useEffect(()=>{
        axios
            .get(`https://books-app-server-ruddy.vercel.app/books/${id}`)
            .then((response)=>{
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setTitle(response.data.title);
               
            })
            .catch((error)=>{
                alert('An error happened. Please check console');
                console.log(error);
            })
    },[])

    const handleEditBook =()=>{
        const data={
            title,
            author,
            publishYear,
        };
        axios   
            .put(`https://books-app-server-ruddy.vercel.app/books/${id}`,data)
            .then(()=>{
                navigate('/home');
            })
            .catch((error)=>{
                console.log(error);
            });

    }
  return (
    <div className="p-4">
    <BackButton/>
    <h1 className="my-4">Edit Book</h1>

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

    <button className='btn btn-primary btn-lg' onClick={handleEditBook}>Save</button>
</div>
  )
}

export default EditBook