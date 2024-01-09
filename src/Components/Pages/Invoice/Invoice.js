import "./Invoice.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";

function Invoice () {
  const [data,setData] = useState([]);
  const [isLoading ,setIsLoading] = useState(true);
  useEffect(()=>{
         axios.get("https://localhost:7069/api/Invoice/GetInvoices")
               .then(response =>{
                   setData(response.data)
                   setIsLoading(false)
               })
               .catch(error => {
                alert(error.message)
                setIsLoading(false)
               })
  },[])
 
      return (
        <div className="invoices-container">
          <div className="invoices-header">
            <h3>Invoice Correspondence</h3>
            <br></br>
            <hr></hr>
            <br></br>
          </div>
            <table className="table">
                <thead>
                      <tr>
                        <th>Invoice Id</th>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Customer Email</th>
                        <th>Invoice total</th>
                        <th>Email Status</th>
                      </tr>
                </thead>
                <tbody>
                  {data.map(rowData=>(
                    <tr key={rowData.id} >
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.id}</Link></td>
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.customerName}</Link></td>
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.customerAddress}</Link></td>
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.customerEmail}</Link></td>
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.total}</Link></td>
                      <td><Link className="order-link" to={`/invoice-details/${rowData.id}`}>{rowData.status}</Link></td>
                    </tr>
                  ))}
                </tbody>
                {isLoading&& <Overlay message ="Loading"/>}
            </table>
        </div>
      )
}
export default Invoice