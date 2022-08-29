import BlueCardsData from "./data/mythicCards/blue";
import BrownCardsData from "./data/mythicCards/brown";
import GreenCardsData from "./data/mythicCards/green";
import stages from "./stages";

const $ = require('jquery');
const _ = require('lodash');

const ancientsImages = $('.ancient-image');
const difficultiesBtns = $('.difficulty-btn');
const shuffleBtn = $('.shuffle-btn');
const deckBtn = $('.deck-image');
const cardImage = $('.card-image');
const firstStageTracker = $('#first-stage').children();
const secondStageTracker = $('#second-stage').children();
const thirdStageTracker = $('#third-stage').children();

//массивы для хранения карт древних по цветам
let AncientGreenCards = [];
let AncientBrownCards = [];
let AncientBlueCards = [];

//массивы для хранения отсортированной по сложности колоды, имеет ссылку на исходный массив, для работы всех методов
let DifficultiesArrayGreen = GreenCardsData;
let DifficultiesArrayBrown = BrownCardsData;
let DifficultiesArrayBlue = BlueCardsData;

let ancient = null;//переменная, содержащая текущего древнего
let newStages = [];//массив, совмещающий карты со всех этапов, для их дальнейшего вытягивания из колоды

function showAncients() {
  $('.ancients-container').removeClass('hidden');
}

function showShuffleBtn() {
  $('.shuffle-container').removeClass('hidden');
}

function showDeck() {
  $('.deck-container, .stage-container').removeClass('hidden');
}

function setDifficult(event) {
  if($(event.target).is('#easy')) {
    DifficultiesArrayGreen = GreenCardsData.filter(item => item.difficulty !== 'hard');
    DifficultiesArrayBrown = BrownCardsData.filter(item => item.difficulty !== 'hard');
    DifficultiesArrayBlue = BlueCardsData.filter(item => item.difficulty !== 'hard');
  }else if($(event.target).is('#high')) {
    DifficultiesArrayGreen = GreenCardsData.filter(item => item.difficulty !== 'easy');
    DifficultiesArrayBrown = BrownCardsData.filter(item => item.difficulty !== 'easy');
    DifficultiesArrayBlue = BlueCardsData.filter(item => item.difficulty !== 'easy');
  }else if ($(event.target).is('#very-easy')) {
    DifficultiesArrayGreen = GreenCardsData.filter(item => item.difficulty === 'easy');
    DifficultiesArrayBrown = BrownCardsData.filter(item => item.difficulty === 'easy');
    DifficultiesArrayBlue = BlueCardsData.filter(item => item.difficulty === 'easy');
  }else if($(event.target).is('#very-high')) {
    DifficultiesArrayGreen = GreenCardsData.filter(item => item.difficulty === 'hard');
    DifficultiesArrayBrown = BrownCardsData.filter(item => item.difficulty === 'hard');
    DifficultiesArrayBlue = BlueCardsData.filter(item => item.difficulty === 'hard');
  }
  console.log('Зеленые карты, фильтрованные по выбранной сложности', DifficultiesArrayGreen);
  console.log('Коричневые карты, фильтрованные по выбранной сложности', DifficultiesArrayBrown);
  console.log('Синие карты, фильтрованные по выбранной сложности', DifficultiesArrayBlue);
}

function setAncientCards(event) {
  if($(event.target).is('#azathoth')){
    AncientGreenCards = _.sampleSize(DifficultiesArrayGreen, 5);
    AncientBrownCards = _.sampleSize(DifficultiesArrayBrown, 9);
    AncientBlueCards = _.sampleSize(DifficultiesArrayBlue, 2);

    ancient = 'azathoth';

  }else if($(event.target).is('#cthulthu')){
    AncientGreenCards = _.sampleSize(DifficultiesArrayGreen, 4);
    AncientBrownCards = _.sampleSize(DifficultiesArrayBrown, 9);
    AncientBlueCards = _.sampleSize(DifficultiesArrayBlue, 2);

    ancient = 'cthulthu';

  }else if($(event.target).is('#iogsothoth')){
    AncientGreenCards = _.sampleSize(DifficultiesArrayGreen, 5);
    AncientBrownCards = _.sampleSize(DifficultiesArrayBrown, 9);
    AncientBlueCards = _.sampleSize(DifficultiesArrayBlue, 2);

    ancient = 'iogsothoth';

  }else if($(event.target).is('#shubniggurath')){
    AncientGreenCards = _.sampleSize(DifficultiesArrayGreen, 6);
    AncientBrownCards = _.sampleSize(DifficultiesArrayBrown, 8);
    AncientBlueCards = _.sampleSize(DifficultiesArrayBlue, 2);

    ancient = 'shubniggurath';
  }
  console.log(`Зеленые карты для ${ancient}`, AncientGreenCards);
  console.log(`Коричневые карты для ${ancient}`, AncientBrownCards);
  console.log(`Синие карты для ${ancient}`, AncientBlueCards);
}

function getRandElem(arr,n) {
  let sortedArr, randElemArr;

  sortedArr = arr.sort(() => 0.5 - Math.random());
  randElemArr = sortedArr.slice(0,n);
  sortedArr.splice(0,n);
  return randElemArr;
}

