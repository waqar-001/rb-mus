


// This is Code is Final it work properly 

import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { OpenAI } from "openai";
import { useLoaderData } from "@remix-run/react"; // Import useLoaderData

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

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

  try {
    // Log the full response to understand its structure
    console.log("Full Shopify Response:", JSON.stringify(response, null, 2));

    if (!response.ok) {
          throw new Error("Unexpected response structure");
        }
      
    const { data } = await response.json();
    const products = data.products.edges.map((p) => p.node.title);
    console.log("Fetched Products:", products);

//--------------------------------------------------------------------------

    // AI -- COde 
//--------------------------------------------------

    // Initialize OpenAI with the API key from the environment variable
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is missing.");
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Function to generate product descriptions
    const generateProductDescriptions = async (products) => {
      const productDescriptions = {};

      for (const productTitle of products) {
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are an expert product copywriter.",
              },
              {
                role: "user",
                content: `For the product "${productTitle}", generate a highly detailed and persuasive product description that is around 50 words long.`,
              },
            ],
          });

          if (response.choices && response.choices.length > 0) {
            productDescriptions[productTitle] = response.choices[0].message.content;
          } else {
            throw new Error("Unexpected OpenAI response format.");
          }
        } catch (error) {
          console.error(`Error generating description for ${productTitle}:`, error);
          productDescriptions[productTitle] = "Error generating description.";
        }
      }

      return productDescriptions;
    };

    // Generate descriptions for the products
    const productDescriptions = await generateProductDescriptions(products);

    console.log("Generated Product Descriptions:", productDescriptions);

    return json({ productDescriptions }); // Return the descriptions as JSON
  } catch (error) {
    console.error("Error:", error);
    return json({ error: error.message });
  }
};

