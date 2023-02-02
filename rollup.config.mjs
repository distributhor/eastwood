import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            outDir: "dist",
            module: "es2015",
            declaration: false,
            declarationMap: false,
          },
        },
      }),
    ],
    input: "src/index.ts",
    output: {
      file: "dist/browser.js",
      name: "eastwood",
      format: "iife",
    },
  },
];
