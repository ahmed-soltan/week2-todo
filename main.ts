//========= First Problems ==========//
const filterNumbers = (numbers: number[]) => numbers.filter((n) => n % 2 === 0);

//========= Second Problems ==========//
const largestNumber = (numbers: number[]) => Math.max(...numbers);

//========= Third Problems ==========//
const reverseStrings = (str: string) => str.split("").reverse().join("");

//========= Fourth Problems ==========//
const removeDuplicates = (numbers: number[]) => {
    const uniqueNumbers = new Set(numbers);
    return Array.from(uniqueNumbers);
};
