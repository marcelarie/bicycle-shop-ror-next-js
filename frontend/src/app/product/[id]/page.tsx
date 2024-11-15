"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Variant {
  id: number;
  name: string;
  price: number;
}

interface Component {
  id: number;
  name: string;
  description: string;
  variants: Variant[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  components: Component[];
}

async function fetchProductData(productId: string): Promise<Product> {
  const productRes = await fetch(
    `http://localhost:3000/products/${productId}`,
    { cache: "no-store" },
  );

  if (!productRes.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await productRes.json();

  const componentsRes = await fetch(
    `http://localhost:3000/products/${productId}/components`,
    { cache: "no-store" },
  );

  if (!componentsRes.ok) {
    throw new Error("Failed to fetch components");
  }

  const components: Component[] = await componentsRes.json();

  const componentsWithVariants = await Promise.all(
    components.map(async (component) => {
      const variantsRes = await fetch(
        `http://localhost:3000/products/${productId}/components/${component.id}/variants`,
        { cache: "no-store" },
      );

      if (!variantsRes.ok) {
        throw new Error("Failed to fetch variants");
      }

      const variants: Variant[] = await variantsRes.json();
      return { ...component, variants };
    }),
  );

  return { ...product, components: componentsWithVariants };
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductData(id);
      setProduct(data);
    };

    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex items-center justify-center">
        <h1 className="text-2xl text-gray-900 dark:text-white">Loading...</h1>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3 w-full flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="h-auto rounded-md w-full"
              />
            </div>

            <div className="lg:w-2/3 w-full">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {product.description}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-8">
                ${product.price}
              </p>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Components
                </h2>
                <div className="space-y-6">
                  {product.components.map((component) => (
                    <div
                      key={component.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {component.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {component.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Variants
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          {component.variants.map((variant) => (
                            <div
                              key={variant.id}
                              className="p-3 border dark:border-gray-700 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-700"
                            >
                              <span className="text-gray-900 dark:text-white">
                                {variant.name}
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                ${variant.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex items-center justify-center">
        <h1 className="text-2xl text-red-600 dark:text-red-400">
          Failed to load product
        </h1>
      </div>
    );
  }
};

export default ProductPage;
