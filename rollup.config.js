const babel = require("rollup-plugin-babel");
const pkg = require("./package");

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/collect.common.js",
      format: "cjs"
    },
    {
      file: "dist/collect.esm.js",
      format: "es"
    }
  ],
  name: "collect",
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};
