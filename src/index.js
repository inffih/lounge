import React from 'react';
import { render } from 'react-dom';
import App from './js/components/App';
import RedditStore from './js/stores/RedditStore'
import YoutubeStore from './js/stores/YoutubeStore'
import UiStore from './js/stores/UiStore'
import LinkStore from './js/stores/LinkStore'

const redditStore = new RedditStore();
const youtubeStore = new YoutubeStore();
const uiStore = new UiStore();
const linkStore = new LinkStore();

render(
  <App
    uiStore={uiStore}
    redditStore={redditStore}
    youtubeStore={youtubeStore}
    linkStore={linkStore}
  />,
  document.getElementById('root')
)
