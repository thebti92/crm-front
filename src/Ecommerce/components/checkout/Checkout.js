import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Checkout({ cartItems, userToken , setCartItems}) {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const subtotal = cartItems.reduce((total, product) => total + (product.pricetax * product.quantity), 0);

    const [name, setName] = useState(userToken?.name || '');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    // const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState(userToken?.phone || '');
    const [email, setEmail] = useState(userToken?.email || '');
    const [paymentMethod, setPaymentMethod] = useState('Paiement à la livraison');
    const [termsAccepted, setTermsAccepted] = useState(false);
    

    function generateOrderReference(prefix = 'ORD') {
        const timestamp = Date.now(); // Get the current timestamp
        return `${prefix}-${timestamp}`;
    }
   // const orderReference = generateOrderReference();
   // console.log(orderReference);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            alert('Please accept the terms and conditions.');
            return;
        }
        try {

            const orderData = {
                reford: generateOrderReference(),
                customer_id: name,
                status: 'pending',
                total_amount: subtotal,
                shipping_address: shippingAddress +", " + city + ", " + postalCode,
             //   city,
             //   region,
            //    postalCode,
               phone,
               email,
               paymentMethod,
               products: cartItems,
                
            };

             // Add new user
             const response = await axios.post(`${BASE_URL}/api/orders/addOrder`,  orderData);
             if (response.status === 201) {
                console.log('Order placed successfully!'); 
                toast.success('Order placed successfully!');
               
                // Update product stock
                await updateProductStock(cartItems);

                setCartItems([]);
                localStorage.removeItem('cartItems');
                navigate('/');
              //   closeEvent();
              //   reload();
             } else {
                 console.error('Failed to add user');
                 toast.error('Failed to add user');
             }


        } catch (error) {
            // console.error('Error placing order:', error.message);
            // toast.error(error.message);

            console.log('error', error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    const updateProductStock = async (cartItems) => {
        try {
            const updateStockPromises = cartItems.map(item =>
                axios.post(`${BASE_URL}/api/products/updateStock`, {
                    productId: item.idProduct,
                    quantity: item.quantity,
                })
            );
            await Promise.all(updateStockPromises);
            console.log('Stock updated successfully!');
        } catch (error) {
            console.error('Error updating stock:', error.message);
            toast.error('Error updating stock');
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Order Information Card */}
                <div className="border p-4 rounded shadow bg-white">
                    <h2 className="text-xl font-semibold mb-2">Order Information</h2>
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex py-4">
                                <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200"
                                />
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">${item.total}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                </div>

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
                                value={name}
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
                                value={phone}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
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
                        {/* <div className="mb-4">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                Région / Département
                            </label>
                            <input
                                type="text"
                                id="region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                        </div> */}
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
                        </div>
                       
                       
                  
                    </form>
                </div>

                {/* Payment Method Card */}
                <div className="border p-4 rounded shadow bg-white col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                    <form onSubmit={handleOrderSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Choose Payment Method:</label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input
                                        id="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        value="Paiement à la livraison"
                                        checked={paymentMethod === 'Paiement à la livraison'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                                        Paiement à la livraison
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="card"
                                        name="paymentMethod"
                                        type="radio"
                                        value="Carte Bancaire"
                                        checked={paymentMethod === 'Carte Bancaire'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                                        Carte Bancaire
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <label htmlFor="terms" className="ml-3 block text-sm font-medium text-gray-700">
                                    J’ai lu et j’accepte les conditions générales *
                                </label>
                            </div>
                        </div>
                        
                    {userToken.name ? 

                        <button
                            type="submit"
                            className="w-full flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Place Order
                        </button>
                    :
                    <div class="text-center">
                            <button  onClick={ () => navigate('/login')} class="w-full flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Connexion</button>
                    </div>

                    }

                    </form>
                </div>
            </div>
        </div>
    );
}

