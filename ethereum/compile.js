const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const compaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(compaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

// check if dir exits or not, if not create one
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
