### GadgetsHub Architecture – AK

- Team Collaboration: All hooks, services, repositories, and components were developed collaboratively with Harpreet Singh. Implementation, testing, and integration were shared between us. This document highlights my personal contributions to the project.

### 1.Custom Hook – useWishlist
## What it does:
- Manages the wishlist state across the app. Provides functions to add, remove, and check items in the wishlist. Only  handles presentation logic — UI and state management.

## Why this logic is here:
- Allows multiple components to reuse wishlist functionality without duplicating code.

## Where/how it is used:
- WishlistPage – displays all wishlist items.
- GadgetCard – “Add to Wishlist” button uses this hook to update state.

# Returned Values:
- items – current wishlist items
- count – number of items
- message – feedback messages
- loading – loading indicator
- refresh() – reloads wishlist
- toggle(item) – adds/removes an item
- remove(id) – removes item
- isWishlisted(id) – checks if item is in wishlist

## My Contributions:

- Implemented toggle and remove logic.
- Integrated useWishlist with GadgetCard and WishlistPage.
- Managed TypeScript typings and ensured state updates correctly across components.

### 2. Service – WishlistService

## What it does:
- Encapsulates business logic for wishlist operations:
- Validates wishlist items (title, priceCAD, rating)
- Prevents duplicates
- Calls repository methods to add/remove items

## Where/how it is used:
- Used by useWishlist to handle add/remove logic.

# Methods:
- list() – returns all wishlist items
- toggle(item) – add/remove item with business validation
- remove(id) – remove item

## My Contributions:
- Defined validation logic and toggle behavior.
- Connected service to hook and ensured proper messaging.

### 3. Repository – WishlistRepository

## What it does:
- Manages wishlist data persistence. Currently uses in-memory state and test data (wishlistTestData). Provides CRUD methods.

## Where/how it is used:
- WishlistService uses this repository to fetch, add, or remove wishlist items.

# Methods:
- getAll() – returns all items
- getById(id) – returns a single item
- add(item) – add item
- remove(id) – remove item
- setAll(items) – replace all wishlist items
- existsInTestData(id) – checks if item exists in test data

## My Contributions:
- Implemented add() and remove() methods.
- Ensured repository integrates correctly with service and hook.

### 4. Custom Hook – useProducts

## What it does:
- Manages presentation logic for products. Fetches products from ProductRepository, filters, and formats for components.

## Where/how it is used:
- ProductsPage – renders product list using GadgetCard.
- GadgetCard – receives props like name, brand, price, image, and colors.

- Returned Values:
- products – all products
- filterByCategory(category) – filter products
- getProductById(id) – fetch single product

## My Contributions:
- Connected hook to GadgetCard.
- Integrated filtering and formatting logic.

### 5.Service – ProductService

## What it does:
- Encapsulates business rules for products (e.g., filtering by category).

## Where/how it is used:
- Called by useProducts to filter/sort products before passing to components.

## My Contributions:
- Implemented category filtering.
- Verified service integration with hook and components.

### 6.Repository – ProductRepository

## What it does:
- Provides CRUD access to product data from products.ts. Manages test data array.

## Where/how it is used:
- ProductService and useProducts call this repository to fetch product lists or individual items.

# Methods:

- getAll() – return all products
- getById(id) – return single product
- add(product) – add a new product
- update(product) – update product
- remove(id) – remove product

## My Contributions:
- Populated repository with test product data.
- Implemented getAll() and getById() methods.
