import Header from './Header'
import Footer from './footer'
import Content from './content'
import { useState, useEffect } from 'react';
import { AddItem } from './AddItem';
import SearchItem from './SearchItem';
function App() {

    const API_URL ='http://localhost:3500/items';

   const [items,setItems] = useState([]);

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');

    useEffect(()=>{
        
    },[])
    
    const addItem = (item)=>{
        const id = items.length ? items[items.length-1].id + 1 : 1;
        const myNewItem = {id,checked:false, item}
        const listItems = [...items, myNewItem]
        setItems(listItems)
    }

    function handleCheck(id){
        const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item);
        setItems(listItems)
    }

    function handleDelete(id){
        const listItems = items.filter((item)=> item.id !== id);
        setItems(listItems)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!newItem) return;
        addItem(newItem);
        setNewItem("")
    }
  return(
     <div className="App">
      {<Header />}
      <SearchItem search={search} setSearch={setSearch}/>
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
      handleCheck={handleCheck} 
      handleDelete={handleDelete} 
      />
      {<Footer length ={items.length}/>}
    </div>
  )

}

export default App
