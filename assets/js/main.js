
const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
const navBar = document.querySelector('.navbar');
const btnCart = document.querySelector('#cart');
const hiddenClass = 'hidden';

let cartCounter = 0;
let cartPrice = 0;
let priceDevice = 0;
let numberDevice = 0;

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
  priceDevice = getMockData(t);
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

const getNumberDevice = (t) => {
  return t.parentElement.parentElement.firstElementChild.innerHTML.match(/^\#(\d+)+/gi);
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
}

contentContainer.addEventListener('click', btnClickHandler);

const createElem = ({
  type,
  attrs, 
  container = null, 
  evt = null, 
  handler = null, 
  position = 'append'
}) => {
 const el = document.createElement(type);
  
  Object.keys(attrs).forEach((key) => {

   if(key !== 'innerHTML') el.setAttribute(key, attrs[key]);
   else el.innerHTML = attrs[key];
  })
  
  if(container && position === 'append') container.append(el);
  if(container && position === 'prepend') container.prepend(el);
  
  return el
};

const createBasket = () => {

   createElem({
    type: 'div',
    attrs: {
      class: `${hiddenClass} basket`,
      id: 'basket'
    },
    container: btnCart
   })
   
};

const btnClickCart = () => {
  const basket = document.querySelector('#basket');
  basket.classList.toggle(hiddenClass);
  sumPrise = cartPrice;
  basket.matches('.hidden')? clearBasket() : createCounterBasket();

};

const clearBasket = () => {
  document.querySelector('.totalSum').remove();
  document.querySelector('.priseBasket').remove();
  document.querySelector('.titleBasket').remove();
}

const createCounterBasket = () => {

  createElem({
    type: 'p',
    attrs: {
      class: 'titleBasket',
      innerHTML: `В корзине ${cartCounter} товаров`,
    },
    container: basket,
    position: 'prepend' 
  })

  createElem({
    type: 'div',
    attrs: {
      class: 'priseBasket',
      innerHTML: `${numberDevice} Device Name цена ${priceDevice}$ сумма: `,
    },
    container: basket,  
  });

  createElem({
    type: 'div',
    attrs: {
      class: 'totalSum',
      innerHTML: `Всего в корзине товаров на сумму ${cartPrice.toFixed(2)}$`,
    },
    container: basket,
  });

};

const createBasketBtn = () => {

  const btnContainer = createElem({
    type: 'div',
    attrs: {class: 'btnContainer'},
    container: basket,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketBuy btn-primery',
      type: 'button',
      innerHTML: 'Продолжить покупки',
    },
    container: btnContainer,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketCleenCart btn-primery',
      type: 'submit',
      innerHTML: 'Очистить корзину',
    },
    container: btnContainer,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketCleenCart btn-primery',
      type: 'button',
      innerHTML: 'Оформить заказ',
    },
    container: btnContainer,
  });
};

const createStyle = () => {
  createElem({
    type: 'style',
    attrs: {
    innerHTML: `
      .hidden {
        display: none;
      }
      
      .basket {
        position: absolute;
        padding: 10px;
        right: 0;
        top: 80px;
        width: 300px;
        min-height: 200px;
        background: skyblue;
        z-index: 5;
      }
      
      .titleBasket {
        padding: 10px;
        display: flex;
        justify-content: center;
        font-size: 14px;
      }
      
      .btnContainer {
        position: absolute;
        display: flex;
        gap: 5px;
        font-size: 12px;
        padding: 10px;
        bottom: 0;
        left: 0;
      }
      
      .btn-primery {
        color: #fff3cd;
        background: #0056b3;
        border-radius: 7px;
        border: 1px solid #fff3cd;
      }`
    },
    container: document.head       
  })
}

const init = () => {
  createBasket();
  createBasketBtn();
  createStyle();
}

init();

btnCart.addEventListener('click', btnClickCart);




