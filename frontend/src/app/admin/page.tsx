"use client";

import { useState } from "react";

interface Variant {
  name: string;
  price: string;
  stock: string;
  image: string;
}

interface Component {
  name: string;
  image: string;
  variants: Variant[];
}

interface FormData {
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  components: Component[];
}

const Admin = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    components: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement POST request to /products here
    const requestBody = {
      product: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image,
        components_attributes: formData.components.map((component) => ({
          name: component.name,
          image: component.image,
          variants_attributes: component.variants.map((variant) => ({
            name: variant.name,
            price: parseFloat(variant.price),
            stock: parseInt(variant.stock),
            image: variant.image,
          })),
        })),
      },
    };

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response);
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

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
            {formData.components.map((component, componentIndex) => (
              <div key={componentIndex} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Component {componentIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newComponents = [...formData.components];
                      newComponents.splice(componentIndex, 1);
                      setFormData((prev) => ({
                        ...prev,
                        components: newComponents,
                      }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Component
                  </button>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Component Name
                    </label>
                    <input
                      type="text"
                      value={component.name}
                      onChange={(e) => {
                        const newComponents = [...formData.components];
                        newComponents[componentIndex].name = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          components: newComponents,
                        }));
                      }}
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
                      onChange={(e) => {
                        const newComponents = [...formData.components];
                        newComponents[componentIndex].image = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          components: newComponents,
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-medium">Variants</h4>
                  {component.variants.map((variant, variantIndex) => (
                    <div key={variantIndex} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">
                          Variant {variantIndex + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newComponents = [...formData.components];
                            newComponents[componentIndex].variants.splice(
                              variantIndex,
                              1,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              components: newComponents,
                            }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove Variant
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={variant.name}
                            onChange={(e) => {
                              const newComponents = [...formData.components];
                              newComponents[componentIndex].variants[
                                variantIndex
                              ].name = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                components: newComponents,
                              }));
                            }}
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
                            onChange={(e) => {
                              const newComponents = [...formData.components];
                              newComponents[componentIndex].variants[
                                variantIndex
                              ].price = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                components: newComponents,
                              }));
                            }}
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
                            onChange={(e) => {
                              const newComponents = [...formData.components];
                              newComponents[componentIndex].variants[
                                variantIndex
                              ].stock = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                components: newComponents,
                              }));
                            }}
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
                            onChange={(e) => {
                              const newComponents = [...formData.components];
                              newComponents[componentIndex].variants[
                                variantIndex
                              ].image = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                components: newComponents,
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const newComponents = [...formData.components];
                      newComponents[componentIndex].variants.push({
                        name: "",
                        price: "",
                        stock: "",
                        image: "",
                      });
                      setFormData((prev) => ({
                        ...prev,
                        components: newComponents,
                      }));
                    }}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700"
                  >
                    Add Variant
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
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
              }}
              className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:hover:bg-gray-700"
            >
              Add Component
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
