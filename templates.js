function dishesTemplate(i) {
  return /*html*/ `    
    <img src="${menuData[i].image}" alt="main course" class="menu-img"/>
    <div class="dishDetails">
        <h2 id="${menuData[i].id}">${menuData[i].name}</h2>
    </div>
          `;
}

function dishDetailsTemplate(i, j) {
  return /*html*/ `
  <div class="fullDish">
    <div class="dish">
      <h3>${menuData[i].dishes[j].name}</h3>
      <p>${menuData[i].dishes[j].description}</p>
      <p id="price">${menuData[i].dishes[j].price.toFixed(2)} $</p>
    </div>
    <div class="addButton">
      <button onmouseenter="changeTextToAddItem(${i},${j})" onclick="addToCart(${i},${j})" onmouseleave="changeTextToOrigin(${i},${j})" id="addButton_${i}${j}" class="addButton">Add (+) to Cart</button><br>
    </div>
  </div>
            `;
}

function shoppingCartTemplate(k, price) {
  return /*html*/ `  
<div class="shoppingDetails">
    <p>${shopping_cart[k].name}</p> <p>x</p> <p id="amount">${
    shopping_cart[k].amount
  }</p> 
</div>
    <p>${price.toFixed(2)} $</p> 
    <button onclick="increase(${k})">+</button> 
    <button onclick="decrease(${k})">-</button> 
    <button onclick="cancelThisDishCompletly(${k})">X</button>
    <br>    
    `;
}

function dialogTemplate(k, price) {
  return /*html*/ `  
<div class="shoppingDetails">
    <p>${shopping_cart[k].name}</p> <p>x</p> <p id="amount">${
    shopping_cart[k].amount
  }</p> 
</div>
    <p>${price.toFixed(2)} $</p> 
    <br>    
    `;
}

function toOrderButtonTemplate() {
  return /*html*/ `<button onclick="orderFromDialog()">To Order</button>`;
}
