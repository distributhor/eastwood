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
    input: "src/browser.ts",
    output: {
      file: "dist/wild-west.js",
      name: "WildWest",
      format: "iife",
    },
  },
];
