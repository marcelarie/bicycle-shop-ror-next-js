# Shop App

This repository contains a simple ecommerce application. The initial focus is on
bicycles as the main product, but the architecture is designed to be extensible
for other types of products in the future.

It used Ruby on Rails for the backend and Next.js for the frontend.

## Installation

Clone the repository and use `make` or `just` to install dependencies:

```bash
git clone https://github.com/marcelarie/bicycle-shop-ror-next-js.git
cd bicycle-shop-ror-next-js
make install # or `just install` if you have Just installed
```

## Running the Project

Run both the backend and frontend services:

```bash
make run # or `just run`
```

- The backend runs on port `3000`.
- The frontend runs on port `4000`.

## Features

### Public Shop Page

- [x] Lists available products
- [x] Customize products with components and variants
- [x] Displays the selected items (future cart functionality)

### Admin Page

- [x] Create, update, and delete products, components, and variants
- [x] Manage stock for products and variants
- [x] Validate prohibited combinations client-side
- [ ] Revalidate combinations server-side

## Product Architecture

### **Product Class**

- `id`
- `name`
- `description`
- `price`
- `image`
- `stock`
- `components` (relation to Component)

### **Component Class**

- `id`
- `name`
- `description`
- `image`
- `variants` (relation to Variant)

### **Variant Class**

- `id`
- `name`
- `description`
- `price`
- `image`
- `stock`

### Stock Management

Stock is managed on both the `Product` and `Variant` levels:

- Admins can update stock directly through the Admin page.
- Stock decreases automatically with each purchase.

**Note:** Stock does not have its own class, for now we only need to update the
stock of products and variants with each request and via the Admin page.

## Validation System

Validation ensures that only valid product and variant combinations are
selectable. This is implemented via:

1. **Variant Validation Endpoint**

   - Validates the compatibility of selected variants with other variants in the
     product.
   - Returns a list of conflicts for the selected variant.

2. **Combination Validation Endpoint**
   - Validates the entire selection of components and variants for a product.
   - Prevents invalid combinations from being added to the cart.

**Hardcoded Rules:**
Validation rules are currently hardcoded for now.
In the future it would be really simple to change the validate class to use some
type of table of rules that are updated by the admin user.

The current rules are this ones:

```ruby
class Validate < ApplicationRecord
  VARIANT_RULES = {
    1 => [ 3 ],
    2 => [ 4 ]
  }
```

To test this the user can create 4 variants, 2 for the first component, and
another 2 variants for the second component.

This would be the product structure:

```
Product 1
  Component 1
    Variant 1
    Variant 2
  Component 2
    Variant 3
    Variant 4
```

Selecting Variant 1 will disable Variant 3, demonstrating the rules in action.

## Cart Functionality

The cart is omitted in as a class in the backend for this version, instead:

- Users select combinations of components and variants.
- Validation ensures that combinations are valid before displaying them.
- The cart is saved in the client side.

In a future implementation the Cart would be a class that would store the selected
items.

## Admin

Given that the admin was not needed to be authenticated, the admin routes are
not implemented. In the future the admin routes would be protected by some type
of auth and the admin would be able to create, update and delete products,
components and variants.

This would be the admin routes:

```ruby
namespace :admin do
  post "products", to: "products#create"
  delete "products/:id", to: "products#destroy"
  patch "products/:id/stock", to: "products#update_stock"

  post "products/:product_id/components", to: "components#create"
  delete "components/:id", to: "components#destroy"
  patch "components/:id/stock", to: "components#update_stock"

  post "components/:component_id/variants", to: "variants#create"
  delete "variants/:id", to: "variants#destroy"
  patch "variants/:id", to: "variants#update"
  patch "variants/:id/stock", to: "variants#update_stock"
end
```

Currently the page uses the product endpoint to create and update products,
including the components and variants.

## Key Tradeoffs, Assumptions, and Decisions

1. **Hardcoded Rules:**

   - Current validation rules are hardcoded.
   - It would be easy to implement in the future because of how the Validation
     code is separated.

2. **No Authentication:**

   - This was specified in the requirements.

3. **Minimal Cart:**

   - No need for Cart in the Backend, it is handled in the client side.

4. **Frontend and Backend Separation:**

   - Backend handles data validation, stock management, and business logic.
   - Frontend focuses on user interactions for the shop and admin pages.

5. **No Stock Model:**
   - Stock is managed directly on `Product` and `Variant` classes.
   - Simplifies the implementation given the current requirements.
