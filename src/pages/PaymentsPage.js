import React, { useState, useEffect } from "react";
import { fetchPayments, refundPayment } from "../services/paymentsService";
import { Button, Table } from "react-bootstrap"; // Import React Bootstrap components

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      const paymentsData = await fetchPayments();
      setPayments(paymentsData);
    };
    loadPayments();
  }, []);

  const handleRefund = async (paymentId) => {
    await refundPayment(paymentId);
    setPayments(payments.filter((payment) => payment.payment_id !== paymentId));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}

        {/* Main content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h1 className="text-primary mb-4">Payments</h1>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <Table striped bordered hover responsive>
              <thead className="thead-dark">
                <tr>
                  <th>Payment ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.payment_id}>
                    <td>{payment.payment_id}</td>
                    <td>{payment.user_id}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.status}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRefund(payment.payment_id)}
                      >
                        Refund
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
