import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { OpenAI } from "openai";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  console.log("Fetching product data from Shopify...");

  // Fetch product data from Shopify
  const response = await admin.graphql(
    `#graphql
    {
      products(first:10 ) {
        edges {
          node {
            title
          }
        }
      }
    }`
  );

  const { data } = await response.json();
  const products = data.products.edges.map((p) => p.node.title);

  console.log("Fetched Product Titles:", products); // Log the fetched product titles

  // AI -- Generate different descriptions
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const generateProductDescriptions = async (products) => {
    const productDescriptions = {};

    for (const productTitle of products) {
      console.log(`Generating description for: ${productTitle}`); // Log the product title being processed

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert product copywriter.",
          },
          {
            role: "user",
            content: `For the product "${productTitle}", generate a different variation of a highly detailed and persuasive product description that is around 50 words long.`,
          },
        ],
      });

      if (response.choices && response.choices.length > 0) {
        console.log(`Generated description for ${productTitle}:`, response.choices[0].message.content); // Log the generated description
        productDescriptions[productTitle] = response.choices[0].message.content;
      } else {
        console.error(`Error: Unexpected OpenAI response format for ${productTitle}`);
        productDescriptions[productTitle] = "Error generating description.";
      }
    }

    return productDescriptions;
  };

  const productDescriptions = await generateProductDescriptions(products);

  console.log("Final Generated Descriptions:", productDescriptions); // Log all the generated descriptions

  return json({ productDescriptions });
};
