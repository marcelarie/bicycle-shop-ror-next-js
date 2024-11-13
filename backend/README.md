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

We will start with a Product class, this will have the following attributes:
- id
- name
- description
- price
- components -> with its own class

- stock
- image

Then we will create the Component class, it will be related to the Product class:
- id
- name
- description
- price

- stock
- image
