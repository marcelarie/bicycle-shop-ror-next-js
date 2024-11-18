import { Component, Variant } from "@/types";

type Props = {
  component: Component;
  variant: Variant;
  selected: boolean;
  handleSelectVariant: (
    e: React.MouseEvent<HTMLButtonElement>,
    componentId: number,
    variantId: number,
    variantPrice: number,
  ) => void;
  disabledVariants: number[];
};

const ProductVariant = ({
  component,
  variant,
  selected,
  handleSelectVariant,
  disabledVariants,
}: Props) => {
  const isDisabled = disabledVariants.includes(variant.id);

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant.image}
        width={200}
        style={{
          borderColor: selected ? "#2563EB" : "#374151",
          borderWidth: 2,
        }}
        alt={variant.name}
        className="rounded-md"
      />
      <button
        key={variant.id}
        className="p-3 border dark:border-gray-700 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        onClick={(e) =>
          handleSelectVariant(e, component.id, variant.id, variant.price)
        }
        style={{
          backgroundColor: isDisabled ? "#A0AEC0" : selected ? "#2563EB" : "",
          color: isDisabled ? "#CBD5E0" : selected ? "#FFFFFF" : "",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        disabled={isDisabled}
      >
        <div className="flex flex-row items-center space-x-2">
          <span className="text-gray-900 dark:text-white">{variant.name}</span>
          <span className="font-bold text-gray-900 dark:text-white">
            ${variant.price}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ProductVariant;
