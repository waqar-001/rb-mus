


// const pages = [
//     [
//         { title: 'Page 1 - Title 1', description: 'Description for page 1 - item 1' },
//         { title: 'Page 1 - Title 2', description: 'Description for page 1 - item 2' },
//         { title: 'Page 1 - Title 3', description: 'Description for page 1 - item 3' },
//     ],
//     [
//         { title: 'Page 2 - Title 1', description: 'Description for page 2 - item 1' },
//         { title: 'Page 2 - Title 2', description: 'Description for page 2 - item 2' },
//         { title: 'Page 2 - Title 3', description: 'Description for page 2 - item 3' },
//     ],
//     [
//         { title: 'Page 3 - Title 1', description: 'Description for page 3 - item 1' },
//         { title: 'Page 3 - Title 2', description: 'Description for page 3 - item 2' },
//         { title: 'Page 3 - Title 3', description: 'Description for page 3 - item 3' },
//     ],
// ];

// const Book = () => {
//     return (
//         <div className="">
//         <MultiPageBook pages={pages} />
//     </div>
//     );
// };

// export default Book;

// import { useLoaderData } from "@remix-run/react";
// import MultiPageBook from '../components/MultiPageBook';
// import { loader as fetchProductDescriptionsLoader } from './app.products.jsx'; // Import the loader from app.products

// export const loader = fetchProductDescriptionsLoader;

// const Book = () => {
//   const { productDescriptions } = useLoaderData();

//   // Convert productDescriptions to the desired page format
//   const pages = Object.keys(productDescriptions).map((title, index) => ({
//     title: `Page ${Math.floor(index / 3) + 1} - ${title}`,
//     description: productDescriptions[title],
//   }));

//   const paginatedPages = [];
//   for (let i = 0; i < pages.length; i += 3) {
//     paginatedPages.push(pages.slice(i, i + 3));
//   }

//   return (
//     <div>
//       <MultiPageBook pages={paginatedPages} />
//     </div>
//   );
// };

// export default Book;

// Best one 
import { useLoaderData } from "@remix-run/react";
import MultiPageBook from '../components/MultiPageBook';
import { loader as fetchProductDescriptionsLoader } from './app.products.jsx'; // Import the loader from app.products

export const loader = fetchProductDescriptionsLoader;

const Book = () => {
  // Fetch data from loader
  const { productDescriptions } = useLoaderData();
  console.log("Product Descriptions:", productDescriptions); // Step 1: Log the fetched data

  // Convert productDescriptions to the desired page format
  const pages = Object.keys(productDescriptions).map((title, index) => {
    const page = {
      title: `Page ${Math.floor(index / 3) + 1} - ${title}`,
      description: productDescriptions[title],
    };
    console.log("Page:", page); // Step 2: Log each page object
    return page;
  });

  const paginatedPages = [];
  for (let i = 0; i < pages.length; i += 3) {
    const currentPage = pages.slice(i, i + 3);
    console.log("Paginated Page:", currentPage); // Step 3: Log the paginated pages
    paginatedPages.push(currentPage);
  }

  console.log("Final Paginated Pages:", paginatedPages); // Step 4: Log the final paginated pages array

  return (
    <div>
      <MultiPageBook pages={paginatedPages} />
    </div>
  );
};

export default Book;
