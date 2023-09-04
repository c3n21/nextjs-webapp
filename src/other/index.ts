// Write a TypeScript function called transformArray that uses advanced generics to take an array of values and a callback function. The callback function should have a type parameter that matches the input array's type, and it should return a value of the same type. The transformArray function should iterate through the input array, apply the callback function to each element, and replace the original element with the result. Test the function with various data types and callback functions.
function immutableTransformArray<T>(array: T[], callback: (arg: T) => T) {
  // in case we want a new array
  return array.map(callback);
}

function mutableTransformArray<T>(array: T[], callback: (arg: T) => T) {
  // in case we want to mutate the original array
  for (let i = 0; i < array.length; i++) {
    array[i] = callback(array[i]);
  }
  return array;
}

const testInputs = [
  [[1, 2, 3, 4, 5], (num: number) => num * 2, [2, 4, 6, 8, 10]],
  [
    ["apple", "banana", "cherry"],
    (str: string) => str.toUpperCase(),
    ["APPLE", "BANANA", "CHERRY"],
  ],
] as const;

for (const [testInput, testCallback, testExpectations] of testInputs) {
  // @ts-expect-error - this is a test
  const immutableTestResult = immutableTransformArray(testInput, testCallback);
  console.log(
    `[IMMUTABLE TEST RESULT] ::: Test Input: [${testInput}], Immutable Test Result [${immutableTestResult}], Expectations: [${testExpectations}], Test Passed: ${immutableTestResult.reduce(
      (acc, value, index) => {
        return acc || value === testExpectations[index];
      },
      false
      // @ts-expect-error - object reference comparison is intentional
    )}, Has mutated original input: ${testInput === immutableTestResult}`
  );

  // @ts-expect-error - this is a test
  const mutableTestResult = mutableTransformArray(testInput, testCallback);
  console.log(
    `[MUTABLE TEST RESULT] ::: Test Input: [${testInput}], Mutable Test Result [${mutableTestResult}], Expectations: [${testExpectations}], Test Passed: ${mutableTestResult.reduce(
      (acc, value, index) => {
        return acc || value === testExpectations[index];
      },
      false
      // @ts-expect-error - object reference comparison is intentional
    )}, Has mutated original input: ${testInput === mutableTestResult}\n\n`
  );
}

/**
 *
 * Union and Intersection Types
 *
 * Define TypeScript types for products and their variations. Create a type for
 * the base product, then use advanced union and intersection types to accurately
 * represent variations based on size, color, and material. Each variation should
 * include properties specific to that variation type, while the product should
 * have common properties like name, price, and description. Here's a starting point for your code:
 *
 */
const product = {
  name: "T-Shirt",
  price: 29.99,
  description: "A comfortable and stylish T-shirt.",
};

type Product = typeof product;

type SizeVariationProduct = Product & {
  variationType: "size";
  size: "S" | "M" | "L" | "XL";
};

type ColorVariationProduct = Product & {
  variationType: "color";
  color: "red" | "blue" | "green";
};

type MaterialVariationProduct = Product & {
  variationType: "material";
  material: "cotton" | "polyester" | "wool";
};

type ProductVariation =
  | SizeVariationProduct
  | ColorVariationProduct
  | MaterialVariationProduct;

const sizeVariation: SizeVariationProduct = {
  name: "T-Shirt",
  price: 34.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "size",
  size: "L",
};

const colorVariation: ColorVariationProduct = {
  name: "T-Shirt",
  price: 39.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "color",
  color: "blue",
};

const materialVariation: MaterialVariationProduct = {
  name: "T-Shirt",
  price: 44.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "material",
  material: "cotton",
};

const wrongProductVariation: ProductVariation = {
  name: "T-Shirt",
  price: 49.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "material",
  // @ts-expect-error - wrong variation type
  color: "green",
};

const correctProductVariation: ProductVariation = {
  name: "T-Shirt",
  price: 49.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "color",
  color: "green",
};

/**
 *
 * Type Guards
 *
 * You have a function extractCategoryName that can either return a string or
 * null depending on the input type. Write the type guards isProduct and  isString.
 */
interface Category {
  name: string;
}

// had to rename it to NewProduct because of the error:
// "Duplicate identifier 'Product'
// interface Product {
interface NewProduct {
  category: Category;
}

function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}

function isCategory(arg: unknown): arg is Category {
  return !!(
    arg &&
    typeof arg === "object" &&
    "name" in arg &&
    typeof arg.name === "string"
  );
}

function isProduct(arg: unknown): arg is NewProduct {
  return !!(
    arg &&
    typeof arg === "object" &&
    "category" in arg &&
    isCategory(arg.category)
  );
}

function processData(input: Category | string | null): string | null {
  if (isCategory(input)) {
    return input.name;
  } else if (isString(input)) {
    return input;
  }
  return null;
}
