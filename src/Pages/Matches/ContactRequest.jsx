import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Payment/CheckoutForm';

const ContactRequest = () => {


    // add Publish Key
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default ContactRequest;