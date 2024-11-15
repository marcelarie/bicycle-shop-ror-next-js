import { Component, Variant } from "../product/[id]/page";

type Props = {
  component: Component;
  variant: Variant;
  selected: boolean;
  handleSelectVariant: (
    e: React.MouseEvent<HTMLButtonElement>,
    componentId: number,
    variantId: number,
  ) => void;
};

const ProductVariant = ({
  component,
  variant,
  selected,
  handleSelectVariant,
}: Props) => {
  return (
    <button
      key={variant.id}
      className="p-3 border dark:border-gray-700 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      style={{
        borderColor: selected ? "#2563EB" : "transparent",
        borderWidth: 2,
      }}
      onClick={(e) => handleSelectVariant(e, component.id, variant.id)}
    >
      <span className="text-gray-900 dark:text-white">{variant.name}</span>
      <span className="font-bold text-gray-900 dark:text-white">
        ${variant.price}
      </span>
    </button>
  );
};

export default ProductVariant;
