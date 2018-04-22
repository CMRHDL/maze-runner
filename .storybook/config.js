import { configure } from '@storybook/react';

function loadStories() {
  require('../src/Components/Tile/stories.js');
  require('../src/Components/Maze/stories.js');
  require('../src/Components/Button/stories.js');
  require('../src/Components/Slider/stories.js');
  require('../src/Container/Control/stories.js');
}

configure(loadStories, module);
