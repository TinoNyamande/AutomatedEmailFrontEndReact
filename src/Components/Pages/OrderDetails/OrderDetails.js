import { pdfjs, Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "./OrderDetails.css";
import axios from "axios";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useParams } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function OrderDetails() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://localhost:7069/api/Orders/GetOrderById?Id=${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        const byteArray = response.data.pdfFile.fileContents;
        setFile(`data:application/pdf;base64,${byteArray}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const OnDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  return (
    <div className="container-fluid document-container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="order-details-header">
            Order for {data.customerName}
          </h3>
          <hr></hr>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <label>Order Id</label>
          <br></br>
          <input className="form-control" name="id" value={data.id} readOnly />
          <label>Customer Name</label>
          <br></br>
          <input
            className="form-control"
            name="customerName"
            value={data.customerName}
            readOnly
          />{" "}
          <br></br>
          <label>Customer Email</label>
          <br></br>
          <input
            className="form-control"
            name="customerEmail"
            value={data.customerEmail}
            readOnly
          />{" "}
          <br></br>
          <label>Order Status</label>
          <br></br>
          <input
            className="form-control"
            name="orderStatus"
            value={data.orderStatus}
            readOnly
          />{" "}
          <br></br>
          <label>Payment Method</label>
          <br></br>
          <input
            className="form-control"
            name="paymentMethod"
            value={data.paymentMethod}
            readOnly
          />{" "}
          <br></br>
          <label>Placed On</label>
          <br></br>
          <input
            className="form-control"
            name="placedOn"
            value={data.placedOn}
            readOnly
          />{" "}
          <br></br>
          <label>Shipping Method</label>
          <br></br>
          <input
            className="form-control"
            name="shippingMethod"
            value={data.shippingMethod}
            readOnly
          />{" "}
          <br></br>
          <label>Status</label>
          <br></br>
          <input
            className="form-control"
            name="status"
            value={data.status}
            readOnly
          />{" "}
          <br></br>
        </div>

        <div className="col-md-8">
          {file && (
            <Document file={file} onLoadSuccess={OnDocumentLoadSuccess}>
              {totalPages &&
                Array.from(new Array(totalPages), (el, index) => index + 1).map(
                  (pageNumber) => (
                    <Page key={pageNumber} pageNumber={pageNumber} />
                  )
                )}
            </Document>
          )}
        </div>
      </div>
      {isLoading && <Overlay message="Loading" />}
    </div>
  );
}
export default OrderDetails;
