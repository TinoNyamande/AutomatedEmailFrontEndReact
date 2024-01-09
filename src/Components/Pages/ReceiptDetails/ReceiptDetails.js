import { pdfjs,Document,Page } from "react-pdf";
import { useState,useEffect } from "react";
import "./ReceiptDetails.css";
import axios from "axios";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = new URL (
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url).toString();

function ReceiptDetails () {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const { id } = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
      axios
        .get(`https://localhost:7069/api/Receipt/GetReceiptById?Id=${id}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          const byteArray = response.data.pdfFile.fileContents;
          setFile(`data:application/pdf;base64,${byteArray}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
        const OnDocumentLoadSuccess = ({numPages}) =>{
            setTotalPages(numPages)
        }
    
            return (
                <div className="container-fluid document-container">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="receipt-details-header">Receipt for {data.customerName}</h3>
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
          <label>Customer Address</label>
<br></br>
          <input
            className="form-control"
            name="customerAddress"
            value={data.customerAddress}
            readOnly
          />{" "}
          <br></br>
          <label>Customer Phone</label>
          <br></br>
          <input
            className="form-control"
            name="customerPhone"
            value={data.customerPhone}
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
          <label>Invoice Date</label>
          <br></br>
          <input
            className="form-control"
            name="invoiceDate"
            value={data.receiptDate}
            readOnly
          />{" "}
          <br></br>
          <label>Total</label>
          <br></br>
          <input
            className="form-control"
            name="total"
            value={data.total}
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
              </div>
            );
    

}
export default ReceiptDetails