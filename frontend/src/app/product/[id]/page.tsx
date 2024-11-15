"use client";

import Cart from "@/app/components/Cart";
import ProductComponent from "@/app/components/ProductComponent";
import { Component, Product, Variant } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, number>
  >({});
  const [hasAddedToCart, setHasAddedToCart] = useState(false);
  const isCartDisabled =
    Object.keys(selectedVariants).length !== product?.components.length;

  const handleSelectVariant = (
    e: React.MouseEvent<HTMLButtonElement>,
    componentId: number,
    variantId: number,
  ) => {
    e.preventDefault();
    const isSelected = selectedVariants[componentId] === variantId;

    setSelectedVariants((prev) => {
      if (isSelected) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [componentId]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [componentId]: variantId,
      };
    });
  };

  const handleAddToCart = () => {
    if (isCartDisabled) {
      return;
    }
    const cart = sessionStorage.getItem("cart");

    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (Array.isArray(parsedCart)) {
        sessionStorage.setItem(
          "cart",
          JSON.stringify([...parsedCart, product]),
        );
      }
    } else {
      sessionStorage.setItem("cart", JSON.stringify([product]));
    }

    setHasAddedToCart(true);
    alert("Added to cart!");
  };

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
      <div className="min-h-screen bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto">
          <Cart reload={hasAddedToCart} />
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
                <div className="flex flex-row gap-4 items-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h1>
                  <p className="text-lg font-bold text-gray-500 dark:text-gray-500">
                    {product.stock} in stock
                  </p>
                </div>
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
                      <ProductComponent
                        key={component.id}
                        component={component}
                        selectedVariants={selectedVariants}
                        handleSelectVariant={handleSelectVariant}
                      />
                    ))}
                  </div>
                  <button
                    disabled={isCartDisabled}
                    className="bg-blue-500 text-white py-2 px-4 mt-8 w-full rounded-md"
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: isCartDisabled ? "#A0AEC0" : "#2563EB",
                      color: isCartDisabled ? "#CBD5E0" : "#FFFFFF",
                      cursor: isCartDisabled ? "not-allowed" : "pointer",
                      opacity: isCartDisabled ? 0.6 : 1,
                    }}
                  >
                    Add to Cart
                  </button>
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
