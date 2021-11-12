module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const opts = state.opts;
        if (Object.keys(opts).length === 0) return;
        const { rules, debug } = state.opts;
        const old = path.node.source.value;
        rules.forEach((opt) => {
          const { match, replacement } = opt;
          // 字符串替换
          if (typeof match === 'string') {
            if (
              path.node.source.value.includes(match) &&
              !path.node.source.value.includes(replacement)
            ) {
              path.node.source.value = path.node.source.value.replace(
                match,
                replacement
              );
            }
          } else if (match instanceof RegExp) {
            if (match.test(path.node.source.value)) {
              // 正则-字符串替换
              if (typeof replacement === 'string') {
                path.node.source.value = path.node.source.value.replace(
                  match,
                  replacement
                );
              } else if (typeof replacement === 'function') {
                // 正则-方法替换
                path.node.source.value =
                  replacement(path.node.source.value) || path.node.source.value;
              }
            }
          }
          const current = path.node.source.value;
          // 打印日志
          if (debug && old != current)
            console.log(`import-replace: ${old} --> ${current}`);
        });
      },
    },
  };
};
