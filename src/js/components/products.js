import _vars from '../_vars';
import GraphModal from 'graph-modal';
import Swiper from 'swiper';

const catalogeList = document.querySelector('.cataloge__list');
const catalogeMore = document.querySelector('.btn__product');
const prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal-content');

let prodQuantity = 5;
let dataLength = null;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (catalogeList) {
  const loadProducts = (quantity = 5) => {
    fetch('../data/data.json')
      .then((reponse) => {
        return reponse.json();
      })

      .then((data) => {

        dataLength = data.length;

        catalogeList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];
            console.log(item)

            catalogeList.innerHTML += `

            <li class="cataloge-list__item">
            <article class="product">
              <div class="product__image">

                <picture>
                  <source srcset="${item.mainImage}" type="image/avif">
                  <source srcset="${item.mainImage}" type="image/webp">
                  <img class="image" loading="lazy" src="${item.mainImage}" alt="${item.title}">
                </picture>

                <div class="product__btns">
                  <button class="btn-reset product__btn" data-graph-path="prod-modal" data-id="${item.id}" aria-label="Показать информацию о товаре">
                    <svg>
                      <use xlink:href="img/sprite.svg#show"></use>
                    </svg>
                  </button>
                  <button class="btn-reset product__btn" aria-label="Добавить товар в корзину">
                    <svg>
                      <use xlink:href="img/sprite.svg#cart"></use>
                    </svg>
                  </button>
                </div>

              </div>
              <h3 class="product__title">${item.title}</h3>
              <span class="product__price">${normalPrice(item.price)} р</span>
            </article> <!-- //.article-1 -->
          </li>

            `;
          }
        }
      })
      .then(() => {
        const productTitle = document.querySelectorAll('.product__title');
        productTitle.forEach(el => {
          $clamp(el, { clamp: '22px' });
        });


        const modal = new GraphModal({
          isOpen: (modal) => {
            const openBtnId = modal.previousActiveElement.dataset.id;

            loadModalData(openBtnId);
          },
        });


      });
  };

  loadProducts(prodQuantity);

  const loadModalData = (id = 1) => {
    fetch('../data/data.json')
      .then((reponse) => {
        return reponse.json();
      })

      .then((data) => {
        // prodModal.innerHTML = '';

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem);
          }
        }
      });
  };

  catalogeMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 3;

    loadProducts(prodQuantity);

    if (prodQuantity >= dataLength) {
      catalogeMore.style.display = 'none';
    }
    else {
      catalogeMore.style.display = 'block';
    }
  });
}


const prodSlider = new Swiper('.modal-slider__container', {
  slidesPerView: 1
});
