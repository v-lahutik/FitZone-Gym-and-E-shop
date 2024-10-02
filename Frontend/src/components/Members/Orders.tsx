import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { IoIosArrowDown } from 'react-icons/io';

export type Orders = {
  orderNumber: string;
  orderDate: string;
  totalPrice: number;
  paymentStatus: string;
  deliveryAddress: string;
  deliveryDate: string;
  status: string;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

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

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Status
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Order number
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Payment Status
              </th>
              <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                Delivery Address
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Estimated Delivery Date
              </th>

              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Order Info
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr key={key}>
                <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-sm">{order.status}</p>
                </td>
                <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {order.orderNumber
                      ? order.orderNumber.substring(0, 12)
                      : 'N/A'}
                  </h5>
                  <p className="text-sm">{order.orderDate}</p>
                </td>
                <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                <td className="max-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {`${order.deliveryAddress.streetNumber} ${order.deliveryAddress.streetName}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postCode}, ${order.deliveryAddress.country}`}
                  </p>
                </td>
                <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(order.deliveryDate).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </td>

                <td className="min-w-[50px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <IoIosArrowDown />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
