


// // Best one 
// import { useLoaderData } from "@remix-run/react";
// import MultiPageBook from '../components/MultiPageBook';
// import { loader as fetchProductDescriptionsLoader } from './app.products.jsx'; // Import the loader from app.products

// export const loader = fetchProductDescriptionsLoader;

// const Book = () => {
//   // Fetch data from loader
//   const { productDescriptions } = useLoaderData();
//   console.log("Product Descriptions:", productDescriptions); // Step 1: Log the fetched data

//   // Convert productDescriptions to the desired page format
//   const pages = Object.keys(productDescriptions).map((title, index) => {
//     const page = {
//       title: `Page ${Math.floor(index / 3) + 1} - ${title}`,
//       description: productDescriptions[title],
//     };
//     console.log("Page:", page); // Step 2: Log each page object
//     return page;
//   });

//   const paginatedPages = [];
//   for (let i = 0; i < pages.length; i += 3) {
//     const currentPage = pages.slice(i, i + 3);
//     console.log("Paginated Page:", currentPage); // Step 3: Log the paginated pages
//     paginatedPages.push(currentPage);
//   }

//   console.log("Final Paginated Pages:", paginatedPages); // Step 4: Log the final paginated pages array

//   return (
//     <div>
//       <MultiPageBook pages={paginatedPages} />
//     </div>
//   );
// };

// export default Book;

// New 


// import { useLoaderData, useFetcher } from "@remix-run/react";
// import MultiPageBook from '../components/MultiPageBook';
// import { loader as fetchProductDescriptionsLoader } from './app.products.jsx';

// export const loader = fetchProductDescriptionsLoader;

// const ProductList = () => {
//   const { productDescriptions } = useLoaderData();
//   const fetcher = useFetcher();

//   const generateNewDescriptions = () => {
//     console.log("Button clicked: Fetching new descriptions...");
//     fetcher.load("/generate-new-descriptions");
//   };

//   // Log the initial descriptions loaded
//   console.log("Initial Product Descriptions:", productDescriptions);

//   // If the fetcher has data, use it instead of the initial data
//   const descriptions = fetcher.data?.productDescriptions || productDescriptions;

//   // Log the updated descriptions if fetched
//   if (fetcher.data?.productDescriptions) {
//     console.log("New Product Descriptions:", fetcher.data.productDescriptions);
//   }

//   // Convert productDescriptions to the desired page format
//   const pages = Object.keys(descriptions).map((title, index) => {
//     const page = {
//       title: `Page ${Math.floor(index / 3) + 1} - ${title}`,
//       description: descriptions[title],
//     };
//     console.log("Page Object:", page);
//     return page;
//   });

//   const paginatedPages = [];
//   for (let i = 0; i < pages.length; i += 3) {
//     const currentPage = pages.slice(i, i + 3);
//     console.log("Paginated Page Group:", currentPage);
//     paginatedPages.push(currentPage);
//   }

//   console.log("Final Paginated Pages Array:", paginatedPages);

//   return (
//     <div>
//       <button onClick={generateNewDescriptions}>Generate New Descriptions</button>
//       <MultiPageBook pages={paginatedPages} />
//     </div>
//   );
// };

// export default ProductList;

import { useLoaderData, useFetcher } from "@remix-run/react";
import MultiPageBook from '../components/MultiPageBook';
import { loader as fetchProductDescriptionsLoader } from './app.products.jsx';

export const loader = fetchProductDescriptionsLoader;

const ProductList = () => {
  const { productDescriptions } = useLoaderData();
  const fetcher = useFetcher();

  const generateNewDescriptions = () => {
    console.log("Button clicked: Fetching new descriptions...");
    fetcher.load("/generate-new-descriptions");
  };

  // Log the initial descriptions loaded
  console.log("Initial Product Descriptions:", productDescriptions);

  // If the fetcher has data, use it instead of the initial data
  const descriptions = fetcher.data?.productDescriptions || productDescriptions;

  // Log the updated descriptions if fetched
  if (fetcher.data?.productDescriptions) {
    console.log("New Product Descriptions:", fetcher.data.productDescriptions);
  }

  // Convert productDescriptions to the desired page format
  const pages = Object.keys(descriptions).map((title, index) => {
    const page = {
      title: `Page ${Math.floor(index / 3) + 1} - ${title}`,
      description: descriptions[title],
    };
    console.log("Page Object:", page);
    return page;
  });

  const paginatedPages = [];
  for (let i = 0; i < pages.length; i += 3) {
    const currentPage = pages.slice(i, i + 3);
    console.log("Paginated Page Group:", currentPage);
    paginatedPages.push(currentPage);
  }

  console.log("Final Paginated Pages Array:", paginatedPages);

  return (
    <div>
      {/* Button to generate new descriptions */}
      <button onClick={generateNewDescriptions} style={{ marginBottom: "20px" }}>
        Generate New Descriptions
      </button>

      {/* Display the pages */}
      <MultiPageBook pages={paginatedPages} />
    </div>
  );
};

export default ProductList;
