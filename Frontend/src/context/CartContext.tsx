import { createContext, useReducer, useContext, ReactNode } from 'react';

interface CartItem {
  productId: string;
  image: string;
  productName: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialCartState: CartState = {
  cart: []
};

// Define the possible cart actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | {
      type: 'CHANGE_QUANTITY';
      payload: { productId: string; quantity: number };
    }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'CLEAR_CART' };

//  manage cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.productId.toString() === action.payload.productId.toString()
      );

      // If item already exists in the cart, update the quantity
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        const newState = { ...state, cart: updatedCart };
        localStorage.setItem('cart', JSON.stringify(newState.cart));
        return newState;
      }

      const newState = { ...state, cart: [...state.cart, action.payload] };
      localStorage.setItem('cart', JSON.stringify(newState.cart));
      // If item is new, add it to the cart
      return newState;
    }
    case 'CHANGE_QUANTITY': {
      const updatedCart = state.cart.map((item) =>
        item.productId.toString() === action.payload.productId.toString()
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newState = { ...state, cart: updatedCart };
      localStorage.setItem('cart', JSON.stringify(newState.cart));
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter(
        (item) =>
          item.productId.toString() !== action.payload.productId.toString()
      );
      const newState = { ...state, cart: updatedCart };
      localStorage.setItem('cart', JSON.stringify(newState.cart));
      return newState;
    }

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
};

// Create the CartContext with a default value of undefined (will be handled by the provider)
interface CartContextType {
  cart: CartItem[];
  addToCart: (
    productId: string,
    image: string,
    productName: string,
    price: number,
    quantity: number
  ) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider to wrap around components
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const storedCart = localStorage.getItem('cart');

  if (storedCart) {
    state.cart = JSON.parse(storedCart);
  }
  // Function to add item to cart
  const addToCart = (
    productId: string,
    image: string,
    productName: string,
    price: number,
    quantity: number
  ) => {
    console.log('Adding to cart:', {
      productId,
      image,
      productName,
      price,
      quantity
    });

    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, image, productName, price, quantity }
    });
  };

  // Function to change quantity
  const changeQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'CHANGE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId }
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART'
    });
  };
  const getTotalQuantity = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  console.log('cart', state.cart);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        getTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
