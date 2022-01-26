const readline = require("readline");

exports.prompt = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(function (resolve, reject) {
    rl.question(question, function (answer) {
      rl.close();
      resolve(answer.trim());
    });
  });
};
