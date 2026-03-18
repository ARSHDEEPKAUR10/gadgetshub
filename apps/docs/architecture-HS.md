Team Collaboration: All hooks, services, repositories, and components were developed collaboratively with AK. Implementation, testing, and integration were shared between us. This document highlights my personal contributions to the project.

1. Custom Hook – useWishlist
## What it does:
- Manages the wishlist state across the app. Provides functions to add, remove, and check items in the wishlist. Handles presentation logic only — UI and state management.

## why this logic is here:
- Allows multiple components to reuse wishlist functionality without duplicating code.

## Where/how it is used:
- WishlistPage – displays all wishlist items.
- GadgetCard – “Add to Wishlist” button uses this hook to update state.

- Returned Values:
- items – current wishlist items
- count – number of items
- message – feedback messages
- loading – loading indicator
- refresh() – reloads wishlist
- toggle(item) – adds/removes an item
- remove(id) – removes item
- isWishlisted(id) – checks if item is in wishlist

## My Contributions:
- Assisted in integrating useWishlist into GadgetCard and WishlistPage.
- Helped manage state updates and ensured TypeScript typings were correct.

2. Service – WishlistService

## What it does:
- Encapsulates business logic for wishlist operations:
- Validates wishlist items (title, priceCAD, rating)
- Prevents duplicates
- Calls repository methods to add/remove items

## Where/how it is used:
- Used by useWishlist hook to handle add/remove logic.
Methods:

list() – returns all wishlist items

toggle(item) – add/remove item with business validation

remove(id) – remove item

My Contributions:

Contributed to implementing toggle() and remove() methods.

Ensured service integrates correctly with the hook for proper messaging.

3. Repository – WishlistRepository

## What it does:

- Manages wishlist data persistence. Uses in-memory state and test data (wishlistTestData). Provides CRUD methods.

## Where/how it is used:

- WishlistService uses this repository to fetch, add, or remove wishlist items.

- Methods:

- getAll() – returns all items

- getById(id) – returns a single item

- add(item) – add item

- remove(id) – remove item

- setAll(items) – replace all wishlist items

- existsInTestData(id) – checks if item exists in test data

- My Contributions:

- Assisted with add() and remove() implementation.

- Helped ensure integration with WishlistService and useWishlist was working.

4. Custom Hook – useProducts

### What it does:

Manages presentation logic for products. Fetches products from ProductRepository, filters, and formats for components.

## Where/how it is used:

- ProductsPage – renders product list using GadgetCard.

- GadgetCard – receives props like name, brand, price, image, and colors.

- Returned Values:

- products – all products

-filterByCategory(category) – filter products

- getProductById(id) – fetch single product

My Contributions:

- Helped integrate useProducts hook with GadgetCard.

- Assisted in implementing filtering and formatting logic for products.

5. Service – ProductService

## What it does:

- Encapsulates business rules for products, such as filtering by category.

## Where/how it is used:

- Called by useProducts hook to filter/sort products before passing to components.

My Contributions:

- Implemented filtering logic and verified integration with useProducts.

6. Repository – ProductRepository

## What it does:

Provides CRUD access to product data from products.ts. Manages test data array.

## Where/how it is used:

- ProductService and useProducts call this repository to fetch product lists or individual items.

Methods:

- getAll() – return all products

- getById(id) – return single product

- add(product) – add a new product

- update(product) – update product

- remove(id) – remove product

My Contributions:

- Populated repository with test product data.
- Implemented getAll() and getById() methods and verified integration with service and hooks.