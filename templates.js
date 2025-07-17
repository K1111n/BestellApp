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
   <h3>${menuData[i].dishes[j].name}</h3>
            <p>${menuData[i].dishes[j].description}</p>
            <p id="price">${menuData[i].dishes[j].price} $</p>
            <button onclick="addToCart(${i},${j})">Add (+) to Cart</button><br>
            `;
}

function shoppingCartTemplate(k, m) {
  return /*html*/ `
    <p>${shopping_cart[k].name}</p> <p>${shopping_cart[k].price} $</p> <p id="amount"></p> 
    <button onclick="increase()">+</button> 
    <button onclick="decrease()">-</button> 
    <button onclick="cancelThisDishCompletly(k)">X</button>
    <br>
    `;
}
