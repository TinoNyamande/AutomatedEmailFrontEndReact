import "./Receipt.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";

function Receipt () {
  const [data,setData] = useState([]);
  const [isLoading ,setIsLoading] = useState(true);
  useEffect(()=>{
         axios.get("https://localhost:7069/api/Receipt/GetReceipts")
               .then(response =>{
                   setData(response.data)
                   setIsLoading(false)
               })
               .catch(error => {
                alert(error.message)
                setIsLoading(false)
               })
  },[data])

      return (
        <div className="receipts-container">
          <div className="receipts-header">
            <h3>Receipt Correspondence</h3>
            <br></br>
            <hr></hr>
            <br></br>
          </div>
            <table className="table">
                <thead>
                      <tr>
                        <th>Receipt Id</th>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Customer Email</th>
                        <th>Payment Method</th>
                        <th>Payment Date</th>
                        <th>Email Status</th>
                      </tr>
                </thead>
                <tbody>
                  {data.map(rowData=>(
                    <tr key={rowData.id} >
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.id}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.customerName}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.customerAddress}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.customerEmail}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.paymentMethod}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.paymentDate}</Link></td>
                      <td><Link className="order-link" to={`/receipt-details/${rowData.id}`}>{rowData.status}</Link></td>
                    </tr>
                  ))}
                </tbody>
            </table>
            {isLoading&& <Overlay message ="Loading"/>}

        </div>
      )
}
export default Receipt