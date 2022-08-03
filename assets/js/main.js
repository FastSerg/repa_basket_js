import {
  createBasket,
  btnCart,
  createBasketBtn, 
  createStyle,
  btnClickCart,
} from './basket.js';

const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

export let numberDevice = 0;
export let cartCounter = 0;
export let cartPrice = 0;
export let priceDevice = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;
  cartCounter++
    cartCounterLabel.innerHTML = `${counter}`;

    if(cartCounter === 1) {
      cartCounterLabel.style.display = 'block';
    }
  return counter;

};

const getMockData = (t) => {
  return +t.parentElement.previousElementSibling.innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

};

const getPrice = (t, price) => {
  priceDevice = getMockData(t);
  return Math.round((price + getMockData(t))*100) / 100;

};

const enableControls = (t, el, fn) => {
  t.disabled = true;
  el.removeEventListener('click', fn)
};

const disableControls = (t, el, fn) => {
  t.disabled = false;
  el.addEventListener('click', fn)
};

const getNumberDevice = (t) => {
  return t.parentElement.parentElement.firstElementChild.innerHTML.match(/^\#(\d+)+/gi);
};

const btnClickHandler = (e) => {
  const t = e.target;
  const interval = 2000;
  let restore = null;
  if(typeof t !== 'object') {
    console.error('no object')
    return;
  }

  if(t.matches('.item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);
    numberDevice = getNumberDevice(t);
    const mock = getMockData(t);

    if(isNaN(mock)) {
      console.error('no number');
      return;
    }
    restore = t.innerHTML;
    cartPrice = getPrice(t, cartPrice);
    t.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    enableControls(t, contentContainer, btnClickHandler);
    setTimeout(() => {
      
      t.innerHTML = restore;
      disableControls(t, contentContainer, btnClickHandler);

    }, interval)
  }
};

export const init = () => {
  createBasket();
  createBasketBtn();
  createStyle();
  
  contentContainer.addEventListener('click', btnClickHandler);
  btnCart.addEventListener('click', btnClickCart);
};







