//========= First Problems ==========//
var filterNumbers = function (numbers) { return numbers.filter(function (n) { return n % 2 === 0; }); };
//========= Second Problems ==========//
var largestNumber = function (numbers) { return Math.max.apply(Math, numbers); };
//========= Third Problems ==========//
var reverseStrings = function (str) { return str.split("").reverse().join(""); };
//========= Fourth Problems ==========//
var removeDuplicates = function (numbers) {
    var uniqueNumbers = new Set(numbers);
    return Array.from(uniqueNumbers);
};
