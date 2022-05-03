const apiKey = ""
const jokesApi = 'https://api.jokes.one'
const uri = '/jod'

const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  buttonElement.disabled = !buttonElement.disabled;
}


function tellJoke(textToSpeech = "Hello, I'm a Robot") {
  VoiceRSS.speech({
    key: apiKey,
    src: textToSpeech,
    hl: 'en-us',
    v: 'Mike',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

async function getJoke() {
  try {
    toggleButton();
    const response = await fetch(`${jokesApi}${uri}`)
    const data = await response.json()
    const textToSpeech = data.contents.jokes[0].joke.text || 'No joke for you, sorry'
    tellJoke(textToSpeech)
  } catch (error) {
    console.error(error)
  }
}

function init() {
  buttonElement.addEventListener('click', getJoke);
  audioElement.addEventListener('ended', toggleButton);
}

init();