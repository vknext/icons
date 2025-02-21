const { generateIcons } = require('@vkontakte/icons-scripts');

generateIcons({
  srcDirectory: './src',
  distDirectory: './dist',
  extraCategories: ['100', '106', '120', '126', '300', 'Unsorted'],
});
