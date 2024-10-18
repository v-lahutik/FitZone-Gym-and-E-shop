import React, { useContext, useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext.tsx'; // Assuming the useCart hook is available for cart state
import { UserContext } from '../../context/UserContext.tsx';
import axios from 'axios';
import { URL } from '../../utils/URL.ts';
import Login from '../Auth/Login.tsx';
import { User } from '../../custom.Types/userTypes.ts';
import Swal from 'sweetalert2';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  streetNumber: string;
  streetName: string;
  city: string;
  postCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user, isLoggedIn } = useContext(UserContext);
  const [shopUser, setShopUser] = useState<User>(user);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    streetNumber: '',
    streetName: '',
    city: '',
    postCode: '',
    country: '',

    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  //for login modal
  useEffect(() => {
    if (loginOpen) {
      //disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      //enable scroll
      document.body.style.overflow = 'unset';
    }
    // cleanup function for when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginOpen]);

  // Autofill form fields if user is logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        streetNumber: user.address?.streetNumber.toString() || '',
        streetName: user.address?.streetName || '',
        city: user.address?.city || '',
        postCode: user.address?.postCode || '',
        country: user.address?.country || '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      });
      setShopUser(user);
    }
  }, [isLoggedIn, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShopUser({ ...shopUser, [e.target.name]: e.target.value });
  };

  // Calculate the subtotal from the cart items
  const subTotal = cart.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert streetNumber to a number before sending
    const orderData = {
      deliveryAddress: {
        streetNumber: formData.streetNumber,
        streetName: formData.streetName,
        city: formData.city,
        postCode: formData.postCode,
        country: formData.country
      },
      cart: cart.map((product) => ({
        productId: product.productId,
        quantity: product.quantity
      })),
      user: { shopUser }
    };

    try {
      const response = await axios.post(`${URL}/users/orders`, orderData);
      console.log('Order created successfully:', response.data);

      // Reset the form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        streetNumber: '',
        streetName: '',
        city: '',
        postCode: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      });

      //clear cart function from cart context
      clearCart();

      Swal.fire({
        icon: 'success',
        title: 'Order placed successfully',
        text: 'Thank you for shopping with us!',
        confirmButtonColor: '#333',
        confirmButtonText: 'OK'

      })

    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonColor: '#333',
        confirmButtonText: 'OK'
      })
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Checkout
        </h2>

        {/* Cart Summary */}
        <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
        <ul className="mb-6 divide-y divide-gray-200 ">
          {cart.map((product) => (
            <li key={product.productId} className="flex py-4">
              <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                <img
                  alt={product.productName}
                  src={product.image}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium text-gray-900">
                  {product.productName}
                </h4>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-900">
                  €{(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-lg font-medium text-gray-900 mb-8 ">
          <p>Total</p>
          <p>€ {subTotal.toFixed(2)}</p>
        </div>
        {/* Divider line between the total and the next section */}
        <hr className="mb-8 border-gray-300" />

        {/* Member Login Link only if member is not logged in yet*/}
        {!isLoggedIn ? (
          <div className="mb-6 text-gray-500">
            Are you a member?{' '}
            <button
              onClick={() => {
                setLoginOpen(true);
                console.log('loginOpen', loginOpen);
              }}
              className="text-primary hover:underline"
            >
              Login here
            </button>
            {loginOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <Login setLoginOpen={setLoginOpen} />
              </div>
            )}
          </div>
        ) : (
          ''
        )}

        {/* Checkout Form */}
        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="John"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          {/* Shipping Info */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Street Number
            </label>
            <input
              type="number"
              name="streetNumber"
              value={formData.streetNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
              placeholder="123"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Street Name
            </label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
              placeholder="Main street"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="Berlin"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Post Code
              </label>
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="10115"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
              placeholder="Germany"
              required
            />
          </div>

          {/* Payment Info */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Payment Details
          </h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
              placeholder="1234 1234 1234 1234"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blackColor3"
                placeholder="CVC"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-blackColor3 transition duration-200"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
