import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Layout/Home/Home';
import Orders from './Components/Pages/Orders/Orders';
import Navbar from './Components/Layout/Navbar/Navbar';
import "bootstrap/dist/css/bootstrap.css"
import OrderDetails from './Components/Pages/OrderDetails/OrderDetails';
import Invoice from './Components/Pages/Invoice/Invoice';
import Receipt from './Components/Pages/Receipt/Receipt';
import InvoiceDetails from './Components/Pages/InvoiceDetails/InvoiceDetails';
import ReceiptDetails from './Components/Pages/ReceiptDetails/ReceiptDetails';

function App() {
  return (
      <BrowserRouter>
               <Navbar/>
      <Routes>
        <Route>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element = {<Orders/>} />
          <Route path= "/order-details/:id" element={<OrderDetails/>} />
          <Route path="/invoices" element={<Invoice/>} />
          <Route path="/invoice-details/:id" element={<InvoiceDetails/>} />
          <Route path="/receipts" element={<Receipt/>} />
          <Route path="/receipt-details/:id" element = {<ReceiptDetails/>} />
          
        </Route>
      </Routes>
      
      </BrowserRouter>
  );
}

export default App;
