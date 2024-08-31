const fs = require("fs");
const path = require("path");

// Get the environment argument, default to 'development'
const env = process.argv[2] || "development";
console.log('@@@', process.argv)
// Define the source and destination file paths
const sourceIndex = path.join(__dirname, "public", `${env}.html`);
const destIndex = path.join(__dirname, "public", "index.html");
// Copy the source file to the destination
fs.copyFileSync(sourceIndex, destIndex);
console.log(`Copied ${sourceIndex} to ${destIndex}`);

const sourceManifest = path.join(__dirname, "public", `${env}.json`);
const destManifest = path.join(__dirname, "public", "manifest.json");
fs.copyFileSync(sourceManifest, destManifest);
console.log(`Copied ${sourceManifest} to ${destManifest}`);
