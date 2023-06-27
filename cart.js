let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


// use localStorage to retrieve the data from the index.html to another page
// we must have localStorage in order to pass data from 1 page to another page
let basket = JSON.parse(localStorage.getItem('anyName')) || []




let generateCartItems = ()=>{
    if(basket.length !== 0){
        // this will pull the data from localStorage and put it on the page by using map function
        return (shoppingCart.innerHTML = basket.map((x)=>{
            // x represent the object in the basket 
            let {id, amount} = x
            // whatever the argument we put in it will represent the data of the array that we targeted
            // if you find something then return it otherwise return empty
            // search now represent the amount of item in localStorage
            // shopItemsData is the array of item and we use .find() to target the database
            let search = shopItemsData.find((y)=>y.id === id) || []
            return `
                <div class='cart-item'>
                    <img style='width:30%; height:200px' src=${search.image} />
                    <i onclick='removeItem(${id})' class="fa-solid fa-x"></i>
                    <div class='details'>
                        <div class='title-price-x'>
                            <h4 class='title-price'>
                                <p>${search.name}</p>
                                <p class='cart-item-price'>$${search.price}</p>
                            </h4>
                            
                        </div>
                        <div class="buttons">
                            <div>
                                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                                <div id=${id} class="quantity">${amount}</div>
                                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                            </div>
                            <h3>$${(amount * search.price).toFixed(2)}</h3>
                        </div>
                        
                    </div>
                </div>
            `
        }).join(''))
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
            <h2>Cart is empty</h2>
            <a href='index.html'>
                <button class='HomeBtn'>Back to Shopping</button>
            </a>
        `
    }
}

generateCartItems();

let calculation = () =>{
    document.querySelector('.cartAmount').innerText = basket.length
}
// everytime we refresh the page the function will strigger with localStorage
calculation()

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
    generateCartItems();
    totalAmount();
    // always put localStorage at the bottom
    localStorage.setItem('anyName', JSON.stringify(basket))
}
  
let decrement = (id) =>{
    // let selectedItem = id

    // if id in the basket === the id in the item
    let search = basket.find((x)=>x.id === id)

    if (search === undefined) return;
    else if (search.amount === 0)
        return;
    else{
        search.amount -=1
    }

    
    update(id)
    // when basket not contain the id then generateCartItems(); will run
    basket = basket.filter((x)=> x.amount !== 0);
    generateCartItems();
    totalAmount();
    // localStorage strigger when button is clicked
    localStorage.setItem('anyName', JSON.stringify(basket))
}



let update = (id) =>{
    // search now become an object so we can use the . notation to target the amount
    let search = basket.find((x)=>x.id === id);
    // console.log(search.amount);
    document.getElementById(id).innerText = search.amount;
    // we only want the calculation function to run when update function run
    calculation();
}

let removeItem = (id) =>{
    console.log(id)
    // it will remove the item
    // filter function return the condition that we want
    basket = basket.filter((x)=> x.id !== id)
    console.log(basket)
    generateCartItems();
    // must run calculation() in order to update the cart length
    calculation();
    totalAmount();
    localStorage.setItem('anyName', JSON.stringify(basket))
}

let clearCart = () =>{
    basket = [];
    calculation();
    generateCartItems();
    localStorage.setItem('anyName', JSON.stringify(basket))
}


let totalAmount = () =>{
    if (basket.length !== 0){
        let amount = basket.map((x)=>{
            let {amount , id} = x
            // use search to look for the price in database
            // search represent each of the object in the database
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return amount * search.price
        }).reduce((x,y)=>x+y, 0)
        label.innerHTML = `
            <h2>Total Bill: $${amount.toFixed(2)}</h2>
            <button class='checkout'>Checkout</button>
            <button class='removeAll' onclick='clearCart()'>Clear Cart</button>
        `
    }
    else return
}
totalAmount();