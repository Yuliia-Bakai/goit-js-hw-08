import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage.getItem(STORAGE_KEY))
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));

player.on('timeupdate', throttle(onPlayTimeUpdate, 1000));

function onPlayTimeUpdate(time) {
  localStorage.setItem(STORAGE_KEY, time.seconds);
}
