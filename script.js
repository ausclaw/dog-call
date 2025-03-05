// array of dog names
const names = [
    'max',
    'lucy',
    'toby',
    'rufus',
    'bailey',
    'apollo',
    'boomer',
    'jake',
    'daisy',
    'mortimer',
    'quincy',
    'charlie',
    'bella',
    'luna',
    'stella',
    'archer',
    'basil',
    'diesel',
    'jasper',
    'biscuit',
    'teddy',
    'mikey',
    'pudding',
    'ginger',
    'lucky',
    'godzilla',
    'mocha',
    'cherry',
    'cocoa',
    'pepper',
    'latte',
    'lolly',
    'vegeta',
];

// array of dog pictures

const dogpictures = [
  'dogpics/dog1.png',
  'dogpics/dog2.png',
  'dogpics/dog3.png',
  'dogpics/dog4.png',
  'dogpics/dog5.png',
  'dogpics/dog6.png',
  'dogpics/dog7.png',
  'dogpics/dog8.png',
]

// dog audio

const dogSound = new Audio('audio/dog_bark.mp3');

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now();

// page elements
const nameElement = document.getElementById('name');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const pictureElement = document.getElementById('dogpictures');

document.getElementById('start').addEventListener('click', () => {
  // get dog name
  const nameIndex = Math.floor(Math.random() * names.length);
  const name = names[nameIndex];
  
  // Put the name into an array of words
  words = name.split(' ');
  
  // reset the word index for tracking
  wordIndex = 0;

  // ui updates
  //array of span elements for setting a class
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  
  // convert into string and set as innerHTML on name display
  nameElement.innerHTML = spanWords.join('');
  
  
  // clear prior messages
  messageElement.innerText = '';


  // clear the textbox
  typedValueElement.value = '';
  
  // clear the image
  pictureElement.innerHTML = '';
 
  

});


typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
    
      // success
      const elapsedTime = new Date().getTime() - startTime;
      const message = `good dog!`;
      messageElement.innerText = message;

      // dog photos to appear

      
      const pictureIndex = Math.floor(Math.random() * dogpictures.length);
      const picture = dogpictures[pictureIndex];
      const imgElement = document.createElement('img');
      imgElement.src = picture;
      imgElement.style.width = '400px'; 
      imgElement.style.margin = '5px';
  
  // clear previous image and append the new one
  pictureElement.innerHTML = ''; // Remove previous image
  pictureElement.appendChild(imgElement); // Add new image
  dogSound.play();

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
    
      // move to the next word
      wordIndex++;
    
      // reset the class name for all elements in name
      for (const wordElement of nameElement.childNodes) {
        wordElement.className = '';
      }
    
      // highlight the new word
      nameElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });