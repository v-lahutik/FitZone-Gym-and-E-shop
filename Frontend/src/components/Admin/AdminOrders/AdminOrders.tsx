import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../../utils/URL.ts';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Orders} from '../../../custom.Types/orderTypes.ts';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null); // To track the expanded order
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>(''); // For status filter
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>(''); // For payment status filter

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${URL}/admin/orders`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.status === 200) {
          setOrders(response.data);
          setFilteredOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term (order number or product name)
    if (searchTerm) {
      filtered = filtered.filter((order) => {
        const matchesOrderNumber = order.orderNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCustomerId = order.userId._id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesProductName = order.products.some((product) =>
          product.productId.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        return matchesOrderNumber || matchesProductName || matchesCustomerId;
      });
    }

    // Filter by order status
    if (filterStatus) {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Filter by payment status
    if (filterPaymentStatus) {
      filtered = filtered.filter(
        (order) => order.paymentStatus === filterPaymentStatus
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, filterPaymentStatus, orders]);

  const toggleOrderExpansion = (orderNumber: string) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(event.target.value);
  };

  const handlePaymentStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterPaymentStatus(event.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-bodydark1">
        Customers’ Orders
      </h2>

      <div className=" max-w-full overflow-x-auto">
        {/* Search input */}
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Status Filter */}

          <select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          >
            <option value="">Filter by status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={filterPaymentStatus}
            onChange={handlePaymentStatusFilterChange}
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          >
            <option value="">Filter by payment status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Table */}
        {filteredOrders.length === 0 ? (
          <p className="text-center py-4">No orders found</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-primary text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase xl:pl-11">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase">
                  Order number
                </th>
                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase">
                  Customer
                </th>
                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase">
                  Customer id
                </th>

                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase">
                  Total amount
                </th>
                <th className="min-w-[150px] py-4 px-4 text-xs font-bold text-whiteColor uppercase">
                  Payment Status
                </th>
                <th className="min-w-[80px] py-4 px-4 text-xs font-bold text-whiteColor uppercase xl:pl-11">
                  Products Info
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(
                (order, key) => (
                  console.log(' orders', orders),
                  (
                    <React.Fragment key={key}>
                      <tr
                        className={`${
                          expandedOrder === order.orderNumber
                            ? 'bg-gray-200 dark:bg-gray-700' // Highlighted background when expanded
                            : ''
                        }`}
                      >
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
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                          <p className="text-sm">
                            {order.userId.firstName} {order.userId.lastName}
                          </p>
                        </td>
                        <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                          <p className="text-sm">{order.userId._id}</p>
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
                                      Delivery Address
                                    </th>
                                    <th className="min-w-[150px] py-3 px-4 text-sm font-medium text-black dark:text-white">
                                      Estimated Delivery Date
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

export default AdminOrders;