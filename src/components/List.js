import { FaEdit, FaTrash } from 'react-icons/fa';

function List({ id, title, handleEdit, handleDelete }) {
  return (
    <div className='single-item'>
      <p className='title'>{title}</p>
      <div className='btn-container'>
        <button className='edit-btn' onClick={() => handleEdit(id)}>
          <FaEdit />
        </button>
        <button className='delete-btn' onClick={() => handleDelete(id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default List;
