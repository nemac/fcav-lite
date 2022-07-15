import light from './light';
import dark from './dark';

const themes = {
  light,
  dark
};

const getTheme = (theme) => themes[theme];

export default getTheme;
