"use client";

import ProductVariant from "./ProductVariant";

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

type Props = {
  component: Component;
  selectedVariants: Record<number, number>;
  handleSelectVariant: (
    e: React.MouseEvent<HTMLButtonElement>,
    componentId: number,
    variantId: number,
  ) => void;
};

const ProductComponent = ({
  component,
  selectedVariants,
  handleSelectVariant,
}: Props) => {
  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {component.variants.map((variant) => {
            const selected = selectedVariants[component.id] === variant.id;

            return (
              <ProductVariant
                key={variant.id}
                variant={variant}
                component={component}
                selected={selected}
                handleSelectVariant={handleSelectVariant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
