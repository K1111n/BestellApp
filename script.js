let cost = document.getElementById("cost");
let fullCost = document.getElementById("fullcost");
let shopping_cart = [];

function renderMenu() {
  let menuRef = document.getElementById("menu-section");
  menuRef.innerHTML = "";
  for (let i = 0; i < menuData.length; i++) {
    menuRef.innerHTML += dishesTemplate(i);
  }
  renderDishDetails();
}

function renderDishDetails() {
  let dishDetailsSection = document.getElementsByClassName("dishDetails");
  for (let i = 0; i < menuData.length; i++) {
    let dishDetailsRef = dishDetailsSection[i];
    for (let j = 0; j < menuData[i].dishes.length; j++) {
      dishDetailsRef.innerHTML += dishDetailsTemplate(i, j);
    }
  }
}

function addToCart(i, j) {
  //   let price = parseFloat(document.getElementById("price"));
  //   cost = cost + price;
  if (shopping_cart.includes(menuData[i].dishes[j])) {
    return;
  } else {
    shopping_cart.push(menuData[i].dishes[j]);
    renderShoppingCart();
  }
}

function renderShoppingCart() {
  let dishesInShoppingCartRef = document.getElementById("dishesInShoppingCart");
  dishesInShoppingCartRef.innerHTML = "";
  for (let k = 0; k < shopping_cart.length; k++) {
    dishesInShoppingCartRef.innerHTML += shoppingCartTemplate(k);
  }
}

function increase() {}

function decrease() {}

function cancelThisDishCompletly(k) {
  shopping_cart.slice(k);
}