function setStages() {
  if (ancient === 'azathoth') {
    stages.firstStage.greenCards = (getRandElem(AncientGreenCards, 1));
    stages.firstStage.brownCards = (getRandElem(AncientBrownCards, 2));
    stages.firstStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.secondStage.greenCards = (getRandElem(AncientGreenCards, 2));
    stages.secondStage.brownCards = (getRandElem(AncientBrownCards, 3));
    stages.secondStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.thirdStage.greenCards = (getRandElem(AncientGreenCards, 2));
    stages.thirdStage.brownCards = (getRandElem(AncientBrownCards, 4));
    stages.thirdStage.blueCards = (getRandElem(AncientBlueCards, 0));

  } else if (ancient === 'cthulthu') {
    stages.firstStage.greenCards = (getRandElem(AncientGreenCards, 0));
    stages.firstStage.brownCards = (getRandElem(AncientBrownCards, 2));
    stages.firstStage.blueCards = (getRandElem(AncientBlueCards, 2));

    stages.secondStage.greenCards = (getRandElem(AncientGreenCards, 1));
    stages.secondStage.brownCards = (getRandElem(AncientBrownCards, 3));
    stages.secondStage.blueCards = (getRandElem(AncientBlueCards, 0));

    stages.thirdStage.greenCards = (getRandElem(AncientGreenCards, 5));
    stages.thirdStage.brownCards = (getRandElem(AncientBrownCards, 4));
    stages.thirdStage.blueCards = (getRandElem(AncientBlueCards, 0));

  } else if (ancient === 'iogsothoth') {
    stages.firstStage.greenCards = (getRandElem(AncientGreenCards, 0));
    stages.firstStage.brownCards = (getRandElem(AncientBrownCards, 2));
    stages.firstStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.secondStage.greenCards = (getRandElem(AncientGreenCards, 2));
    stages.secondStage.brownCards = (getRandElem(AncientBrownCards, 3));
    stages.secondStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.thirdStage.greenCards = (getRandElem(AncientGreenCards, 3));
    stages.thirdStage.brownCards = (getRandElem(AncientBrownCards, 4));
    stages.thirdStage.blueCards = (getRandElem(AncientBlueCards, 0));

  } else if (ancient === 'shubniggurath') {
    stages.firstStage.greenCards = (getRandElem(AncientGreenCards, 1));
    stages.firstStage.brownCards = (getRandElem(AncientBrownCards, 2));
    stages.firstStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.secondStage.greenCards = (getRandElem(AncientGreenCards, 3));
    stages.secondStage.brownCards = (getRandElem(AncientBrownCards, 2));
    stages.secondStage.blueCards = (getRandElem(AncientBlueCards, 1));

    stages.thirdStage.greenCards = (getRandElem(AncientGreenCards, 2));
    stages.thirdStage.brownCards = (getRandElem(AncientBrownCards, 4));
    stages.thirdStage.blueCards = (getRandElem(AncientBlueCards, 0));
  }
  console.log(`Зеленые карты первого этапа для ${ancient}`, stages.firstStage.greenCards);
  console.log(`Коричневые карты первого этапа для ${ancient}`, stages.firstStage.brownCards);
  console.log(`Синие карты первого этапа для ${ancient}`, stages.firstStage.blueCards);

  console.log(`Зеленые карты второго этапа для ${ancient}`, stages.secondStage.greenCards);
  console.log(`Коричневые карты второго этапа для ${ancient}`, stages.secondStage.brownCards);
  console.log(`Синие карты второго этапа для ${ancient}`, stages.secondStage.blueCards);

  console.log(`Зеленые карты третьего этапа для ${ancient}`, stages.thirdStage.greenCards);
  console.log(`Коричневые карты третьего этапа для ${ancient}`, stages.thirdStage.brownCards);
  console.log(`Синие карты третьего этапа для ${ancient}`, stages.thirdStage.blueCards);
}

function concatArrays() {
  newStages = stages.firstStage.greenCards.concat(stages.firstStage.brownCards,stages.firstStage.blueCards,stages.secondStage.greenCards,
      stages.secondStage.brownCards,stages.secondStage.blueCards,stages.thirdStage.greenCards,stages.thirdStage.brownCards,stages.thirdStage.blueCards);
}

function showCards() {
  let Cards = newStages.shift();
  const img = new Image();
  img.src = `${Cards.cardFace}`;
  cardImage.css('background-image','url('+ img.src +')');

  if(newStages.length === 0){
    deckBtn.addClass('hidden');
  }
  console.log(Cards);
}

function setTracker() {
  firstStageTracker[0].textContent = stages.firstStage.greenCards.length;
  firstStageTracker[1].textContent = stages.firstStage.brownCards.length;
  firstStageTracker[2].textContent = stages.firstStage.blueCards.length;

  secondStageTracker[0].textContent = stages.secondStage.greenCards.length;
  secondStageTracker[1].textContent = stages.secondStage.brownCards.length;
  secondStageTracker[2].textContent = stages.secondStage.blueCards.length;

  thirdStageTracker[0].textContent = stages.thirdStage.greenCards.length;
  thirdStageTracker[1].textContent = stages.thirdStage.brownCards.length;
  thirdStageTracker[2].textContent = stages.thirdStage.blueCards.length;
}

window.addEventListener('load', () => {
  alert('Проверяющий не забудь открыть консоль!!!');
})
difficultiesBtns.on('click', showAncients);
difficultiesBtns.on('click', setDifficult);
ancientsImages.on('click', showShuffleBtn);
ancientsImages.on('click', setAncientCards);
shuffleBtn.on('click', () => {
  showDeck();
  $('.difficulty-container, .ancients-container').addClass('hidden');
});
shuffleBtn.on('click', setStages);
shuffleBtn.on('click', concatArrays);
shuffleBtn.on('click', setTracker);
deckBtn.on('click', showCards);
deckBtn.on('click', setTracker);
