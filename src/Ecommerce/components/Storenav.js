/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { styled, alpha } from '@mui/material/styles';
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon , UserIcon } from '@heroicons/react/24/outline'

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';



import CartMenu from "./cart/Cart"
import { Typography } from '@mui/material';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'All Categories',
      featured: [
        {
          name: 'New Arrivals',
          
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Category :',
          items: [
            { name: 'Mode et accessoires' },
            { name: 'Vêtements'},
            { name: 'Électronique' },
            { name: 'Maison et jardin'},
            { name: 'Santé et beauté' },
            { name: 'Sports et loisirs' },
            { name: 'Alimentation et boissons' },
            { name: 'Automobiles et véhicules' },
            { name: 'Browse All' },
          ],
        },
        {
          id: 'accessories',
          name: '',
          items: [
            { name: 'Bébés et enfants'},
            { name: 'Outils et matériel' },
            { name: 'Loisirs créatifs et hobbies' },
            { name: 'Voyage et bagages' },
            { name: 'Équipement professionnel et industriel' },
            { name: 'Cadeaux et articles de luxe' },
          ],
        },
        {
          id: 'brands',
          name: '',
          items: [
            { name: 'Animaux de compagnie' },
            { name: 'Livres et médias'},
            { name: 'Services'},

          ],
        },
      ],
    },
    // {
    //   id: 'men',
    //   name: 'Men',
    //   featured: [
    //     {
    //       name: 'New Arrivals',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
    //       imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
    //     },
    //     {
    //       name: 'Artwork Tees',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
    //       imageAlt:
    //         'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
    //     },
    //   ],
    //   sections: [
    //     {
    //       id: 'clothing',
    //       name: 'Clothing',
    //       items: [
    //         { name: 'Tops', href: '#' },
    //         { name: 'Pants', href: '#' },
    //         { name: 'Sweaters', href: '#' },
    //         { name: 'T-Shirts', href: '#' },
    //         { name: 'Jackets', href: '#' },
    //         { name: 'Activewear', href: '#' },
    //         { name: 'Browse All', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'accessories',
    //       name: 'Accessories',
    //       items: [
    //         { name: 'Watches', href: '#' },
    //         { name: 'Wallets', href: '#' },
    //         { name: 'Bags', href: '#' },
    //         { name: 'Sunglasses', href: '#' },
    //         { name: 'Hats', href: '#' },
    //         { name: 'Belts', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'brands',
    //       name: 'Brands',
    //       items: [
    //         { name: 'Re-Arranged', href: '#' },
    //         { name: 'Counterfeit', href: '#' },
    //         { name: 'Full Nelson', href: '#' },
    //         { name: 'My Way', href: '#' },
    //       ],
    //     },
    //   ],
    // },
  ],
  pages: [
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
  
}



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  //borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.info.light, 0.05),
  },
  marginLeft: 0,
  marginRight: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  borderRadius: "22px",
  borderStyle: 'groove',
  borderWidth: '1px', // Optional: to make the border visible
  borderColor: 'gray', // Optional: to specify the border color
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function StoreNav({ cartItems, setCartItems , userToken, onSearch }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false) // State to manage cart visibility
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Add this state within the StoreNav component

  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    // Load cart items from localStorage when component mounts
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [setCartItems]);

  // useEffect(() => {
  //   // Save cart items to localStorage whenever they change
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [cartItems]);

  console.log('---- CARTITEMS FROM STORENAV----', cartItems);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartItemCount = cartItems.length;
  console.log("userToken from STORENAV", userToken);

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login or home page
    navigate("/");
  };

  const token = localStorage.getItem("token") ;
  console.log("token from STORENAV", token);


  //search product 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Redirect to search page with the searchQuery
    navigate(`/products`);
    onSearch(searchQuery);
  };

  const handleSelect = (item, event) => {
    // Redirect to search page with the searchQuery
    console.log("!!!!!!!!!! CATEGORY MENU !!!!!", item);
    navigate(`/products`);
    window.location.reload();
  //  onSearch(searchQuery);
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                         
                           {category.name} 
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    {/* <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a> */}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-20">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>
{/* 
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
        <nav aria-label="Top" className="mx-auto max-w-1xl px-4 sm:px-4 lg:px-4">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  /> */}

                  <Typography sx={{ fontWeight: 'bold ' }} >E-shop</Typography>
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8 ">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                           {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                {/*  {item.name} */}
                                                <button onClick={ (event) => handleSelect(item.name, event) }>{item.name}</button>
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* ------------------------ */}


          <div className="ml-20 flex items-center">
                
          <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </Search> 

          </div>


             {/* ------------------------------- */}
       
            {/* AET  SPAN*/}
              <div className="ml-auto flex items-center">
               
               {userToken ? userToken.name : ''}
                
                {/* <div className="hidden lg:ml-8 lg:flex">
                   <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a> 
                </div> */}

                {/* Search */}

                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                 </div> */}
                 


                 


                {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {/*                   
                  <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                   
                    <UserIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                  </a>
                */}

                  <div className="ml-4 relative">
  <button
    type="button"
    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-gray-400"
    id="user-menu-button"
    aria-expanded="false"
    aria-haspopup="true"
    onClick={() => setUserMenuOpen(!userMenuOpen)} // Toggle user menu visibility
  >
    <UserIcon className="h-6 w-6" aria-hidden="true" />
  </button>

  {/* User Menu Dropdown */}
  { userMenuOpen && (
    <div
      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      { token ?
      <>
      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
      <a href="" onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Sign out</a>
      
      </>
      : 
      <a href="/login" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Login</a>
      }
      { userToken.role == 'Admin' ?
        <a href="/admin" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Admin</a>
      : ''
      }
    </div>
  )}
</div>

                  
              
                </div>


                 {/* Cart */}
                 <div className="ml-4 flow-root lg:ml-6">
  <button onClick={toggleCart} className="group -m-2 flex items-center p-2 relative"> {/* Add relative class */}
    <ShoppingBagIcon
      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
      aria-hidden="true"
    />
    {cartItemCount > 0 && ( // Add this block
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
        {cartItemCount}
      </span>
    )}
    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
      {/* {cartItemCount} */}
    </span>
    <span className="sr-only">items in cart, view bag</span>
  </button>
</div>







              </div>
            </div>
          </div>
        </nav>
      </header>

      
      {isCartOpen && <CartMenu cartItems={cartItems} setCartItems={setCartItems} setIsCartOpen={setIsCartOpen} userToken={userToken}/>}
    </div>
  )
}
