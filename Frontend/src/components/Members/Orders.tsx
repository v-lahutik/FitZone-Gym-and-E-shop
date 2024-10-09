import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';


export type ProductId = {
  quantity: number;
  productId: any;
  image: string;
  productName: string;
  description: string;
  price: number;
  category: {
    categoryName: string;
  }
};
export type Product = {
  quantity: number;
  productId: ProductId; 
};

export type Orders = {
  orderNumber: string;
  orderDate: string;
  totalPrice: number;
  paymentStatus: string;
  deliveryAddress: string;
  deliveryDate: string;
  status: string;
  products: Product[]; 
};

export type Category = {
  _id: string;        
  categoryName: string; 
};
export type Order = {
  orderNumber: string;
  category: Category;
  orderDate: string;
  totalPrice: number;
  paymentStatus: string;
  deliveryAddress: DeliveryAddress; 
  deliveryDate: string;
  status: string;
  products: Product[]; // Products array remains unchanged
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null); // To track the expanded order
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${URL}/users/orders`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Toggle order row expansion
  const toggleOrderExpansion = (orderNumber: string) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  //filter orders based order number or product name
  const filteredOrders = orders.filter((order) => {
    const matchesOrderNumber = order.orderNumber
      .toLowerCase()
      .includes(searchTerm);
    const matchesProductName = order.products.some((product) =>
      product.productId.productName.toLowerCase().includes(searchTerm)
    );

    return matchesOrderNumber || matchesProductName; // Return true if either matches
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className=" max-w-full overflow-x-auto">
        {/* Search input */}
        <div className="relative mb-6 ">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-black">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search by order number or product name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
          />
        </div>
        {filteredOrders.length === 0 ? (
          <p className="text-center py-4">No orders found</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-11">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Order number
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Delivery Address
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Estimated Delivery Date
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Total amount
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Payment Status
                </th>
                <th className="min-w-[80px] py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-11">
                  Products Info
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(
                (order, key) => (
                  
                  (
                    <React.Fragment key={key}>
                      <tr>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                          <p className="text-sm">{order.status}</p>
                        </td>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                          <h5 className="font-bold text-sm text-black dark:text-white">
                            {order.orderNumber
                              ? order.orderNumber.substring(0, 12)
                              : 'N/A'}
                          </h5>
                          <p className="text-sm">
                            {formatDate(order.createdAt)}
                          </p>
                        </td>

                        <td className="max-w-[150px] border-b border-[#eee] py-5  dark:border-strokedark">
                          <p className="py-3 px-4 text-sm text-black dark:text-white">
                            {`${order.deliveryAddress.streetNumber} ${order.deliveryAddress.streetName}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postCode}, ${order.deliveryAddress.country}`}
                          </p>
                        </td>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 dark:border-strokedark">
                          <p className="py-3 px-4 text-sm text-black dark:text-white">
                            {formatDate(order.deliveryDate)}
                          </p>
                        </td>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 text-sm dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            € {order.totalPrice}
                          </p>
                        </td>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              order.paymentStatus === 'Paid'
                                ? 'bg-green-500 text-green-500'
                                : order.paymentStatus === 'Unpaid'
                                ? 'bg-red-500 text-red-500'
                                : 'bg-orange-600 text-warning'
                            }`}
                          >
                            {order.paymentStatus}
                          </p>
                        </td>
                        <td className="min-w-[50px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center justify-center space-x-3.5">
                            <button
                              className="hover:text-primary"
                              onClick={() =>
                                toggleOrderExpansion(order.orderNumber)
                              }
                            >
                              {expandedOrder === order.orderNumber ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* expand and render product info on click */}
                      {expandedOrder === order.orderNumber && (
                        <tr>
                          <td colSpan={7}>
                            <div className="bg-gray-100 border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out">
                              <table className="w-full table-auto ">
                                <thead>
                                  <tr className="bg-gray-200 text-left dark:bg-gray-600">
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white xl:pl-11">
                                      Image
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Product Name
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Category
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Description
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Product Price
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Quantity
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Total Product Price
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.products.map((product, idx) => (
                                    <tr
                                      key={idx}
                                      className="bg-gray-50 dark:bg-gray-800"
                                    >
                                      <td className="py-3 px-4 xl:pl-8">
                                        <img
                                          src={product.productId?.image}
                                          alt={product.productId?.productName}
                                          className="w-16 h-16 object-cover rounded-md"
                                        />
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        {product.productId?.productName ||
                                          'N/A'}
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        {product.productId?.category
                                          ?.categoryName || 'N/A'}
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        {product.productId?.description ||
                                          'N/A'}
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        €{' '}
                                        {(
                                          product.productId?.price || 0
                                        ).toFixed(2)}
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        {product.quantity}
                                      </td>
                                      <td className="py-3 px-4 text-sm text-black dark:text-white">
                                        €{' '}
                                        {(
                                          product.productId?.price *
                                          product.quantity
                                        ).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
