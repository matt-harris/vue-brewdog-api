module.exports = {
  // Remove data-test attributes from production build.
  // https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138/9
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
