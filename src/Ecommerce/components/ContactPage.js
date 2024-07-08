import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';




export default function ContactPage({ userToken}) {
    console.log("userToken from COOOOOOOOOOOOO", userToken);

    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    function generateOrderReference(prefix = 'TK') {
        const timestamp = Date.now(); // Get the current timestamp
        return `${prefix}-${timestamp}`;
    }

   
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        
        // if (!termsAccepted) {
        //     alert('Please accept the terms and conditions.');
        //     return;
        // }

        try {

            const ticketData = {
                ref: generateOrderReference(),

              name: userToken.name,
              email: userToken.email,
              phone: userToken.phone,

                status: 'New',
                subject: subject,
                description: description,
                
            };

             // Add new ticket
          //   const response = await axios.post(`${BASE_URL}/api/contacts/addContact`,  ticketData);
               const response = await axios.post(`${BASE_URL}/api/contacts/addContact`,  ticketData);
             
             if (response.status === 201) {
                console.log('Ticket placed successfully!'); 
                toast.success('Ticket placed successfully!');
            //    setCartItems([]);
                localStorage.removeItem('cartItems');
                navigate('/');
              //   closeEvent();
              //   reload();
             } else {
                 console.error('Failed to add Ticket');
                 toast.error('Failed to add Ticket');
             }


        } catch (error) {
            // console.error('Error placing order:', error.message);
            // toast.error(error.message);

            console.log('error', error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

return (
<section class="bg-white-50 dark:bg-slate-800" id="contact">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="mb-4">
            <div class="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <p class="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Contact
                </p>
                <h2
                    class="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                    Get in Touch
                </h2>
                <p class="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac habitasse platea
                    dictumst
                </p>
            </div>
        </div>
        <div class="flex items-stretch justify-center">
            <div class="grid md:grid-cols-2">
                <div class="h-full pr-6">
                    <p class="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                        Class aptent taciti sociosqu ad
                        litora torquent per conubia nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut scelerisque
                        sagittis ante, ac tincidunt sem venenatis ut.
                    </p>
                    <ul class="mb-6 md:mb-0">
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path
                                        d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                    </path>
                                </svg>
                            </div>
                            <div class="ml-4 mb-4">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
                                </h3>
                                <p class="text-gray-600 dark:text-slate-400">1230 Maecenas Street Donec Road</p>
                                <p class="text-gray-600 dark:text-slate-400">New York, EEUU</p>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path
                                        d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                    </path>
                                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                                </svg>
                            </div>
                            <div class="ml-4 mb-4">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
                                </h3>
                                <p class="text-gray-600 dark:text-slate-400">Mobile: +1 (123) 456-7890</p>
                                <p class="text-gray-600 dark:text-slate-400">Mail: tailnext@gmail.com</p>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="h-6 w-6">
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                    <path d="M12 7v5l3 3"></path>
                                </svg>
                            </div>
                            <div class="ml-4 mb-4">
                                <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working
                                    hours</h3>
                                <p class="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                <p class="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: 08:00 - 12:00</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card h-fit max-w-6xl p-5 md:p-12" id="form">
                    <h2 class="mb-4 text-2xl font-bold dark:text-white">Ready to Get Started?</h2>
                    <form id="contactForm">
                        <div class="mb-6">
                            <div class="mx-0 mb-1 sm:mb-4">
                                <div class="mx-0 mb-1 sm:mb-4">
                                    <label for="subject" class="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="subject" autocomplete="given-name" placeholder="subject" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="subject"  value={subject} onChange={(e) => setSubject(e.target.value)}/>
                                </div>
                                {/* <div class="mx-0 mb-1 sm:mb-4">
                                    <label for="email" class="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autocomplete="email" placeholder="Your email address" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email"/>
                                </div> */}
                            </div>
                            <div class="mx-0 mb-1 sm:mb-4">
                                <label for="description" class="pb-1 text-xs uppercase tracking-wider"></label><textarea id="description" name="description" cols="30" rows="5" placeholder="Write your message..." class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>

                    {userToken.name ? 
                        <div class="text-center">
                            <button type="submit"  onClick={handleOrderSubmit} class="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                        </div>
                    :
                   
                    <div class="text-center">
                            <button  onClick={ () => navigate('/login')} class="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0">Connexion</button>
                    </div>
                
                }

                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

)

}