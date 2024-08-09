import React from 'react';
import Table from "react-bootstrap/Table";
import { Tag, Button } from 'antd';

const OrderList = () => {
  const orders = [
    {
      id: 1,
      userName: 'Jihad Suliman',
      cartId: 'cart1',
      totalPrice: 12,
      address: '123 Main St, Amman, Jordan',
      status: 'completed'
    },
    {
      id: 2,
      userName: 'Ali Hassan',
      cartId: 'cart2',
      totalPrice: 67.89,
      address: '456 Elm St, Amman, Jordan',
      status: 'pending'
    },
    {
      id: 3,
      userName: 'Fatima Zahra',
      cartId: 'cart3',
      totalPrice: 234.56,
      address: '789 Pine St, Amman, Jordan',
      status: 'canceled'
    },
    {
      id: 4,
      userName: 'Omar Khaled',
      cartId: 'cart4',
      totalPrice: 98.76,
      address: '101 Maple St, Amman, Jordan',
      status: 'completed'
    },
    {
      id: 5,
      userName: 'Mona Nader',
      cartId: 'cart5',
      totalPrice: 345.67,
      address: '202 Oak St, Amman, Jordan',
      status: 'pending'
    },
    {
      id: 6,
      userName: 'Sara Ahmad',
      cartId: 'cart6',
      totalPrice: 456.78,
      address: '303 Birch St, Amman, Jordan',
      status: 'completed'
    }
  ];

  const getStatusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag bordered={false} color="success">Success</Tag>;
      case 'pending':
        return <Tag bordered={false} color="warning">Pending</Tag>;
      case 'canceled':
        return <Tag bordered={false} color="error">Canceled</Tag>;
      default:
        return <Tag bordered={false} color="default">Unknown</Tag>;
    }
  };


  return (
    <div className="container mt-3">
      <h3 className="mb-4">Order List</h3>
      <Table responsive className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">User Name</th>
            <th scope="col">Cart</th>
            <th scope="col">Total Price</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <th>{index + 1}</th>
              <td>{order.userName || 'N/A'}</td>
              <td>
                <Button variant="success">View Cart</Button>
              </td>
              <td>${order.totalPrice.toFixed(2) || '0.00'}</td>
              <td>{order.address || 'No Address Provided'}</td>
              <td>{getStatusTag(order.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderList;
