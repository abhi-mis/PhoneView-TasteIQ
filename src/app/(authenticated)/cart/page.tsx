'use client';

import CartList from '@/components/cart/CartList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <CartList />
        </div>
      </div>
    </div>
  );
}