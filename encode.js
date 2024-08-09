const { ethers, AbiCoder } = require("ethers");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    // Get the number of arguments
    const numArgs = parseInt(await askQuestion("Enter the number of arguments: "), 10);

    // Arrays to hold the types and values
    const types = [];
    const values = [];

    // Get the argument types and values
    for (let i = 0; i < numArgs; i++) {
      const type = await askQuestion(`Enter type of argument ${i + 1} (e.g., address, uint256): `);
      const value = await askQuestion(`Enter value of argument ${i + 1}: `);

      types.push(type);
      values.push(value);
    }
    clg
    // ABI encode the arguments
    const abiCoder = new AbiCoder();
    const encodedArgs = abiCoder.encode(types, values);

    // Output the result
    console.log("ABI-encoded Constructor Arguments:", encodedArgs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    rl.close();
  }
}

main();
