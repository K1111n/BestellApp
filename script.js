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
  let addButtonRef = document.getElementById("addButton");
  addButtonRef.innerHTML = "Item added";
  renderShoppingCart();
}

function changeTextToOrigin() {
  let addButtonRef = document.getElementById("addButton");
  addButtonRef.innerHTML = "Add (+) to Cart";
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
  let fullcostInSmallCartAtBottomRef = document.getElementById(
    "fullCostInSmallCartAtBottom"
  );
  fullcostInSmallCartAtBottomRef.innerHTML = fullCost.toFixed(2);
  document.getElementById("orderSign").style = "display:none;";
  document.getElementById("shopping_cart").style = "display:flex;";
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
  let removedDish = shopping_cart.splice(k, 1);
  for (let i = 0; i < menuData.length; i++) {
    for (let j = 0; j < menuData[i].dishes.length; j++) {
      if (menuData[i].dishes[j].id === removedDish.id) {
        menuData[i].dishes[j].amount = 1;
      }
    }
  }
  renderShoppingCart();
}

function order() {
  if (shopping_cart.length === 0) {
    return;
  } else {
    shopping_cart = [];
    renderShoppingCart();
    document.getElementById("orderSign").style =
      "text-align:center; display:flex; justify-content:center; align-items:center; max-height: 50vh; width:100%;";
    document.getElementById("shopping_cart").style = "display:none;";
  }
}
