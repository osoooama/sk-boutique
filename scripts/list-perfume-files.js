const fs = require("fs");
const path = require("path");

const PERFUME_SRC = "C:\\Users\\osama\\Desktop\\SK V.1\\العطور";
const files = fs.readdirSync(PERFUME_SRC).filter(f => f.match(/\.jpe?g$/i));

console.log("=== ALL PERFUME FILES ===");
files.forEach((f, i) => {
  const fullPath = path.join(PERFUME_SRC, f);
  const stats = fs.statSync(fullPath);
  console.log(`${i + 1}. "${f}" (${stats.size} bytes)`);
});
