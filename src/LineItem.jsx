import { FaTrashAlt } from 'react-icons/fa';
const LineItem = ({item , handleCheck, handleDelete}) => {
  return (
      
         <li className="item">
            <input 
                onChange={()=> handleCheck(item.id)}
                type="checkbox"
                checked={item.checked}
            />
            <label onDoubleClick={()=> handleCheck(item.id)} style={{textDecoration: item.checked ? 'line-through' : 'none' }}>{item.item} </label>
            <FaTrashAlt role="button" 
                        tabIndex="0"
                        onClick={()=> handleDelete(item.id)} 
            />
         </li>

  )
}

export default LineItem