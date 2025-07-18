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
  if (shopping_cart.includes(menuData[i].dishes[j])) {
    menuData[i].dishes[j].amount++;
  } else {
    shopping_cart.push(menuData[i].dishes[j]);
  }
  renderShoppingCart();
}

function renderShoppingCart() {
  let dishesInShoppingCartRef = document.getElementById("dishesInShoppingCart");
  dishesInShoppingCartRef.innerHTML = "";
  fullCost = 0;
  for (let k = 0; k < shopping_cart.length; k++) {
    let amount = `${shopping_cart[k].amount}`;
    let priceForOne = `${shopping_cart[k].price}`;
    let price = amount * priceForOne;
    price = parseFloat(price.toFixed(2));
    dishesInShoppingCartRef.innerHTML += shoppingCartTemplate(k, price);
    fullCost += price;
  }
  let fullcostRef = document.getElementById("fullCost");
  fullcostRef.innerHTML = fullCost.toFixed(2);
}

function increase(k) {
  shopping_cart[k].amount++;
  renderShoppingCart();
}

function decrease(k) {
  if (shopping_cart[k].amount != 1) {
    shopping_cart[k].amount--;
    renderShoppingCart();
  }
}

function cancelThisDishCompletly(k) {
  shopping_cart.splice(k, 1);
  renderShoppingCart();
}

function order() {
  shopping_cart = [];
  renderShoppingCart();
  document.getElementById("orderSign").style =
    "text-align:center; display:flex; justify-content:center; align-items:center; max-height: 50vh; width:100%;";
  document.getElementById("shopping_cart").style = "display:none;";
}
