import Header from './Header'
import Footer from './footer'
import Content from './content'
import { useState } from 'react';
import { AddItem } from './AddItem';
function App() {

   const [items,setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')));

    const [newItem, setNewItem] = useState('');

    const setAndSave = (newItems) =>{
        setItems(newItems)
        localStorage.setItem('shoppingList', JSON.stringify(newItems));
    }

    const addItem = (item)=>{
        const id = items.length ? items[items.length-1].id + 1 : 1;
        const myNewItem = {id,checked:false, item}
        const listItems = [...items, myNewItem]
        setAndSave(listItems)
    }

    function handleCheck(id){
        const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item);
        setAndSave(listItems)
    }

    function handleDelete(id){
        const listItems = items.filter((item)=> item.id !== id);
        setAndSave(listItems)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!newItem) return;
        addItem(newItem);
        setNewItem("")
    }
  return(
     <div className="App">
      <Header />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <Content items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
      <Footer length ={items.length}/>
    </div>
  )

}

export default App
