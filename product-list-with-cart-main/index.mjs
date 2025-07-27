import { moneyFormating, totalPrice } from "./utils.mjs";
import { desserts } from "./utils.mjs";

const mainBox = document.querySelector(".main-box");
const listProduct = document.querySelector(".list-product");
const cartBox = document.querySelector(".cart-box");

desserts.forEach((dessert) => {
  mainBox.innerHTML += `
        <div class="card">
          <img
            src="${dessert.image.desktop}"
            alt="${dessert.category}"
            class="card-photo"
          />
          <button onclick="addProduct('${
            dessert.name
          }')"class="add-to-cart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              fill="none"
              viewBox="0 0 21 20"
            >
              <g fill="hsl(20, 50%, 98%)" clip-path="url(#a)">
                <path
                  d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                />
                <path
                  d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.333 0h20v20h-20z" />
                </clipPath>
              </defs>
            </svg>
            Add to card
          </button>

          <div class="product-info">
            <p class="light-product-name">${dessert.category}</p>
            <p class="product-name">${dessert.name}</p>
            <p class="price">${moneyFormating(dessert.price)}</p>
          </div>
        </div>
          `;
});

// Show shopping card

const shoppingList = () => {
  listProduct.innerHTML = "";
  let myShoppingCard = JSON.parse(localStorage.getItem("shoppingCard") || "[]");
  console.log(myShoppingCard.length);

  cartBox.innerHTML = `<h2 class="h2-title">Your Cart</h2>
        <span class="h2-title">(${myShoppingCard.length})</span>
        `;

  myShoppingCard.forEach((product) => {
    listProduct.innerHTML += `
        <div class="selected-product">
        <p>${product.name}</p>
        <div class="selected-product-quantities"><span>quantity</span><span>${moneyFormating(
          product.price
        )}</span><span>total</span></div>
        <button class="close-button"> <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button> 
        </div>`;
  });
};
shoppingList();

// ADD PRODUCT

const addProduct = (nameSelected) => {
  let virtualShoppingCard = JSON.parse(
    localStorage.getItem("shoppingCard") || "[]"
  );
  const dessertSelected = desserts.find(
    (dessert) => dessert.name === nameSelected
  );

  if (virtualShoppingCard.some((item) => item.name === dessertSelected.name)) {
    return;
  }

  const newArray = [...virtualShoppingCard, dessertSelected];
  localStorage.setItem("shoppingCard", JSON.stringify(newArray));
  virtualShoppingCard = newArray;

  shoppingList();
};

window.addProduct = addProduct;
