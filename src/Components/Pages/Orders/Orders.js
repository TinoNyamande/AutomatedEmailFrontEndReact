import "./Orders.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";

function Orders () {
  const [data,setData] = useState([]);
  const [isLoading ,setIsLoading] = useState(true);
  useEffect(()=>{
         axios.get("https://localhost:7069/api/Orders/GetOrders")
               .then(response =>{
                   setData(response.data)
                   setIsLoading(false)
               })
               .catch(error => {
                //console.log(error[0])
                setIsLoading(false)
                alert(error.message)
                
               })
  },[])

      return (
        <div className="orders-container">
          <div className="orders-header">
            <h3>Orders Correspondence</h3>
            <br></br>
            <hr></hr>
            <br></br>
          </div>
            <table className="table">
                <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Customer Name</th>
                        <th>Pick up location</th>
                        <th>Shipping Method</th>
                        <th>Payment Method</th>
                        <th>Order Status</th>
                        <th>Email Status</th>
                      </tr>
                </thead>
                <tbody>
                  {data.map(rowData =>(
                    <tr key={rowData.id} >
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.id}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.customerName}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.pickUpLocation}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.shippingMethod}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.paymentMethod}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.orderStatus}</Link></td>
                      <td><Link className="order-link" to={`/order-details/${rowData.id}`}>{rowData.status}</Link></td>

                    </tr>
                  ))}
                </tbody>
                
            </table>
            {isLoading&& <Overlay message ="Loading"/>}
        </div>
      )
}
export default Orders