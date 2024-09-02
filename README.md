# Wiley Frontend Assessment

This project is a React application built as part of a technical assessment for Wiley. It showcases a product management system with features like product listing, detail viewing, insertion, and deletion. The application is styled using CSS, and it leverages Redux for state management.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Implementations](#futureImplementations)
- [Design](#design)

## Features

- **Product Listing**: Displays a list of products with basic information.
- **Product Detail Page**: View detailed information about a specific product.
- **Product Insertion**: Add new products with a form.
- **Product Deletion**: Delete existing products from the list.
- **Category Filtering**: Filter products by categories.
- **Error Handling**: A dedicated error page for handling invalid routes.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version 16.x or higher)
- npm (version 7.x or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jessicacintra-eng/wiley-frontend-assessment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd wiley-frontend-assessment
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To run the project locally:

```bash
npm run dev
```

This will start the development server, and the application will be available at ` http://localhost:5173/`.



## Project Structure

Here's an overview of the project's structure:

```plaintext
├── public
│   ├── favIco.svg            # Favicon for the application
│   └── index.html            # Main HTML file
│
├── src
│   ├── assets                # Static assets such as logos and images
│   ├── components            # Reusable UI components
│   │   ├── categoryFilter    # Component for filtering products by category
│   │   ├── deleteButton      # Component for deleting products
│   │   ├── header            # Header component
│   │   ├── listTitle         # Component for displaying list titles
│   │   ├── productCard       # Card component for displaying product info
│   │   └── productForm       # Form component for adding/editing products
│   │
│   ├── interfaces            # TypeScript interfaces for type definitions
│   ├── pages                 # Application pages
│   │   ├── ErrorPage.tsx     # Error page component
│   │   ├── ProductDetailPage.tsx # Product detail page component
│   │   ├── ProductInsertionPage.tsx # Product insertion page component
│   │   └── ProductListPage.tsx # Product list page component
│   │
│   ├── store                 # Redux store configuration
│   │   ├── productSlice.tsx  # Redux slice for product state
│   │   ├── productThunks.tsx # Thunks for async product actions
│   │   └── store.tsx         # Main Redux store
│   │
│   ├── theme                 # Theme configuration for the application
│   │   └── theme.ts          # Theme settings
│   │
│   ├── utils                 # Utility functions
│   │   ├── currencyFormat.tsx # Helper function for currency formatting
│   │   └── request.tsx       # Axios wrapper for API requests
│   │
│   ├── App.tsx               # Root component of the application
│   ├── index.css             # Global styles
│   ├── main.tsx              # Entry point of the application
│   └── vite-env.d.ts         # Vite environment definition
│
├── .gitignore                # Git ignore file
├── eslint.config.js          # ESLint configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.app.json         # TypeScript configuration for the application
├── tsconfig.json             # TypeScript base configuration
├── tsconfig.node.json        # TypeScript configuration for Node.js
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for managing global state in React applications.
- **TypeScript**: A typed superset of JavaScript that helps catch errors early.
- **Vite**: A fast frontend build tool and development server.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **ESLint**: A tool for identifying and fixing problems in JavaScript and TypeScript code.

## Future Implementations

### Accessibility

- **Screen Reader Support**: Ensure all interactive elements and important information are properly labeled.
- **Keyboard Navigation**: Improve keyboard navigation for all components.
- **Form Accessibility**: Enhance forms with clear labels, accessible validation, and feedback.

### Unit Testing

- **Comprehensive Coverage**: Add unit tests for all major components and functions.
- **Automated Testing**: Set up automated tests to run on each commit and pull request.
- **CI/CD Integration**: Integrate unit tests with CI/CD pipelines for continuous validation.

## Design

The design for this project can be viewed [here](https://www.figma.com/design/W50EKR5oJhSqxSDD2mBmDx/Wiley?node-id=0-1&t=V06eh9kOz4PFSle4-1).

![Figma Design](![alt text](./src/assets/image.png)) 

This design provides a comprehensive layout and visual guide for the application, detailing the user interface components and overall style.
