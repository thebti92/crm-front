import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';

//import Label from "../components/label"
import Label from "../../../Backoffice/components/label"
import toast from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const currency = process.env.REACT_APP_CURRENCY;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductOverview({ cartItems, setCartItems }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity
 // const [cartItems, setCartItems] = useState([]); // State to manage cart items
  console.log("CART ITEMS",cartItems );

  useEffect(() => {
    // Fetch product details from the API
    axios.get(`${BASE_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedColor(response.data.colors[0]?.title);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const addToCart = () => {

  if (product.stock > 0) {
    if (quantity <= product.stock){
    
    console.log("AddToCart ...");
    const newItem = {
      id: `${product._id}-${Date.now()}`, // Combine product ID with timestamp
      idProduct : product._id,
      name: product.name,
      imageSrc: product.img,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      pricetax: product.pricetax,
      total: product.pricetax * quantity
    };
    setCartItems([...cartItems, newItem]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
  } else {
    toast.error("The quantity you have requested exceeds our current stock");
  }

  } else {
    toast.error("This product is out of stock");
  }
    

  };

  const reviews = { href: '#', average: 4, totalCount: 117 }; // Sample reviews data

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Parse the input value to an integer
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li key={product.category.label}>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  {product.category.label}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        {/* <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"> */}
        <div className="mx-auto max-w-xl sm:px-6 lg:grid lg:max-w-xl lg:px-8">
         
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-3 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg ">
            <img
              src={product.img}
              alt={product.name}
              className="object-cover object-center"
            />
          </div>
        </div>



        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.pricetax}{currency}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <br />

            {/* <form className="mt-10"> */}
              {/* Colors */}
              <div>
                {product.colors.length > 0 ? <h3 className="text-sm font-medium text-gray-900">Color</h3> : ''}

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.title}
                        value={color.title}
                        className={({ active, checked }) =>
                          classNames(
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.title}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"

                          className={classNames(
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                            color.title === 'Gray' && 'bg-gray-700',
                            color.title === 'Black' && 'bg-black',
                            color.title === 'Blue' && 'bg-blue-700',
                            color.title === 'Red' && 'bg-red-700',
                            color.title === 'Green' && 'bg-green-800',
                            color.title === 'Yellow' && 'bg-yellow-200',
                            color.title === 'Violet' && 'bg-violet-200',
                            color.title === 'Cyan' && 'bg-cyan-500'

                          )}


                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
      {/* SIZE !! */}
<div className="mt-10">

              {/* <h3 className="text-sm font-medium text-gray-900">Size</h3> */}
              {product.size.length > 0 ? <h3 className="text-sm font-medium text-gray-900">Size</h3> : ''}
              

       <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
    {product.size.map((size) => (
      <RadioGroup.Option
        key={size.title}
        value={size.title}
        className={({ active, checked }) =>
          classNames(
            active ? 'ring-2 ring-indigo-500' : '',
            checked
              ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
            'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer'
          )
        }
      >
        <RadioGroup.Label as="span">{size.title}</RadioGroup.Label>
      </RadioGroup.Option>
    ))}
  </div>
</RadioGroup>
</div>


           <div className="mt-10">
           <Label  color={(product.stock > 0 && 'success') || 'error'}>{product.stock > 0  ? 'In Stock' : 'Out of Stock'}</Label>

           </div>
            

<div className="mt-2">
  <label htmlFor="quantity" className="text-sm font-medium text-gray-900">Quantity</label>  
   <br />
  <div className="flex ml-2">
    <button
      type="button"
      onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} // Decrease quantity by 1, but not below 1
      className="px-2 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      -
    </button>
    <input
      id="quantity"
      type="number"
      min="1"
      value={quantity}
      onChange={handleQuantityChange}
      className="w-16 px-3 py-2 border border-gray-300 text-center rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <button
      type="button"
      onClick={() => setQuantity(quantity + 1)} // Increase quantity by 1
      className="px-2 py-1 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      +
    </button>
  </div>
</div>


              

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={addToCart}
              >
                Add to cart
              </button>


            {/* </form> */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>


          </div>
          
        </div>
      </div>
    </div>
  );
}
