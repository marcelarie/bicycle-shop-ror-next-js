"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Component, Variant } from "@/types";

interface FormData {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  components: Array<Component & {
    _destroy?: boolean;
    variants: Array<Variant & {
      _destroy?: boolean; price: string;
      stock: string;
    }>;
  }>;
}

const EditProduct = () => {
  const { id: productId } = useParams();

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    components: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();

        const transformedData: FormData = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          image: data.image,
          stock: data.stock.toString(),
          components: data.components.map((component: Component) => ({
            id: component.id,
            name: component.name,
            image: component.image,
            variants: component.variants.map((variant: Variant) => ({
              id: variant.id,
              name: variant.name,
              price: variant.price.toString(),
              stock: variant.stock.toString(),
              image: variant.image || "",
            })),
          })),
        };

        setFormData(transformedData);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the request body with _destroy flags for deletions
    const requestBody = {
      product: {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image,
        components_attributes: formData.components
          .filter((comp) => !comp._destroy)
          .map((component) => ({
            id: component.id,
            name: component.name,
            image: component.image,
            _destroy: component._destroy || false,
            variants_attributes: component.variants
              .filter((varnt) => !varnt._destroy)
              .map((variant) => ({
                id: variant.id,
                name: variant.name,
                price: parseFloat(variant.price),
                stock: parseInt(variant.stock),
                image: variant.image,
                _destroy: variant._destroy || false,
              })),
          })),
      },
    };

    try {
      const response = await fetch(
        `http://localhost:3000/products/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update the product.");
      }

      const updatedProduct = await response.json();

      window.location.href = `/product/${updatedProduct.id}`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleComponentChange = (
    index: number,
    field: keyof Omit<Component, "variants" | "id" | "_destroy">,
    value: string,
  ) => {
    const newComponents = [...formData.components];
    newComponents[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      components: newComponents,
    }));
  };

  const handleVariantChange = (
    compIndex: number,
    varIndex: number,
    field: keyof Omit<Variant, "id" | "_destroy">,
    value: string,
  ) => {
    const newComponents = [...formData.components];
    newComponents[compIndex].variants[varIndex][field] = value;
    setFormData((prev) => ({
      ...prev,
      components: newComponents,
    }));
  };

  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          name: "",
          image: "",
          variants: [],
        },
      ],
    }));
  };

  const removeComponent = (index: number) => {
    const newComponents = [...formData.components];
    if (newComponents[index].id) {
      // Mark for deletion if it exists on the server
      newComponents[index]._destroy = true;
    } else {
      // Remove entirely if it's a new component
      newComponents.splice(index, 1);
    }
    setFormData((prev) => ({
      ...prev,
      components: newComponents,
    }));
  };

  const addVariant = (compIndex: number) => {
    const newComponents = [...formData.components];
    newComponents[compIndex].variants.push({
      name: "",
      price: "",
      stock: "",
      image: "",
    });
    setFormData((prev) => ({
      ...prev,
      components: newComponents,
    }));
  };

  const removeVariant = (compIndex: number, varIndex: number) => {
    const newComponents = [...formData.components];
    if (newComponents[compIndex].variants[varIndex].id) {
      // Mark for deletion if it exists on the server
      newComponents[compIndex].variants[varIndex]._destroy = true;
    } else {
      // Remove entirely if it's a new variant
      newComponents[compIndex].variants.splice(varIndex, 1);
    }
    setFormData((prev) => ({
      ...prev,
      components: newComponents,
    }));
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Components</h2>
            {formData.components.map((component, compIndex) => (
              <div
                key={compIndex}
                className={`mb-6 p-4 border rounded-lg ${
                  component._destroy ? "opacity-50" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Component {compIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeComponent(compIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {component.id ? "Delete Component" : "Remove Component"}
                  </button>
                </div>

                {!component._destroy && (
                  <>
                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Component Name
                        </label>
                        <input
                          type="text"
                          value={component.name}
                          onChange={(e) =>
                            handleComponentChange(
                              compIndex,
                              "name",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Component Image
                        </label>
                        <input
                          type="url"
                          value={component.image}
                          onChange={(e) =>
                            handleComponentChange(
                              compIndex,
                              "image",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-md font-medium">Variants</h4>
                      {component.variants.map((variant, varIndex) => (
                        <div
                          key={varIndex}
                          className={`p-3 border rounded ${
                            variant._destroy ? "opacity-50" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium">
                              Variant {varIndex + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeVariant(compIndex, varIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              {variant.id ? "Delete Variant" : "Remove Variant"}
                            </button>
                          </div>

                          {!variant._destroy && (
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  value={variant.name}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      compIndex,
                                      varIndex,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      compIndex,
                                      varIndex,
                                      "price",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                  required
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Stock
                                </label>
                                <input
                                  type="number"
                                  value={variant.stock}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      compIndex,
                                      varIndex,
                                      "stock",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                  required
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Image
                                </label>
                                <input
                                  type="url"
                                  value={variant.image}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      compIndex,
                                      varIndex,
                                      "image",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                  required
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addVariant(compIndex)}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700"
                      >
                        Add Variant
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addComponent}
              className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700"
            >
              Add Component
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
