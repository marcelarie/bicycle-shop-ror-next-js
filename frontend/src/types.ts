export interface Variant {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  _destroy?: boolean;
}

export interface Component {
  id: number;
  name: string;
  description: string;
  variants: Variant[];
  image: string;
  _destroy?: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  components: Component[];
  stock: number;
}
