import React, { useEffect, useState } from 'react';
import Footer from '../components/Common/Footer';
import orderPlacedImage from '../assets/images/orderplaced.png';
import Header from '../components/Common/Header';
import { useNavigate } from 'react-router-dom';

const contactDetails = {
    emailId: "admin@bookstore.com",
    phoneNo: "+91 9876543210",
    address: "42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034"
};

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState<number | string>('');

    useEffect(() => {
        generateOrderId();
    }, [])

    const generateOrderId = () => {
        const orderId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(orderId);
    }
    return (
        <div>
            <Header container='home'/>
            <div className='max-w-6xl min-h-[84.85vh] mx-auto p-8 flex flex-col gap-10 items-center'>
                <img src={orderPlacedImage} alt='Order Placed' className='mx-auto w-[25%] object-cover' />
                <p className='text-center text-lg text-[#333232] w-1/3 font-medium'>
                    Hurray!!! Your order is confirmed. <br/>
                    The order ID is <strong>#{orderId}</strong>. <br/>
                    Save the order ID for further communication.
                </p>

                <table className="w-[60%] border-collapse border border-gray-300 text-left">
                    <thead className="bg-gray-200 text-center">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-semibold">Email Us</th>
                            <th className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-semibold">Contact Us</th>
                            <th className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-semibold">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-normal">{contactDetails.emailId}</td>
                            <td className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-normal">{contactDetails.phoneNo}</td>
                            <td className="px-4 py-2 border border-gray-300 text-[#333232] text-xs font-normal w-1/2">{contactDetails.address}</td>
                        </tr>
                    </tbody>
                </table>
                
                <button onClick={() => navigate("/")} className='bg-[#3371B5] text-sm uppercase py-2 px-7 rounded-sm text-white'>
                    Continue Shopping
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
