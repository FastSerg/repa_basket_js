const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
const navBar = document.querySelector('.navbar');
const btnCart = document.querySelector('#cart');
// console.log(btnCart)
let sumPrise = 0;
let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;
  cartCounter++
    cartCounterLabel.innerHTML = `${counter}`;

    if(cartCounter === 1) {
      cartCounterLabel.style.display = 'block';
    }
  return counter;

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

contentContainer.addEventListener('click', btnClickHandler);

const hiddenClass = 'hidden';
let triger = false;
const createBasket = () => {
  const divCart = document.createElement('div');

  divCart.setAttribute('class', `${hiddenClass} basket`);
  divCart.setAttribute('id','basket');

  navBar.append(divCart);
};

createBasket();
const btnClickCart = () => {
  
  const basket = document.querySelector('#basket');
  console.log(basket);
  basket.classList.toggle(hiddenClass);
  // if(!triger) {
  //   createCounterBasket();
  //   triger = true;
  // }

};
// totalSum.innerHTML = `Всего в корзине товаров на сумму ${sumPrise}$`;
// divPriseBasket.innerHTML = `#2 Device Name цена ${cartPrice}$ сумма: `;
// titleBasket.innerHTML = `В корзине ${cartCounter} товаров`;

const createCounterBasket = () => {
  sumPrise = cartPrice + sumPrise;
  const titleBasket = document.createElement('p');
  titleBasket.setAttribute('class', 'titleBasket');
  titleBasket.innerHTML = `В корзине ${cartCounter} товаров`;
  const basket = document.querySelector('#basket');
  basket.prepend(titleBasket);

  const divPriseBasket = document.createElement('div');
  divPriseBasket.setAttribute('class', 'priseBasket');
  divPriseBasket.innerHTML = `#2 Device Name цена ${cartPrice}$ сумма: `;
  basket.append(divPriseBasket);

  const totalSum = document.createElement('div');
  totalSum.setAttribute('class', 'totalSum');
  totalSum.innerHTML = `Всего в корзине товаров на сумму ${sumPrise}$`;
  basket.append(totalSum);

  const btnContainer = document.createElement('div');
  btnContainer.setAttribute('class', 'btnContainer');
  basket.append(btnContainer);

  const btnBasketBuy = document.createElement('button');
  btnBasketBuy.setAttribute('class', 'btnBasketBuy btn-primery');
  btnBasketBuy.setAttribute('type', 'button');
  btnBasketBuy.innerHTML = 'Продолжить покупки';
  btnContainer.append(btnBasketBuy);

  const btnBasketCleenCart= document.createElement('button');
  btnBasketCleenCart.setAttribute('class', 'btnBasketCleenCart btn-primery');
  btnBasketCleenCart.setAttribute('type', 'submit');
  btnBasketCleenCart.innerHTML = 'Очистить корзину';
  btnContainer.append(btnBasketCleenCart);


  const btnBasketDesign = document.createElement('button');
  btnBasketDesign.setAttribute('class', 'btnBasketCleenCart btn-primery');
  btnBasketDesign.setAttribute('type', 'button');
  btnBasketDesign.innerHTML = 'Оформить заказ';
  btnContainer.append(btnBasketDesign);

};

createCounterBasket();

btnCart.addEventListener('click', btnClickCart);
