import React, { useState } from 'react';

import { Product } from '../../Shop/Products';
import { handleSaveNewProduct, handleUpdateProduct } from './ProductRequests';

interface ProductFormProps {
  product: Product | null;
  closeForm: () => void;
  isEditing: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  closeForm,
  isEditing
}) => {
  const [localProduct, setLocalProduct] = useState<Product>(
    product || {
      _id: '',
      productName: '',
      description: '',
      price: 0,
      stock: 0,
      image: '',
      category: {
        categoryName: ''
      }
    }
  );

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    console.log(name, value);
    setLocalProduct({ ...localProduct, [name]: value });
  };

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded w-1/3">
          <div className="flex justify-between items-center">
            <h3 className="text-xl">
              {product ? 'Product Details' : 'Create New Product'}
            </h3>
            <button onClick={closeForm} className="text-red-500">
              Close
            </button>
          </div>
          <div className="mt-4">
            <label>Product Name</label>
            <input
              name="productName"
              type="text"
              value={localProduct.productName}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-2"
              placeholder='product name'
            />
            <label>Product Picture</label>
            <input
              name="image"
              type="text"
              value={localProduct.image}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-2"
              placeholder='URL of the image'
            />

            <label>Description</label>
            <input
              name="description"
              type="text"
              value={localProduct.description}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-2"
              placeholder='description'
            />

            <label>Category</label>
            <select
              name="category"
              value={localProduct.category.categoryName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
            >
              <option value="670d14cfd3e6bf356b5763c8">Equipment</option>
              <option value="670d14ddd3e6bf356b5763cc">Accessories</option>
              <option value="670d14efd3e6bf356b5763d0">Supplements/Food</option>
            </select>
            <div className="flex justify-between gap-2 mb-2">
              <div className="w-1/2 flex flex-col">
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  value={localProduct.price}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <label>Stock</label>
                <input
                  name="stock"
                  type="text"
                  value={localProduct.stock}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                />
              </div>
            </div>
            <div className="flex justify-between"></div>

            <div className="flex justify-end mt-4">
              {!isEditing && (
                <div>
                  <button
                    onClick={() => handleUpdateProduct(localProduct, closeForm)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={() =>
                      handleSaveNewProduct(localProduct, closeForm)
                    }
                    className="bg-primary text-white px-4 py-2 rounded ml-2"
                  >
                    Save as new Product
                  </button>
                </div>
              )}
              {isEditing && (
                <button
                  onClick={() => handleSaveNewProduct(localProduct, closeForm)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save new Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
