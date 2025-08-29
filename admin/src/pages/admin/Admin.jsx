import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../components/addProduct/AddProduct'
import ListProduct from '../../components/listProduct/ListProduct'
import Sidebar from '../../components/sidebar/Sidebar'
import './Admin.css'

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
    </div>
  )
}

export default Admin