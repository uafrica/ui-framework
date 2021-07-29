import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    scss({
      processor: () => postcss([autoprefixer()]),
      outputStyle: "compressed"
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true
    }),
    commonjs({
      include: ["node_modules/**"],
      namedExports: {
        // This is needed because `react/jsx-runtime` exports `jsx` on the module export.
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "cloneElement",
          "Fragment",
          "isValidElement",
          "forwardRef",
          "useLayoutEffect",
          "useEffect",
          "useState",
          "createContext",
          "useContext",
          "useRef",
          "useCallback",
          "useMemo",
          "useReducer",
          "createRef"
        ],
        "node_modules/react-is/index.js": ["isValidElementType"],
        "node_modules/react-dom/index.js": ["render", "createPortal"],
        "react/jsx-runtime": ["jsx", "jsxs", "Fragment"],
        "react/jsx-dev-runtime": ["jsx", "jsxs", "jsxDEV"]
      }
    })
  ]
};
