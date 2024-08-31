import { Howl } from 'howler';
import music from 'src/app/assets/Music/music.mp3';
import giftSoundFile from './../app/data/audioData/activity_popup.mp3';
import popSoundFile from './../app/data/audioData/on_click_pop.mp3';

let sound = null;
const popAudioFile = new Audio(popSoundFile);
const giftAudioFile = new Audio(giftSoundFile);

export function playAudio() {
  sound = new Howl({
    src: [music],
    loop: true,
  });
  sound.play();
}

export function pauseAudio() {
  sound.pause();
}

export function resumeAudio() {
  sound.play();
}

export function setVolume(volume) {
  sound && sound.volume(volume);
}

export const popSound = () => {
  popAudioFile.play();
};

export const giftSound = () => {
  giftAudioFile.play();
};
