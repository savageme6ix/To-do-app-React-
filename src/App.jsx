import Header from './Header'
import Footer from './footer'
import Content from './content'
import { useState, useEffect } from 'react';
import { AddItem } from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
function App() {

    const API_URL ='http://localhost:3500/items';

   const [items,setItems] = useState([]);

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchItems = async () => {
            try{
                const res = await fetch(API_URL);
                if (!res.ok) throw Error('Did not receive expected data')
                const listItems = await res.json();
                setItems(listItems)
                setError(null)
            } catch (error){
                console.log(error.message)
                setError(error.message)
            } finally{
                setLoading(false)
            }
        }
         setTimeout(()=>{
            fetchItems();
         },2000)
        
    },[])
    
    const addItem = async (item)=>{
        const id = items.length ? items[items.length-1].id + 1 : 1;
        const myNewItem = {id,checked:false, item}
        const listItems = [...items, myNewItem]
        setItems(listItems);

        const postOptions = {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(myNewItem)
        }
        const result = await apiRequest(API_URL, postOptions)
        if (result) setError(result);
    }

    const handleCheck = async (id) => {
        const listItems = items.map((item)=> item.id === id ? {...item, checked: !item.checked} : item);
        setItems(listItems);

         const myItem = listItems.filter((item) => item.id === id);
         const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked})
         };
         const reqUrl = `${API_URL}/${id}`;
         const result = await apiRequest(reqUrl, updateOptions)
         if(result) setError(result)
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item)=> item.id !== id);
        setItems(listItems)

        const deleteOptions = {method: 'DELETE'};
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions)
        if(result) setError(result);
         
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
      <main>
        {error && <p style={{color:"red"}}>{`Error: ${error} `}</p>}
        {loading && <p style={{color: "gray"}}>{`Loading...`}</p>}
        {!error && !loading &&
        <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
        handleCheck={handleCheck} 
        handleDelete={handleDelete} 
        />}
      </main>
      {<Footer length ={items.length}/>}
    </div>
  )

}

export default App
