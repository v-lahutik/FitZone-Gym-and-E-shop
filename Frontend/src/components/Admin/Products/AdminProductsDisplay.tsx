import React, { useEffect, useState } from 'react';
import { URL } from '../../../utils/URL';
import axios from 'axios';
import { Product } from '../../Shop/Products';
import ProductForm from './ProductFrom';
import { handleDeleteProduct } from './ProductRequests';

export const AdminProductsDisplay: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productChanged, setProductChanged] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>(''); // For category filter
  const [filterByPrice, setFilterByPrice] = useState<string>(''); // For price filter
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1); // for pagination
  const [itemsPerPage, setItemPerPage] = useState<number>(8);

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
        url: `${URL}/products`,
        method: 'GET',
        withCredentials: true
      });
      const data = response.data;
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

  useEffect(() => {
    let filtered = allProducts;

    // Filter by search term (product name)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by product status
    if (filterCategory) {
      filtered = filtered.filter(
        (product) => product.category.categoryName === filterCategory
      );
    }

    // Filter by price (ascending)
    if (filterByPrice === 'Ascending') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    // Filter by price (descending)
    if (filterByPrice === 'Descending') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setItemPerPage(8)
  }, [searchTerm, filterCategory, filterByPrice, allProducts]);

  // handle filter
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterCategory(event.target.value);
  };
  const handleByPriceFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterByPrice(event.target.value);
  };

  //calculate the number of pages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  //pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-bodydark1">
        Our Products
      </h2>
      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={handleCategoryFilterChange}
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
        >
          <option value="">Filter by Category</option>
          <option value="Equipment">Equipment</option>
          <option value="Accessories">Accessories</option>
          <option value="Supplements/Food">Supplements/Food</option>
        </select>

        {/* Price Filter */}
        <select
          value={filterByPrice}
          onChange={handleByPriceFilterChange}
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
        >
          <option value="">Filter by Price</option>
          <option value="Ascending">Low Price</option>
          <option value="Descending">High Price</option>
        </select>
        <button
          onClick={() => openForm(null)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>
      <section className="w-fit mx-auto flex flex-wrap md:grid-cols-2 justify-items-center justify-around gap-3 mt-1 mb-5">
        {/* Product cards */}
        {displayedItems?.map((product) => (
          <div
            key={product._id}
            className="my-3 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <div className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl items-center justify-center">
              <img
                className="object-cover"
                src={product.image}
                alt={product.productName}
              />
            </div>
            <div className="mt-4 px-5 pb-5">
              <div className="flex justify-end">
                <span
                  className={`rounded-full px-2 py-1 text-center text-sm font-medium text-white ${
                    product.stock > 0 ? 'bg-black' : 'bg-primary'
                  }`}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
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
              <div className="flex gap-1">
                <button
                  onClick={() => openForm(product)}
                  className="w-1/2 flex items-center justify-center rounded-md bg-blackColor3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteProduct(product, setProductChanged)
                  }
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

        {isFormOpen && (
          <ProductForm
            product={currentProduct}
            closeForm={closeForm}
            isEditing={isEditing}
          />
        )}
      </section>
      {/* Pagination */}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border border-blackColor3 rounded text-blackColor3 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:text-white hover:bg-blackColor3 transition transform duration-300 ease-in-out'
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-blackColor3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 border border-blackColor3 rounded text-blackColor3  ${
            currentPage === totalPages || totalPages === 0
              ? 'cursor-not-allowed opacity-50'
              : 'hover:text-white hover:bg-blackColor3 transition transform duration-300 ease-in-out'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProductsDisplay;
