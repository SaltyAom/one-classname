const fs = require('fs')
const { resolve } = require('path')

fs.copyFileSync(resolve("./src/index.ts"), resolve("./libs/index.ts"))
fs.renameSync(resolve("./libs/cjs/index.js"), resolve("./libs/cjs/index.js"))
fs.renameSync(resolve("./libs/mjs/index.js"), resolve("./libs/mjs/index.js"))
