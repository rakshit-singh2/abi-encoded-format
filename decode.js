const { AbiCoder } = require("ethers");
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user for input
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const main = async () => {
  try {
    // Get ABI-encoded data from user
    const encodedData = await askQuestion("Enter ABI-encoded data (hex string): ");
    
    // Get the number of arguments
    const numArgs = parseInt(await askQuestion("Enter number of arguments: "), 10);

    // Get the argument types
    const types = [];
    for (let i = 0; i < numArgs; i++) {
      const type = await askQuestion(`Enter type of argument ${i + 1} (e.g., address, uint256): `);
      types.push(type);
    }

    // ABI decode
    const abiCoder = new AbiCoder();
    const decodedArgs = abiCoder.decode(types, `0x${encodedData}`);

    console.log("Decoded Arguments:", decodedArgs);
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    rl.close();
  }
};

// Run the main function
main();
