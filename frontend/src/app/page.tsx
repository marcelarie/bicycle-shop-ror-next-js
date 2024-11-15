"use client";

import { useEffect, useState } from "react";
import Cart from "./components/Cart";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Cart reload={false} />
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded-md transition-colors ${
              isAdmin
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
          >
            Admin Mode: {isAdmin ? "ON" : "OFF"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md text-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="object-cover rounded-md mx-auto h-52 w-96"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="mt-2">{product.description}</p>
              <p className="text-lg font-bold mt-4">${product.price}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`/product/${product.id}`}
                  className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md text-center hover:bg-gray-700 transition-colors"
                >
                  Customize
                </a>
                {isAdmin && (
                  <a
                    href={`/admin/product/${product.id}`}
                    className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
