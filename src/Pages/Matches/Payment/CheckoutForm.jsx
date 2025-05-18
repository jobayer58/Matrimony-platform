import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const bioData = useLoaderData()
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const { serialNumber } = bioData
    const { user } = UseAuth()
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = UseAxiosSecure()
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements();
    const price = 5;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])



    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // payment confirm
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('confirm error')
            // Swal.fire({
            //     icon: "error",
            //     text: confirmError.message,
            //     timer: 2000,
            //   });
            setProcessing(false)
        } else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                //  save the paymentInfo in the database
                const payment = {
                    id: bioData?._id,
                    bioDataId: bioData?.bioDataId,
                    serialNumber: bioData?.serialNumber,
                    name: bioData?.name,
                    email: bioData?.email,
                    userEmail: user?.email,
                    mobileNumber: bioData?.mobileNumber,
                    price: price,
                    contactEmail: bioData.contactEmail,
                    transactionId: paymentIntent?.id,
                    date: new Date(), // convert utc date 
                    status: "pending",
                };

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // refetch();
                if (res?.data?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment successfully",
                        text: "Please wait for admin approval to access the contact information.",
                        timer: 2000,
                    });
                    setProcessing(false);
                    navigate('/dashboard/userContactRequest')
                }


            }

        }

    }
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 py-10 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
                        Request Contact Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Biodata ID */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Biodata ID</label>
                            <input
                                type="text"
                                value={serialNumber}
                                readOnly
                                className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Self Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Your Email</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Stripe Card Number Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                            {/* <input
                                type="text"
                                placeholder="**** **** **** ****"
                                className="w-full  px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            /> */}
                            <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-pink-400">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                            invalid: {
                                                color: '#9e2146',
                                            },
                                        },
                                    }}
                                />
                            </div>

                        </div>

                        {/* Submit Button */}
                        <p className='text-red-400'>{error}</p>
                        <button
                            disabled={!stripe || processing}
                            type="submit"
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            {/* Pay $5 & Request Info */}
                            {processing ? "Processing..." : "Pay $5 & Request Info"}
                        </button>
                        {/* {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>} */}

                        {/* divider */}
                        <div className="flex items-center my-2">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="mx-3 text-gray-500 font-medium">OR</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <Link to='/dashboard/editBioData'>
                            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                                Make BioData and request For Free premium
                            </button>
                        </Link>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default CheckoutForm;