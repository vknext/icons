const { generateIcons } = require('@vkontakte/icons-scripts');

generateIcons({
  srcDirectory: './src',
  distDirectory: './dist',
  extraCategories: ['38h', '100', '106', '120', '126', '300', 'Onboarding', 'Unsorted'],
});
