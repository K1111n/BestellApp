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

function shoppingCartTemplate(k, price) {
  return /*html*/ `
    <p>${shopping_cart[k].name}</p> <p>${price} $</p> <p id="amount">${shopping_cart[k].amount}</p> 
    <button onclick="increase(${k})">+</button> 
    <button onclick="decrease(${k})">-</button> 
    <button onclick="cancelThisDishCompletly(${k})">X</button>
    <br>    
    `;
}
