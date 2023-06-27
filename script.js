let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem('anyName')) || []

let generateShop = () =>{
  
  return (shop.innerHTML = shopItemsData.map((x)=>{
    let {id, name, price, image} = x;
    let search = basket.find((x)=> x.id === id) || [];
    return `
    <div id=product-id-${id} class="item">
      <img style="width: 100%; height: 250px" src="${image}" alt="">
      <div class="details">
          <h3>${name}</h3>
          
          <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons cart-button">
                  
                  <div id=${id} class="quantity">Amount added: ${search.amount === undefined?0 : search.amount}</div>
                  <button onclick='increment(${id})'>Add to cart</button>
              </div>
          </div>
      </div>
    </div>
  `
    // if search.amount === undefined then return 0 otherwise the number will be basket.length



  // <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
  // <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
  // must use .join('') before the parenthesis close for map function
  }).join(''))
};

// <p>Lorem ipsum dolor sit amet.</p>

generateShop();

let increment = (id) =>{
  // let selectedItem = id;
  let search = basket.find((x)=>x.id === id)
  if (search === undefined){
    basket.push({
      id: id,
      amount: 1,
    })
  }else{
    search.amount +=1
  }
  
  // console.log(basket)
  update(id)
  // always put localStorage at the bottom
  localStorage.setItem('anyName', JSON.stringify(basket))
}

let decrement = (id) =>{
  // let selectedItem = id

  // if id in the basket === the id in the item
  let search = basket.find((x)=>x.id === id)
  if (search.amount === 0)
    return;
  else{
    search.amount -=1
  }
  
  // console.log(basket)
  update(id)
  // localStorage strigger when button is clicked
  localStorage.setItem('anyName', JSON.stringify(basket))
}

let update = (id) =>{
  // search now become an object so we can use the . notation to target the amount
  let search = basket.find((x)=>x.id === id);
  console.log(search.amount);
  document.getElementById(id).innerText = `Amount added: ${search.amount}`;
  // we only want the calculation function to run when update function run
  calculation();
}

let calculation = () =>{
  document.querySelector('.cartAmount').innerText = basket.length
}
// everytime we refresh the page the function will strigger with localStorage
calculation()