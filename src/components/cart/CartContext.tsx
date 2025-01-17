'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: Record<string, CartItem>;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items[action.payload.id];
      const updatedItem = {
        ...action.payload,
        quantity: (existingItem?.quantity || 0) + 1,
      };

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: updatedItem,
        },
        total: state.total + action.payload.price,
      };
    }
    case 'REMOVE_ITEM': {
      const { [action.payload]: removedItem, ...remainingItems } = state.items;
      return {
        ...state,
        items: remainingItems,
        total: state.total - (removedItem ? removedItem.price * removedItem.quantity : 0),
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items[action.payload.id];
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...item,
            quantity: action.payload.quantity,
          },
        },
        total: state.total + item.price * quantityDiff,
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: {},
    total: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};