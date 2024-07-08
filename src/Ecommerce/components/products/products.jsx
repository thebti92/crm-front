import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Label from "../../../Backoffice/components/label";
import CarouselPromo from '../CarouselPromo'; // Adjust the import path as necessary

const BASE_URL = process.env.REACT_APP_BASE_URL;
const currency = process.env.REACT_APP_CURRENCY;
const PRODUCTS_PER_PAGE = 8; // Adjust the number of products per page as necessary

export default function ProductComponent({ category, promo, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then((response) => {
        let Display = [];
        response.data.forEach((row) => row.publish === true ? Display.push(row) : '');

        setProducts(Display);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category.label === category);
  }
  if (promo) {
    filteredProducts = filteredProducts.filter(product => product.promo);
  }
  if (searchTerm != null) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div align='center'>
        <h1>No products found in the selected category.</h1>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const productItems = currentProducts.map((product) => (
    <div key={product._id} className="group">
      <Link key={product._id} to={`/product/${product._id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.img}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 text-sm text-gray-700" style={{ display: 'flex', justifyContent: 'center' }}>
          <h3>{product.name}</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="font-semibold">
            <p>{product.pricetax}{currency}</p>
          </div>
          <div className='bg-green-200'>
            {product.promo ? '-' + product.promo + '%' : ''}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="mt-2">
          <Label color={(product.stock > 0 && 'success') || 'error'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Label>
        </div>
      </Link>
    </div>
  ));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white z-9">
      <h2 className="sr-only">Products</h2>
      {promo ? (
        <div className="max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <CarouselPromo>
            {productItems}
          </CarouselPromo>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productItems}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
