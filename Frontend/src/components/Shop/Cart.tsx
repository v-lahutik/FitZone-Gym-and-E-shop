import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { Dispatch, SetStateAction } from 'react'; // Import these types
import { useCart } from '../../context/CartContext.tsx';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
interface CartProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  products: CartItem[];
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, changeQuantity } = useCart();

  // Calculate the total price
  const subTotal = cart.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      changeQuantity(productId, newQuantity);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    setOpen(false); // Close the cart
    navigate('/checkout'); 
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <HiOutlineXMark
                          aria-hidden="true"
                          className="h-6 w-6"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.map((product) => (
                          <li key={product.productId} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.productName}
                                src={product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a>{product.productName}</a>
                                  </h3>
                                  <p className="ml-4">
                                    €{' '}
                                    {(product.price * product.quantity).toFixed(
                                      2
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.productId,
                                        product.quantity - 1
                                      )
                                    }
                                    className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md"
                                  >
                                    -
                                  </button>
                                  <p className="mx-2">{product.quantity}</p>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.productId,
                                        product.quantity + 1
                                      )
                                    }
                                    className="px-2 py-1 text-gray-700 bg-gray-200 rounded-md"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={() =>
                                      handleRemoveFromCart(product.productId)
                                    }
                                    type="button"
                                    className="font-medium text-primary hover:text-blackColor3"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>€ {subTotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                  <button
            onClick={handleCheckout} 
            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blackColor3"
          >
            Checkout
          </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-blackColor3 hover:text-primary"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default Cart;
