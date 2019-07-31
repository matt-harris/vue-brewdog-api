module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions.modules = [
          {
            preTransformNode(astEl) {
              if (process.env.NODE_ENV === 'production') {
                const { attrsMap, attrsList } = astEl;
                if (attrsMap['data-test']) {
                  delete attrsMap['data-test'];
                  const index = attrsList.findIndex(
                    (x) => x.name === 'data-test',
                  );
                  attrsList.splice(index, 1);
                }
              }
              return astEl;
            },
          },
        ];
        return options;
      });
  },
};
