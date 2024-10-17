import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { useParams } from 'react-router-dom';
import './ProductsPage.css';
import { Product } from './Products';
import { useCart } from '../../context/CartContext';

export default function SingleProductPage() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loginOpen] = useState<boolean>(false);
  const [starNum, setStarNum] = useState<number>();

  const { pid } = useParams();
  console.log('🚀 ~ SingleProductPage ~ id:', pid);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('🚀 ~ SingleCoursePage ~ pathnames:', pathnames);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product | undefined) => {
    if (!product) {
      console.error('Product is not defined');
      return;
    }
    const productId = product._id;
    const image = product.image;
    const productName = product.productName;
    const price = product.price;
    const quantity = 1;
    addToCart(productId, image, productName, price, quantity);
  };

  const getStockStatus = (stock: number | undefined) => {
    if (stock) {
      if (stock > 10) {
        return <span className="text-green-500">available</span>;
      } else if (stock > 5) {
        return <span className="text-yellow-500">low stock</span>;
      } else if (stock > 0) {
        return <span className="text-orange-500">left few</span>;
      }
    }
    return <span className="text-red-600">out of stock</span>;
  };

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

  // fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${URL}/public/products/${pathnames[1]}`
        );
        const data = await response.data;
        console.log('🚀 ~ fetchProducts ~ data:', data);
        setProduct(data.product);
        setStarNum(Math.round(data.product.averageRating));
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching members data', error.response?.data);
        } else {
          console.error('Unexpected error', error);
        }
      }
    };
    fetchProduct();
  }, []);

  console.log('product', product);

  return (
    <>
      <section
        id="breadcrumb-section"
        className="hero bg-cover bg-center flex items-center h-[30vh]"
        style={{
          backgroundImage:
            "url('/src/assets/images/Hero/Background-breadcrumb.png')"
        }}
      >
        <div className="container mx-auto max-w-[1280px] px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="text-3xl md:text-4xl lg:text-6xl   font-kanit mb-4 font-bold ">
                products
              </h1>
              <ul className="font-archivo font-medium uppercase text-sm lg:text-lg flex">
                <li className="flex space-x-2 text-primary mr-2">
                  <Link to="/">
                    Home <span className="relative bottom-[2px]">&gt;&gt;</span>{' '}
                  </Link>
                </li>

                <li>
                  <Link to="/shop" className="text-white mr-1">
                    shop &gt;
                  </Link>
                </li>
                <li className="text-white">
                  {product?.productName ? product?.productName : 'Loading...'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="single-product" className=" bg-white py-10 lg:px-14 md:px-6">
        <div className="flex flex-wrap mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
          <div className="w-full md:w-7/12 lg:w-8/12 px-4">
            <div className="th-page page-single">
              <Link to="/shop" className="text-red-500">
              <span className='text-xl inline-block mb-8'>{'<< back to shop'}</span>
              </Link>
              <div className="page-img">
                <img
                  className="rounded-3xl"
                  src={product?.image}
                  alt="page Image"
                />
              </div>
              {/* Page Content */}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="page-content">
                  <h2 className="page-title text-4xl font-bold mt-4 mb-3">
                    {product?.productName}
                  </h2>
                  <p className="mt-2 text-body text-archivo">
                    {product?.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-5/12 lg:w-4/12 px-4">
            <aside className="sidebar">
              <div className="widget mb-8">
                <h3 className="widget-title h4">Product Details</h3>
                <ul className="product-highlights">
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Product Name: </strong>
                        {product?.productName}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Price: </strong>
                        {product?.price}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>In Stock: </strong>
                        {getStockStatus(product?.stock)}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Description: </strong>
                        {product?.description}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title flex">
                      <h4>
                        <strong>Rating: </strong>
                        {product?.averageRating}
                      </h4>
                      <div className="flex mx-1">
                        {[...Array(starNum)].map((_, index) => (
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
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="widget mb-8">
                <h3 className="widget-title h4">To Buy</h3>
                <ul className="categories">
                  <li>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product?.stock === 0}
                      className={`w-full flex items-center justify-center rounded-md bg-blackColor3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 ${product?.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      Add to cart
                    </button>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
