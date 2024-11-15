# Shop App

This will be a simple ecommerce app. It will have bicycles as the main product
but it should be extensible to have other products in the future.

It will have two main pages:

1. Public shop page

   - [x] Lists the products
   - [x] Customize each product
   - [x] Cart that displays the bikes

2. Admin page
   - [x] Create bikes
   - [x] Delete bikes
   - [x] Manage stock and product parts

**Important note:**
No need for auth, checkout or a design.

## Products

Product class:

- id
- name
- description
- price
- components -> with its own class
- image
- stock

Component class -> related to Product:

- id
- name
- description
- image

Variant class -> related to Component:

- id
- name
- description
- price (we deleted price from the components to have it on each variant)
- image
- stock

**Note:**
No need to have stock as its own class, given that the stock needs to be managed
by each variant and there is only one store for the moment.

# Cart

The cart will be a simple list of the products that the user has added to it.
There is no need for a checkout or a payment system.

1. The user selects a combination of components with a product
2. The cart will handle this combination
3. In the future there will be a validation step

**NOTE:**
For now the Cart will not be implemented, the validation endpoint is enough.

## Validation

A product has multiple components
Each component has multiple variants

The user can select multiple components per product and one variant per component

Steps:

1. User selects a product
2. Selects a component
3. Selects a variant
4. Then all the other combinations that are not valid appear as disabled

## Stock management

The stock management will be handled by products and variants.

- [x] The stock will be updated when is bought.
- [x] The admin will manage the stock
- [ ] Client-side validation for prohibited combinations
- [ ] Revalidate cart items in the FE and BE

## Admin

The admin page should be simple:

1. No need for auth
2. Create products, components and variants
3. Delete products, components and variants
4. Manage stock
5. Update variants

There is no need to create and Admin class if there is no auth for now.
When the auth is needed the endpoints could move to a Admin/namespace subclass.
For now we can use the endpoints as they are.

```ruby
# routes.rb
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

# rest of the routes for non admins
```
