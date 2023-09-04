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

const httpUrlValidatorTestInputs = [
  "http://condense.tech",
  "ftp://condense.tech",
  "http:condense.tech",
  "http//condense.tech",
  "http:/condense.tech",
  "http://asdadajksdad.1231239-asdasd",
  "http://asdadajksdad.1231239-asdasd.1231239-asdas.1231239-asdas.1231239-asdasddd.1231239-asdasd",
  "http://asdada---jksdad.1231239-asdasd",
  "http://asdasd   asdasdad",
  "http://cond,com",
];

function urlValidator(url: string): boolean {
  const urlRegex = /^(https?:\/\/)([A-Za-z0-9-/])+(\.[A-Za-z0-9-/])+/;
  return urlRegex.test(url);
}

for (const testInput of httpUrlValidatorTestInputs) {
  console.log(
    `[URL VALIDATOR TEST RESULT] ::: Test Input: [${testInput}], Test Passed: ${urlValidator(
      testInput
    )}\n\n`
  );
}

const phoneNumberExtractorTestInputs = [
  ["My phone number is (039) 02-121212 ", ["(039) 02-121212"]],
  [
    "None of my 32 friends has a phone. One of them gave me the number 123-123123 but it isn't valid ",
    [],
  ],
  [
    "Phone numbers cannot have letters. Numbers like (800) STAR-121212 are not valid ",
    [],
  ],
  [
    "Every country has its own rules for phone numbers. Even a number like (1) 1-2 can be a valid phone number",
    ["(1) 1-2"],
  ],
] as const;

function arrayCompare<T>(
  arr1: T[],
  arr2: T[],
  equalFn: (left: T, right: T) => boolean = (left, right) => left === right
): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.reduce((acc, value, index) => {
      return acc && equalFn(value, arr2[index]);
    }, true)
  );
}

function phoneNumberExtractor(input: string): string[] {
  const phoneNumberRegex = /\(\d+\)\s\d+-\d+/g;
  return phoneNumberRegex.exec(input) ?? [];
}

for (const [testInput, testExpectation] of phoneNumberExtractorTestInputs) {
  const testResult = phoneNumberExtractor(testInput);
  console.log(
    `[PHONE NUMBER EXTRACTOR TEST RESULT] ::: Test Input: [${testInput}], Test Result : [${testResult}], Test Passed: ${arrayCompare(
      testResult,
      testExpectation as unknown as string[]
    )}\n\n`
  );
}
