module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ["nativewind/babel"],
      ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
    ],
  };
};
