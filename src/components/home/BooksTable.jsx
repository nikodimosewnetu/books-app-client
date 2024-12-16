
import { Link } from 'react-router-dom';
import { CiCircleInfo } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

 const BooksTable = ({books}) => {
 
    return (
    
    <table className='table table-striped text-center'>
        <thead>
            <tr>
                <th className='border'>No</th>
                <th className='border'>Title</th>
                <th className='border'>Author</th>
                <th className='border'>publish Year</th>
                <th className='border'>Operations</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book,index)=>(

                <tr key={book._id || index} className='h-8'>

                    <td className='border'>{index + 1}</td>
                    <td className='border'>{book.title}</td>
                    <td className='border'>{book.author}</td>
                    <td className='border'>{book.publishYear}</td>
                    <td className='border'>
                        <div className='flex justify-center gap-x-4'>
                            
                                
                            <Link to={`/books/details/${book._id}`}>
                            <CiCircleInfo className='mx-3'/>
                            </Link>
                            <Link to={`/books/edit/${book._id}`}>
                            <CiEdit  className='mx-3'/>
                            </Link>
                            <Link to={`/books/delete/${book._id}`}>
                            <MdDelete className='mx-3'/>
                            </Link>
                           
                        </div>
                    </td>

                </tr>
            ))}
        </tbody>
    </table>
  )
}


export default BooksTable;