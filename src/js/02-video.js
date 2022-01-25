import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_TIME = 'videoplayer-current-time';
const localTime = localStorage.getItem(LOCAL_TIME);
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localTime) {
  player.setCurrentTime(localTime);
}

player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate(e) {
  const time = e.seconds;
  localStorage.setItem(LOCAL_TIME, time);
}
