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

## Notes

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
