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
