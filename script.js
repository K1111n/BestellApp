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
