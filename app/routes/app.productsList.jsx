
// Best one 
import { useLoaderData } from "@remix-run/react";
import MultiPageBook from '../components/MultiPageBook.jsx';
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
