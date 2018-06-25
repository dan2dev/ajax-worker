import {
  terser
} from "rollup-plugin-terser";

export default [{
  input: 'lib/main.js',
  output: {
    file: 'dist/ajax-worker.js',
    format: 'cjs'
  },
  plugins: []
}, {
  input: 'lib/main.js',
  output: {
    file: 'dist/ajax-worker.min.js',
    format: 'cjs'
  },
  plugins: [terser()]
}];
