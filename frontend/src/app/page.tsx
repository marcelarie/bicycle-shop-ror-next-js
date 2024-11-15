interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ShopPage = async () => {
  const res = await fetch("http://localhost:3000/products");
  const products: Product[] = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-gray-600 dark:bg-gray-800 dark:text-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="object-cover rounded-md mx-auto h-52 w-96"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="mt-2">{product.description}</p>
              <p className="text-lg font-bold mt-4">${product.price}</p>
              <a href={`/product/${product.id}`} className="block mt-4 bg-gray-800 text-white py-2 px-4 rounded-md text-center">
                Customize
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
