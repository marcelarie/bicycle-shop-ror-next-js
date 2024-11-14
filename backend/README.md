# Shop App

This will be a simple ecommerce app. It will have bicycles as the main product
but it should be extensible to have other products in the future.

It will have two main pages:

1. Public shop page

   - [ ] Lists the products
   - [ ] Customize each product
   - [ ] Cart that displays the bikes

2. Admin page
   - [ ] Create bikes
   - [ ] Delete bikes
   - [ ] Manage stock and product parts

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

- The stock management will be handled by products and variants.
- The stock will be updated when is bought.
  This will be a really simple endpoint that returns true or false if it was successful
- The admin will add more stock in the future

## Admin
