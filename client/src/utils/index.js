import { SMPrompts } from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * SMPrompts.length);
    const randomPrompt = SMPrompts[randomIndex];


    if(randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}