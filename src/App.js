import { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

function App() {
  const [itemName, setItemName] = useState('');
  const [itemsList, setItemsList] = useState(
    () => JSON.parse(localStorage.getItem('list')) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ status: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    //  form validation: diplay alert if no item is added
    if (!itemName) {
      alertStatus(true, 'Please enter an item name', 'danger');
      // edit an item
    } else if (itemName && isEditing) {
      setItemsList((prevList) => {
        return prevList.map((item) => {
          if (item.id === editId) {
            return { id: editId, title: itemName };
          } else {
            return item;
          }
        });
      });
      alertStatus(true, 'item name has been changed successfully', 'success');
      setEditId(null);
      setItemName('');
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: itemName };
      setItemsList([...itemsList, newItem]);
      setItemName('');
      alertStatus(true, 'item added to list', 'success');
    }
  };

  // helper function to display alert with default values: status=false, msg='', and type=''
  const alertStatus = (status = false, msg = '', type = '') => {
    setAlert({ status, msg, type });
  };

  // reset alert back to default values after 2s
  useEffect(() => {
    const timeout = setTimeout(() => {
      alertStatus();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [alert]);

  // useEffect hook for localStorage. This will run only when itemsList changes
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(itemsList));
  }, [itemsList]);

  const clearList = () => {
    setItemsList([]);
  };

  const handleEdit = (id) => {
    const foundItem = itemsList.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItemName(foundItem.title);
  };
  const handleDelete = (id) => {
    setItemsList((prevList) => {
      return prevList.filter((item) => item.id !== id);
    });
    alertStatus('true', 'item has been deleted', 'danger');
  };
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.status && <Alert alert={alert} />}
        <h3>Grocery List</h3>
        <div className='form-content'>
          <input
            type='text'
            className=''
            placeholder='eg: eggs'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        {itemsList.map((item) => {
          return (
            <List
              key={item.id}
              {...item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
        {itemsList.length > 0 && (
          <button className='clear-all-btn' onClick={clearList}>
            Clear all items
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
