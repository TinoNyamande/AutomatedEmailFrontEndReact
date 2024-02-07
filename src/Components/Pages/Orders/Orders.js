import "./Orders.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Orders () {
  const [data,setData] = useState([]);
  const [isLoading ,setIsLoading] = useState(true);
  const [showModal ,setShowModal] = useState(false);
  const [inputs,setInputs] = useState({})

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setShow(false);
  
    setIsLoading(true);

    
    setShow(false);
    try {
      const response = await axios
        .post(
          "https://localhost:7111/LeaveApplication/LeaveApplications",
          inputs
        )
        .then((response) => {
          console.log(response);
          //alert("Application saved successfully");
          setModalHeader("Success");
          setModalMessage("Application has been made successfully");
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);
          setShow(false);
          setIsLoading(false);
        })
        .catch((error) => {
          setModalHeader("Error");
          setModalMessage(error.data["message"]);
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 2000);
          setIsLoading(false);
        });
    } catch (error) {
      setModalHeader("Error");
      setModalMessage("A network error occured .Please try again later");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
      setIsLoading(false);
    }
  };
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
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-primary form-control">Capture new</button>
            </div>
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
            
      <Modal show={showModal} onHide={handleClose} size="lg" className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="leave-application-form-container"
            onSubmit={handleSubmit}
          >
            <div className="leave-application-form-box">
              <label>Customer Name</label>
              <input
                name="customerName"
                className="form-control"
                type="date"
                value={inputs.customerName}
                onChange={handleChange}
              />
            </div>
            <div className="leave-application-form-box">
              <label>Customer Email</label>
              <input
                name="customerEmail"
                className="form-control"
                type="date"
                value={inputs.customerEmail}
                onChange={handleChange}
              />
            </div>
            <div className="leave-application-form-box">
              <label>Customer Address</label>
              <input
                name="customerAddress"
                className="form-control"
                type="date"
                value={inputs.customerAddress}
                onChange={handleChange}
              />
            </div>
            <div className="leave-application-form-box">
              <label>Pick up location</label>
              <input
                name="pickupLocation"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={inputs.pickupLocation}
              />
  
            </div>
            <div className="leave-application-form-box">
              <label>Payment Method</label>
              <input
                name="paymentMethod"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={inputs.paymentMethod}
              />
                 <div className="leave-application-form-box">
              <label>Shipping Method</label>
              <input
                name="shippingMethod"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={inputs.shippingMethod}
              />
         
            </div>
         
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )
}
export default Orders