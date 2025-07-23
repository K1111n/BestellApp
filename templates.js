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
    <div class="addButtonContainer">
      <img src="/Material/plusIcon.png" alt="plusIcon" onclick="addToCart(${i},${j})" class="addButton" id="addButton_${i}${j}"><br>
    </div>
  </div>
            `;
}

function shoppingCartTemplate(k, price) {
  return /*html*/ `  
    <br>
    <div class="shoppingDetails">
        <p>${shopping_cart[k].name}</p> 
        <p>${price.toFixed(2)} $</p> 
    </div>
    <div class="cartDetails">
        <div class="cartDetailsDiv">
              <button onclick="increase(${k})">
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="#ff8008"/>
                      <path d="M20 12V28M12 20H28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
                  </svg>
              </button> 
              <p id="amount">${shopping_cart[k].amount}</p>
              <button onclick="decrease(${k})">
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#ff8008"/>
                    <path d="M12 20H28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </button> 
        </div>
    </div>
    `;
}

function orderedTemplate() {
  return /*html*/ `
        <h4>Order placed successfully.</h4>
        <br>
        <p style="text-align:center;">To continue shopping, <br><br><button onclick="renderShoppingCart()">press here</button>.</p>  
  `;
}

function dialogTemplate(k, price) {
  return /*html*/ `  
    <div class="shoppingDetails">
          <p>${shopping_cart[k].name}</p>
          <p>${price.toFixed(2)} $</p> 
    </div>
    <div class="cartDetails">
        <div class="cartDetailsDiv">
              <button onclick="increaseInDialog(${k})">
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="#ff8008"/>
                      <path d="M20 12V28M12 20H28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
                  </svg>
              </button> 
              <p id="amount">${shopping_cart[k].amount}</p>
              <button onclick="decreaseInDialog(${k})">
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="#ff8008"/>
                      <path d="M12 20H28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
                  </svg>
              </button> 
        </div>
    </div>
    <br>    
    `;
}

function crossInDialogTemplate() {
  return /*html*/ `
              <div class="cross">
                  <img src="/Material/cross.svg" alt="cross" onclick="closeDialog()" class="crossImg">
              </div>
              <br />
              <img src="/Material/cart.svg" alt="shopping_cart" style="height: 100px;"/>
              <br>`;
}

function toOrderButtonTemplate() {
  return /*html*/ `
  <button onclick="orderFromDialog()">
      <svg width="160" height="48" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="48" rx="8" fill="#ff8008"/>
            <text x="80" y="30" text-anchor="middle" fill="#000000" font-size="18" font-family="Arial, sans-serif">
                Order here
            </text>
      </svg>
  </button>`;
}
