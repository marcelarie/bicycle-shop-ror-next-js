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

export interface FormVariant {
  id?: number;
  name: string;
  price: string;
  stock: string;
  image: string;
  _destroy?: boolean;
}

export interface FormComponent {
  id?: number;
  name: string;
  description: string;
  image: string;
  variants: FormVariant[];
  _destroy?: boolean;
}

export interface FormData {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  components: FormComponent[];
}
