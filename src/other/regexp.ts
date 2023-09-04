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

const anchorTagContentExtractorTestInputs = [
  ['<a href="https://example.com">Visit Example</a>', "Visit Example"],
  ['<a href="https://example.com"></a>', ""],
  ['<a href="https://example.com"</a>', undefined],
  ["", undefined],
] as const;

/**
 * If `undefined` is returned it means that the input string has not a valid anchor tag
 */
function anchorTagContentExtractor(input: string) {
  const anchorTagContentRegex = /<a.*>(.*)<\/a>/;
  return anchorTagContentRegex.exec(input)?.[1];
}

for (const [
  testInput,
  testExpectation,
] of anchorTagContentExtractorTestInputs) {
  const testResult = anchorTagContentExtractor(testInput);
  console.log(
    `[ANCHOR TAG CONTENT EXTRACTOR TEST RESULT] ::: Test Input: [${testInput}], Test Result : [${testResult}], Test Passed: ${
      testResult === testExpectation
    }\n\n`
  );
}
