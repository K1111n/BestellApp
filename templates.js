function dishesTemplate(i) {
  return /*html*/ `    
    <img src="${menuData[i].image}" alt="main course" class="menu-img"/>
    <div class="dishDetails">
        <h2>${menuData[i].name}</h2>
    </div>
          `;
}

function dishDetailsTemplate(i, j) {
  return /*html*/ `
   <h3>${menuData[i].dishes[j].name}</h3>
            <p>${menuData[i].dishes[j].description}</p>
            <p style='color:red'>${menuData[i].dishes[j].price} $</p>
            <button onclick="addToCart()">Add to Cart</button>
            `;
}
