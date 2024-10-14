import React, { useEffect, useState } from 'react';
import { URL } from '../../../utils/URL';
import axios from 'axios';
import { Product } from '../../Shop/Products';
import ProductForm from './ProductFrom';

export const AdminProductsDisplay: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productChanged, setProductChanged] = useState<boolean>(false);

  const openForm = (product: Product | null) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
    setIsEditing(product === null); // Edit mode if new course
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentProduct(null);
    setIsEditing(false);
    setProductChanged(true);
  };

  const fetchAllProducts = async () => {
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
        console.error('Error fetching products data', error.response?.data);
      } else {
        console.error('Unexpected error', error);
      }
    } finally {
      setProductChanged(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productChanged]);

  return (
    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center  gap-1 mt-10 mb-5">
      {/* Product cards */}
      {allProducts?.map((product) => (
        <div
          key={product.productName}
          className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl items-center justify-center">
            <img
              className="object-cover"
              src={product.image}
              alt={product.productName}
            />
            <span
              className={`absolute top-0 left-0 m-2 rounded-full px-2 text-center text-sm font-medium text-white ${
                product.stock > 0 ? 'bg-black' : 'bg-primary'
              }`}
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl tracking-tight text-slate-900">
              {product.productName}
            </h5>
            <p className="text-gray-600 line-clamp-2 hover:line-clamp-4 h-12">
              {product.description}
            </p>

            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-xl font-bold text-slate-900">
                  €{product.price}
                </span>
                {/* Optional: Add a line-through for original price if available for sale*/}
                {/* <span className="text-sm text-slate-900 line-through">${originalPrice}</span> */}
              </p>
              <div className="flex items-center">
                {/* Stars for rating */}
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="mr-2 ml-3 rounded bg-primary px-2.5 py-0.5 text-white text-xs font-semibold">
                  5.0
                </span>
              </div>
            </div>
            <div className='flex gap-1'>
              <button
                onClick={() => openForm(product)}
                className="w-1/2 flex items-center justify-center rounded-md bg-blackColor3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Edit
              </button>
              <button
                onClick={() => openForm(null)}
                className="w-1/2 flex items-center justify-center rounded-md bg-blackColor3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                {/* <ProductForm product={product} closeForm={function (): void {
                  throw new Error("Function not implemented.");
                } } isEditing={false} /> */}
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {isFormOpen && <ProductForm product={currentProduct} closeForm={closeForm} isEditing={isEditing} />}
    </section>
  );
};

export default AdminProductsDisplay;
