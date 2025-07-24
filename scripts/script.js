let cost = document.getElementById("cost");
let fullCost = document.getElementById("fullcost");
let shopping_cart = [];

if ($_SESSION['logged_in'] = true) {
  document.getElementById("loginOverlay").classList.add("d_none")
  document.getElementById("loggedInUser").classList.remove("d_none");
  document.getElementById("loggedInUser").classList.remove("loggedInUser");
}

/**
 * Renders the Meal-Courses
 * Renders Cart with Informations from Storage
 */
function init() {
  renderMenu();
  renderShoppingCart();
}

/**
 * Renders the Meal-Courses
 */
function renderMenu() {
  let menuRef = document.getElementById("menu-section");
  menuRef.innerHTML = "";
  for (let i = 0; i < menuData.length; i++) {
    menuRef.innerHTML += dishesTemplate(i);
  }
  renderDishDetails();
}

/**
 * Renders the Dishes, descripton to each dish, price to each dish
 */
function renderDishDetails() {
  let dishDetailsSection = document.getElementsByClassName("dishDetails");
  for (let i = 0; i < menuData.length; i++) {
    let dishDetailsRef = dishDetailsSection[i];
    for (let j = 0; j < menuData[i].dishes.length; j++) {
      dishDetailsRef.innerHTML += dishDetailsTemplate(i, j);
    }
  }
}

/**
 * Increase the Amount of already in Cart existing Dish || Adds selected dish to the cart; Saves Data in Local Storage
 * @param {index of Meal-Course} i 
 * @param {index of dish in Meal-Course} j 
 */
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

/**
 * Renders Cart with Informations from Storage
 */
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

/**
 * Renders Dialog with Information from Storage
 */
function renderDialog() {
  getAnythingLocalStorage();
  let dialogRef = document.getElementById("dialog");
  let dialogHeaderRef = document.getElementById("dialogHeader");
  dialogHeaderRef.innerHTML = "";
  let dialogBodyRef = document.getElementById("dialogBody");
  dialogBodyRef.innerHTML = "";
  let dialogFooterRef = document.getElementById("dialogFooter");
  dialogFooterRef.innerHTML = "";
  dialogHeaderRef.innerHTML += crossInDialogTemplate();
  for (let k = 0; k < shopping_cart.length; k++) {
    let amount = `${shopping_cart[k].amount}`;
    let priceForOne = `${shopping_cart[k].price}`;
    let price = amount * priceForOne;
    price = parseFloat(price.toFixed(2));
    dialogBodyRef.innerHTML += dialogTemplate(k, price);
    dialogRef.showModal();
  }
  dialogFooterRef.innerHTML += toOrderButtonTemplate();
}

/**
 * Changes the Full Cost in the Cart and in the Dialog
 */
function changeFullCost() {
  let fullcostRef = document.getElementById("fullCost");
  fullcostRef.innerHTML = fullCost.toFixed(2);
  let fullcostInSmallCartAtBottomRef = document.getElementById(
    "fullCostInSmallCartAtBottom"
  );
  fullcostInSmallCartAtBottomRef.innerHTML = fullCost.toFixed(2);
}

/**
 * After erasing the Content in Cart, Rendering a Sign which says the Order was succesfull
 */
function renderOrderedSign() {
  let dishesInShoppingCartRef = document.getElementById("dishesInShoppingCart");
  dishesInShoppingCartRef.innerHTML = "";
  dishesInShoppingCartRef.innerHTML = orderedTemplate();
  let fullcostRef = document.getElementById("fullCost");
  fullcostRef.innerHTML = fullCost.toFixed(2);
  document.getElementById("orderButton").classList.add("d_none");
}

/**
 * Increases the Amount of selected Dish by 1 from the sticky section on the right side
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
function increase(k) {
  shopping_cart[k].amount++;
  saveAnythingLocalStorage();
  renderShoppingCart();
}

/**
 * Increases the Amount of selected Dish by 1 from the Dialog
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
function increaseInDialog(k) {
  shopping_cart[k].amount++;
  saveAnythingLocalStorage();
  renderDialog();
  renderShoppingCart();
}

/**
 * Decreases the Amount of selected Dish by 1 from the sticky section on the right side, if amount is 1 cancelThisDishCompletly(k) will be called
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
function decrease(k) {
  if (shopping_cart[k].amount != 1) {
    shopping_cart[k].amount--;
    saveAnythingLocalStorage();
    renderShoppingCart();
  } else {
    cancelThisDishCompletly(k);
  }
}

/**
 * Decreases the Amount of selected Dish by 1 from the Dialog , if amount is 1 cancelThisDishCompletlyInDialog(k) will be called
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
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

/**
 * Eliminates Dish from shopping_cart Array
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
function cancelThisDishCompletly(k) {
  shopping_cart.splice(k, 1);
  saveAnythingLocalStorage();
  renderShoppingCart();
  if (shopping_cart.length == 0) {
    closeDialog();
  }
}

/**
 * Eliminates Dish from shopping_cart Array
 * @param {Index of selected Dish in the shopping_cart Array} k 
 */
function cancelThisDishCompletlyInDialog(k) {
  shopping_cart.splice(k, 1);
  saveAnythingLocalStorage();
  renderDialog();
  renderShoppingCart();
  if (shopping_cart.length == 0) {
    closeDialog();
  }
}

/**
 * Initializing Order and showing me a message, that the message is successfull. Saves Data in Local Storage.
 * @returns nothing happens, if nothing is in the cart
 */
function order() {
  if (shopping_cart.length === 0) {
    return;
  } else {
    shopping_cart = [];
    renderOrderedSign();
  }
  saveAnythingLocalStorage();
}

/**
 * Initializing Order from the Dialog and showing me a new Dialog, that says message is successfull. Saves Data in Local Storage.
 */
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

/**
 * Closes any Dialog
 */
function closeDialog() {
  let dialogRef = document.getElementById("dialog");
  dialogRef.close();
  let dialogAfterOrderRef = document.getElementById("dialogAfterOrder");
  dialogAfterOrderRef.close();
}

/**
 * Renders the Dialog with selected Dishes
 * @returns nothing happens, if nothing is in the cart.
 */
function showCart() {
  if (shopping_cart.length === 0) {
    return;
  } else if (!dialog.open) {
    renderDialog();
  }
}

/**
 * Saves menuData Array as it is
 * Saves shopping_cart Array as it is
 */
function saveAnythingLocalStorage() {
  saveMenuDataToLocalStorage();
  saveShoppingCartToLocalStorage();
}

/**
 * Gets Information what the actual menuData Array is
 * Gets Information what the actual shopping_cart Array is
 */
function getAnythingLocalStorage() {
  getMenuDataToLocalStorage();
  getShoppingCartToLocalStorage();
}

/**
 * Saves menuData Array as it is
 */
function saveMenuDataToLocalStorage() {
  localStorage.setItem("menuData", JSON.stringify(menuData));
}

/**
 * Gets Information what the actual menuData Array is
 */
function getMenuDataToLocalStorage() {
  let myArrMenuData = JSON.parse(localStorage.getItem("menuData"));
  if (myArrMenuData != null) {
    menuData = myArrMenuData;
  }
}

/**
 * Saves shopping_cart Array as it is
 */
function saveShoppingCartToLocalStorage() {
  localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart));
}

/**
 * Gets Information what the actual shopping_cart Array is
 */
function getShoppingCartToLocalStorage() {
  let myArrShoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
  if (myArrShoppingCart != null) {
    shopping_cart = myArrShoppingCart;
  }
}
