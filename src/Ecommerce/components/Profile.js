import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Checkout({  userToken }) {
    const navigate = useNavigate();

    const [name, setName] = useState(userToken?.name || '');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState(userToken?.phone || '');
    const [email, setEmail] = useState(userToken?.email || '');
    
  
    console.log("TTTTTTTTTTT", userToken);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             

                {/* User Information Card */}
                <div className="border p-4 rounded shadow bg-white">
                    <h2 className="text-xl font-semibold mb-2">User Information</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                value={userToken?.name || ''}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />

                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Téléphone
                            </label>
                            <input
                                type="text"
                                id="phone"
                             //   value={phone}
                                value={(userToken?.phone || '')}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="userEmail"
                                value={(userToken?.email || '')}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
{/* ::::::::::::::: */}
                        {/* <div className="mb-4">
                            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                id="shippingAddress"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                      
                        <div className="mb-4">
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Code postal
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div> */}
                       
                       
                  
                    </form>
                </div>

            </div>
        </div>
    );
}

