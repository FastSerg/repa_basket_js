const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
console.log(cartCounterLabel)

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;
  cartCounter++
    cartCounterLabel.innerHTML = `${counter}`;

    if(cartCounter ===1) {
      cartCounterLabel.style.display = 'block';
    }
  
  return counter

}


const getMockData = (t) => {
  return +t.parentElement.previousElementSibling.innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

}

const getPrice = (t, price) => {
  return Math.round((price + getMockData(t))*100) / 100;

}

const enableControls = (t, el, fn) => {
  t.disabled = true;
  el.removeEventListener('click', fn)
}

const disableControls = (t, el, fn) => {
  t.disabled = false;
  el.addEventListener('click', fn)
}

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
    
    const mock = getMockData(t);

    if(isNaN(mock)) {
      console.error('no number');
      return;
    }
    console.log(mock);
    restore = t.innerHTML;
    cartPrice = getPrice(t, cartPrice);
    t.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    enableControls(t, contentContainer, btnClickHandler);

    setTimeout(() => {
      
      t.innerHTML = restore;
      disableControls(t, contentContainer, btnClickHandler);

    }, interval)
  }
}

contentContainer.addEventListener('click', btnClickHandler)