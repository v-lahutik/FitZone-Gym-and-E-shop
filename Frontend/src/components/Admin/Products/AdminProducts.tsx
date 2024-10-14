import React, { useEffect, useState } from "react";
import { URL } from "../../../utils/URL";
import axios from "axios";

export interface Category {
  _id:string;
  categoryName:string;
}

export interface Products {
  productName: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  maxParticipants: number;
  category: {
    categoryName:string
  };
  _id: string;
}

export const AdminProducts:React.FC = ()=> {
  const [allProducts, setAllProducts] = useState<Products[]>([])

  const fetchAllProducts = async() => {
    try {
      const response = await axios({
        url: `${URL}/admin/products`,
        method: 'GET',
        withCredentials: true
      });
      const data = response.data.allProducts;
      setAllProducts(data);
      console.log('product date', data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error fetching products data',
          error.response?.data
        );
      } else {
        console.error('Unexpected error', error);
      }
    }
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])
  return (
    <div className="p-4">
      <div className=" max-w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-bodydark1">Your Booked Courses</h2>
        {allProducts.length === 0 ? (
          <p className="text-center py-4">No Booked Course</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-primary text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white">
                  Image
                </th>
                <th className="min-w-[120px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white xl:pl-11">
                  Product Name
                </th>
                <th className="min-w-[120px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white">
                  Stock
                </th>
                <th className="min-w-[50px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white">
                  category
                </th>
                <th className="min-w-[50px] py-4 px-4 text-xs font-bold text-whiteColor uppercase dark:text-white"></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product, key) => (
                <React.Fragment key={key}>
                  <tr className='bg-gray-200 dark:bg-gray-700'>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-sm  text-black dark:text-white">
                        {product.productName}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        € {product.price}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {product.stock}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {product.category.categoryName}
                      </p>
                    </td>
                    <td className="min-w-[50px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          Edit
                        </button>
                        <button className="hover:text-primary">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminProducts