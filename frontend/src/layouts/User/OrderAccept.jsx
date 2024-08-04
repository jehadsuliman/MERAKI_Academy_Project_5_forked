import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const OrderAccept = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };
 
  return (
    <div>  <Result
    status="success"
    title="Congrats! Your Order has been Accepted."
   
    extra={[
      <Button key="buy" onClick={goToHomePage}>Return To Store</Button>,
    ]}
  /></div>
  )
}

export default OrderAccept