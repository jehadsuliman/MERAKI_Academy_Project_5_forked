import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button} from "react-bootstrap";

const stripePromise = loadStripe('pk_test_51Pl7XUP97YxpocBfHEfA1ZpxuAxI3r2HGtkqQVywFuJG6a6xlW0k1GyJp00KwcgVvdCAxgjrggt5HnY2VPxIEptz00p1a0sFGt');

const PaymentForm = ({ cart }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/stripe/create-checkout-session', {
        cart
      });
            const { sessionId } = response.data;

      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Stripe Checkout error:', error);
        }
      } else {
        console.error('Stripe.js has not loaded yet.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Button role="link"  variant="primary" onClick={handleCheckout}>
      Checkout
      </Button>  );
};

export default PaymentForm;
