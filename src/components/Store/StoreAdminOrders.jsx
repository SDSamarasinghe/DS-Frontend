import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Store.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StoreAdminOrders = () => {
  const [orders, setOrders] = useState([]);
//must check endpoint
  useEffect(() => {
    axios.get(`http://florage-api.pasinduprabhashitha.com/api/Order`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const printPdf = () => {
    const input = document.querySelector(".pdfdiv");
    html2canvas(input).then((canvas) => {
      var img = new Image();
      const doc = new jsPDF("p", "mm", "a4");
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(28);
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(16);
      doc.text(10, 70, "Agrotec LLC");
      doc.setTextColor(0, 255, 0);
      doc.setFontSize(12);
      doc.text(145, 85, "Signature :");
      //Date
      var m_names = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );

      var today = new Date();
      var seconds = today.getSeconds();
      var minutes = today.getMinutes();
      var hours = today.getHours();
      var curr_date = today.getDate();
      var curr_month = today.getMonth();
      var curr_year = today.getFullYear();

      today =
        m_names[curr_month] +
        " " +
        curr_date +
        "/ " +
        curr_year +
        " | " +
        hours +
        "h : " +
        minutes +
        "min : " +
        seconds +
        "sec";
      var newdat = today;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(130, 93, newdat);
      var imgHeight = (canvas.height * 200) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "JPEG", 5, 100, 200, imgHeight);
      const date = Date().split(" ");
      // we use a date string to generate our filename.
      const dateStr =
        "Florage Reports" + date[0] + date[1] + date[2] + date[3] + date[4];
      doc.save(`report_${dateStr}.pdf`);
    });
  };

  return (
    <div className="store-container d-flex justify-content-center p-5">
      <div className="min-vh-100 w-100" id="store-admin-admin456412123">
        <h3> Store Order Admin </h3>
        <p> These are the orders recived inside this month </p>

        <div className="d-flex">
          <button className="btn btn-success" onClick={printPdf}>
            <i class="fa-solid fa-file-pdf mx-2"></i> Download Orders As PDF
          </button>
        </div>

        <table
          class="table mt-4 store-orders-container pdfdiv"
          id="app-store-admin-table-header-44512135"
        >
          <thead className="store-admin-table-header">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr>
                 <div key={order.id}>
          <h2>Order {order.id}</h2>
          <p>User ID: {order.userId}</p>
          <p>Total Price: {order.totalPrice}</p>
          <p>Status: {order.status}</p>
          <ul>
            {order.products.map(item => (
              <li key={item.product.id}>
                {item.product.name} - {item.quantity} x ${item.product.price} = ${item.quantity * item.product.price}
              </li>
            ))}
          </ul>
        </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreAdminOrders;
