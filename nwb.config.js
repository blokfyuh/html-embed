module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'WidgetBotHtmlEmbed',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    extra: {
      entry: './src/umd.ts',
      resolve: {
        extensions: ['.ts'],
      },
      module: {
        rules: [{test: /\.ts$/, loader: 'ts-loader'}],
      },
    },
  },
}