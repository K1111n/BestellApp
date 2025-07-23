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
  let found = false;
  for (let k = 0; k < shopping_cart.length; k++) {
    if (shopping_cart[k].name == menuData[i].dishes[j].name) {
      shopping_cart[k].amount++;
      found = true;
    }
  }
  if (!found) {
    shopping_cart.push(menuData[i].dishes[j]);
  }
  saveAnythingLocalStorage();
  renderShoppingCart();
}

function renderShoppingCart() {
  getAnythingLocalStorage();
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
  changeFullCost();
  document.getElementById("orderButton").classList.remove("d_none");
}

function renderDialog() {
  getAnythingLocalStorage();
  let dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = "";
  dialogRef.innerHTML += crossInDialogTemplate();
  for (let k = 0; k < shopping_cart.length; k++) {
    let amount = `${shopping_cart[k].amount}`;
    let priceForOne = `${shopping_cart[k].price}`;
    let price = amount * priceForOne;
    price = parseFloat(price.toFixed(2));
    dialogRef.innerHTML += dialogTemplate(k, price);
    dialogRef.showModal();
  }
  dialogRef.innerHTML += toOrderButtonTemplate();
}

function changeFullCost() {
  let fullcostRef = document.getElementById("fullCost");
  fullcostRef.innerHTML = fullCost.toFixed(2);
  let fullcostInSmallCartAtBottomRef = document.getElementById(
    "fullCostInSmallCartAtBottom"
  );
  fullcostInSmallCartAtBottomRef.innerHTML = fullCost.toFixed(2);
}

function renderOrderedSign() {
  let dishesInShoppingCartRef = document.getElementById("dishesInShoppingCart");
  dishesInShoppingCartRef.innerHTML = "";
  dishesInShoppingCartRef.innerHTML = orderedTemplate();
  let fullcostRef = document.getElementById("fullCost");
  fullcostRef.innerHTML = fullCost.toFixed(2);
  document.getElementById("orderButton").classList.add("d_none");
}

function increase(k) {
  shopping_cart[k].amount++;
  saveAnythingLocalStorage();
  renderShoppingCart();
}

function increaseInDialog(k) {
  shopping_cart[k].amount++;
  saveAnythingLocalStorage();
  renderDialog();
  renderShoppingCart();
}

function decrease(k) {
  if (shopping_cart[k].amount != 1) {
    shopping_cart[k].amount--;
    saveAnythingLocalStorage();
    renderShoppingCart();
  } else {
    cancelThisDishCompletly(k);
  }
}

function decreaseInDialog(k) {
  if (shopping_cart[k].amount != 1) {
    shopping_cart[k].amount--;
    saveAnythingLocalStorage();
    renderDialog();
    renderShoppingCart();
  } else {
    cancelThisDishCompletlyInDialog(k);
  }
}

function cancelThisDishCompletly(k) {
  shopping_cart.splice(k, 1);
  saveAnythingLocalStorage();
  renderShoppingCart();
  if (shopping_cart.length == 0) {
    closeDialog();
  }
}

function cancelThisDishCompletlyInDialog(k) {
  shopping_cart.splice(k, 1);
  saveAnythingLocalStorage();
  renderDialog();
  renderShoppingCart();
  if (shopping_cart.length == 0) {
    closeDialog();
  }
}

function order() {
  if (shopping_cart.length === 0) {
    return;
  } else {
    shopping_cart = [];
    renderOrderedSign();
  }
  saveAnythingLocalStorage();
}

function orderFromDialog() {
  shopping_cart = [];
  let fullcostInSmallCartAtBottomRef = document.getElementById("fullCostInSmallCartAtBottom");
  fullcostInSmallCartAtBottomRef.innerHTML = 0;
  saveAnythingLocalStorage();
  renderShoppingCart();
  let dialogRef = document.getElementById("dialog");
  dialogRef.close();
  let dialogAfterOrderRef = document.getElementById("dialogAfterOrder");
  dialogAfterOrderRef.showModal();
}

function closeDialog() {
  let dialogRef = document.getElementById("dialog");
  dialogRef.close();
  let dialogAfterOrderRef = document.getElementById("dialogAfterOrder");
  dialogAfterOrderRef.close();
}

function showCart() {
  if (shopping_cart.length === 0) {
    return;
  } else if (!dialog.open) {
    renderDialog();
  }
}

function saveAnythingLocalStorage() {
  saveMenuDataToLocalStorage();
  saveShoppingCartToLocalStorage();
}

function getAnythingLocalStorage() {
  getMenuDataToLocalStorage();
  getShoppingCartToLocalStorage();
}

function saveMenuDataToLocalStorage() {
  localStorage.setItem("menuData", JSON.stringify(menuData));
}

function getMenuDataToLocalStorage() {
  let myArrMenuData = JSON.parse(localStorage.getItem("menuData"));
  if (myArrMenuData != null) {
    menuData = myArrMenuData;
  }
}

function saveShoppingCartToLocalStorage() {
  localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
}

function getShoppingCartToLocalStorage() {
  let myArrShoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
  if (myArrShoppingCart != null) {
    shopping_cart = myArrShoppingCart;
  }
}
