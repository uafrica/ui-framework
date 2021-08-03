const findWebpackPlugin = (webpackConfig, pluginName) =>
  webpackConfig.resolve.plugins.find(
    ({ constructor }) => constructor && constructor.name === pluginName
  );

const enableTypescriptImportsFromExternalPaths = (webpackConfig, newIncludePaths) => {
  const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
  if (oneOfRule) {
    const rule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes("tsx"));

    if (rule) {
      rule.include = Array.isArray(rule.include)
        ? [...rule.include, ...newIncludePaths]
        : [rule.include, ...newIncludePaths];
    }
  }
};

// const enableSassImportsFromExternalPaths = (webpackConfig, newIncludePaths) => {
//   const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
//   if (oneOfRule) {
//     const rule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes("scss"));

//     if (rule) {
//       rule.include = Array.isArray(rule.include)
//         ? [...rule.include, ...newIncludePaths]
//         : [rule.include, ...newIncludePaths];
//     }
//   }
// };

const addPathsToModuleScopePlugin = (webpackConfig, paths) => {
  const moduleScopePlugin = findWebpackPlugin(webpackConfig, "ModuleScopePlugin");
  if (!moduleScopePlugin) {
    throw new Error(`Expected to find plugin "ModuleScopePlugin", but didn't.`);
  }
  moduleScopePlugin.appSrcs = [...moduleScopePlugin.appSrcs, ...paths];
};

const enableImportsFromExternalPaths = (webpackConfig, paths) => {
  enableTypescriptImportsFromExternalPaths(webpackConfig, paths);
  //   enableSassImportsFromExternalPaths(webpackConfig, paths);
  addPathsToModuleScopePlugin(webpackConfig, paths);
};

module.exports = enableImportsFromExternalPaths;
