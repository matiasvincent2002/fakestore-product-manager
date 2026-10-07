
const [method, resource, ...data] = process.argv.slice(2);
const API_URL = "https://fakestoreapi.com";

function getProductId(resource) {
  const [collection, productId, extraSegment] = resource.split("/");

  if (collection !== "products" || extraSegment !== undefined) {
    throw new Error("El recurso debe ser products o products/<productId>.");
  }

  if (productId === undefined) {
    return undefined;
  }

  if (
    !productId ||
    !Number.isInteger(Number(productId)) ||
    Number(productId) < 1
  ) {
    throw new Error("El ID del producto debe ser un número entero positivo.");
  }

  return productId;
}

async function getProducts(resource) {
  const productId = getProductId(resource);
  const endpoint = productId ? `/products/${productId}` : "/products";
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  const products = await response.json();
  console.log(products);
}

async function createProduct(resource, data) {
  if (resource !== "products" || data.length !== 3) {
    throw new Error("Uso: POST products <title> <price> <category>.");
  }

  const [title, priceArgument, category] = data;
  const price = Number(priceArgument);

  if (
    !title.trim() ||
    !priceArgument.trim() ||
    !category.trim() ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    throw new Error("El título, el precio y la categoría deben ser válidos.");
  }

  const productData = {
    title,
    price,
    category,
  };

  // Uso del spread operator para construir el objeto enviado a la API.
  const productToSend = {
    ...productData,
  };

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productToSend),
  });

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  const product = await response.json();
  console.log(product);
}

async function deleteProduct(resource) {
  const productId = getProductId(resource);

  if (!productId) {
    throw new Error("DELETE requiere un recurso products/<productId>.");
  }

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  const result = await response.json();
  console.log(result);
}

async function main() {
  if (!method || !resource) {
    console.error("Uso: npm run start -- <GET|POST|DELETE> <RESOURCE> [DATA]");
    process.exitCode = 1;
    return;
  }

  try {
    if (method === "GET") {
      if (data.length > 0) {
        throw new Error("GET no recibe argumentos adicionales.");
      }

      await getProducts(resource);
    } else if (method === "POST") {
      await createProduct(resource, data);
    } else if (method === "DELETE") {
      if (data.length > 0) {
        throw new Error("DELETE no recibe argumentos adicionales.");
      }

      await deleteProduct(resource);
    } else {
      throw new Error("Método no válido. Usa GET, POST o DELETE.");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
