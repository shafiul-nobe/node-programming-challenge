const fs = require("fs");
const bytes = require("bytes");
var File_Size = 1048571 * 2;

const isAlphaNumeric = (item) => {
  const regex = /^[a-z0-9]+$/i;
  return item.match(regex) ? true : false;
};

const isInteger = (item) => {
  return Number.isInteger(Number(item));
};

const isRealNumber = (item) => {
  return !isNaN(item) && !isNaN(parseFloat(item));
};

const isAlphabeticalString = (item) => {
  const regex = /^[A-Za-z]+$/;
  return item.match(regex) ? true : false;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const getRandomRealNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  var fixedDecimal = getRandomInt(0, 18);
  return (Math.random() * (max - min + 1) + min)
    .toFixed(fixedDecimal)
    .toString();
};

const randomRealNumberGenerator = (size) => {
  var realNumber = getRandomRealNumber(-2147483648, 2147483648);
  return realNumber;
};

const randomIntegerGenerator = (size) => {
  return getRandomInt(-2147483648, 2147483648);
};

const randomAlphabeticStringGenerator = (size) => {
  var allAlphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomAlphabeticString = "";
  for (let i = 0; i < size / 2; i++) {
    randomAlphabeticString +=
      allAlphabets[Math.floor(Math.random() * allAlphabets.length)];
  }
  return randomAlphabeticString;
};

const randomAlphanumericGenerator = (size) => {
  var allAlphabets =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomAlphanumericString = "";
  for (let i = 0; i < size / 2; i++) {
    randomAlphanumericString +=
      allAlphabets[Math.floor(Math.random() * allAlphabets.length)];
  }
  return randomAlphanumericString;
};

const generateRandomOutputType = (size) => {
  var randomFunction = getRandomInt(0, 3);
  if (randomFunction == 0) {
    return randomAlphabeticStringGenerator(size);
  } else if (randomFunction == 1) {
    return randomRealNumberGenerator(size);
  } else if (randomFunction == 2) {
    return randomIntegerGenerator(size);
  } else {
    return randomAlphanumericGenerator(size);
  }
};

const generateFiles = () => {
  return new Promise((resolve, reject) => {
    var output = "";
    console.log("Generating output file of size " + bytes(File_Size));
    while (output.length < File_Size) {
      var size = getRandomInt(0, 100);
      var diff = File_Size - output.toString().length;
      if (diff == 0) {
        return;
      }
      size = size < diff ? size : diff;
      var randomValue = generateRandomOutputType(size);
      output = output + randomValue + ",";
    }
    console.log("Final output size is:", bytes(output.toString().length));
    resolve(output);
  });
};

exports.generateFile = (req, res, next) => {
  generateFiles().then((output) => {
    fs.writeFileSync("../outputs/output.txt", output);
    res.status(200).json({
      posts: { title : "generated" },
    });
  });
};

exports.downloadFile = (req, res, next) => {
  res.download("../outputs/output.txt", "output.txt");
  res.status(200);
};

exports.getReport = (req, res, next) => {
  generateReport().then((result) => {
    res.status(200).json({
      report: result,
    });
  });
};

const generateReport = () => {
  var report = {
    alphaNumericCount: 0,
    intCount: 0,
    alphabeticalCount: 0,
    realNumberCount: 0,
  };

  return new Promise((resolve, reject) => {
    fs.readFile("../outputs/output.txt", "utf8", (err, data) => {
      var outputString = data.toString();
      var outputArray = outputString.split(",");
      outputArray.forEach((item) => {
        if (isAlphaNumeric(item)) {
          report.alphaNumericCount++;
        }
        if (isAlphabeticalString(item)) {
          report.alphabeticalCount++;
        }
        if (isInteger(item)) {
          report.intCount++;
        }
        if (isRealNumber(item)) {
          report.realNumberCount++;
        }
      });
      resolve(report);
    });
  });
};
