
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/login';
import { Register } from './Components/register';
import {AddProduct} from './Components/addproduct';
import {ProductList} from './Components/productlist';
import {UpdateProduct} from './Components/UpdateProduct';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Register></Register>}></Route>
        <Route path="/add-product" element={<AddProduct></AddProduct>}></Route>
        <Route path="/product/list" element={<ProductList></ProductList>}></Route>
        <Route path="/update/:proId" element={<UpdateProduct></UpdateProduct>}></Route>
  
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
