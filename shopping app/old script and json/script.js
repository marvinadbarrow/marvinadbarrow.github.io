// BEGIN BY CHECKING IF THERE ARE ITEMS IN A SHOPPING BASKET BECAUSE THEN WE WON'T HAVE TO DOWNLOAD THE ORIGINAL LIST AND CAN JUST POPULATE THE BASKET AND PICK LIST FROM THE ASSOCIATED LOCAL STORAGE KEYS


// below bit of code resets the shopping list and pick list saved items so you can download the shopping list and start from scratch

const log = console.log;


log(localStorage)

var totalCheckedArray = []
var restockRequiredArr = [] // contains item names that are selected for the shopping list
var verificationPageArr = [] // shopping list to be updated and verified before sending to server.
var checkboxObj = {}
var productArr = []
var verifiedListArr = []
var getListArr = [] // only if this array has entries can we delete local storage on delivery of shopping (this can be used to create a shopping history)
var inShopListArr = []// contains downloaded list items and items are removed as they are added to the shopping basket. 
var basketArr = [] // items added to shopping basket are pushed here. 
var initialListArray = []// holds record of last saved temp list if it exists
var purchasedArr = []// once checkout is accepted this array will be populated with all checkout object details, and the array with rejected items - with the label of rejected at the beginning of that array (unshifted to the arrayh)

    $('#checkout-send').click(function(e){
      console.log('sending items to checkout... ')
    })

    $('#checkout-go').click(function(e){
      console.log('proceeding to checkout... ')
    })
// when the proceed to checkout button is pressed maybe that's where we can check if any list items are remaining and give the shopper the options to go and get the missing items. 


// modal id's
var modalArr  = ['add-items','submit-items', 'verify-items', 'get-list', 'add-to-basket', 'checkout', 'complete-purchase','get-delivery', 're-stock', 'product-select']

// button id's
var buttonsArr = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8','btn9', 'btn10']



// fish category
const crabObj = {itemName: 'crab sticks', imgAddress: './images fish/crab sticks.jpg', id:'crab-sticks'}
const fishcakeObj = {itemName: 'fish cakes', imgAddress: './images fish/fish cakes.jpg', id:'fish-cakes'}

// meat category
const baconObj = {itemName: 'bacon', imgAddress: './images meat/bacon.jpg', id:'crab-sticks'}
const tortelloniMeatObj = {itemName: 'tortelloni: meat', imgAddress: './images meat/tortelloni meat.jpg', id:'tortelloni-meat'}
const quicheMeatObj = {itemName: 'quiche: meat', imgAddress: './images meat/quiche meat.jpg', id:'quiche-meat'}

// vegetarian category
const quicheVegObj = {itemName: 'quiche: veg', imgAddress:'./images vegetarian/quiche veg.jpg', id:'quiche-veg'}
const tortelloniVegObj = {itemName: 'tortelloni: veg', imgAddress: './images vegetarian/tortelloni veg.jpg', id:'tortelloni-veg'}

// dairy category
const milkObj = {itemName: 'milk', imgAddress: './images dairy/milk.jpg', id:'milk'}
const cheeseObj = {itemName: 'cheese', imgAddress: './images dairy/cheese.jpg', id:'cheese'}
const coldLatteObj = {itemName: 'cold latte', imgAddress:  './images dairy/cold latte.jpg', id: 'cold-latte'}

// fruit and veg category
const carrotsObj = {itemName: 'carrots', imgAddress: './images fruit & veg/carrots.jpg', id:'carrots'}
const cornCobObj = {itemName: 'corn cob', imgAddress: './images fruit & veg/corn cob.jpg', id:'corn-cob'}
const tomatoesObj = {itemName: 'tomatoes', imgAddress: './images fruit & veg/tomatoes.jpg', id: 'tomatoes'}

// bakery category
const biscuitsObj = {itemName: 'biscuits', imgAddress: './images bakery/biscuits.jpg',id:'biscuits'}
const cookiesObj = {itemName: 'cookies', imgAddress: './images bakery/cookies.jpg', id:'cookies'}
const breadloafObj = {itemName: 'breadloaf', imgAddress: './images bakery/breadloaf.jpg', id: 'breadloaf'}
const breadrollObj = {itemName: 'breadroll', imgAddress: './images bakery/breadroll.jpg', id: 'breadroll'}
const granolaSlicesObj = {itemName: 'granola slices', imgAddress: './images bakery/granola slices.jpg', id: 'granola-slices'}


// pastry category
const cinnamonSwirlObj = {itemName: 'cinnamon swirl', imgAddress: './images pastry/cinnamon swirl.jpg',id:'cinnamon-swirl'}
const maplePecanObj = {itemName: 'maple pecan', imgAddress: './images pastry/maple pecan.jpg', id:'maple-pecan'}
const flapjacksObj = {itemName: 'flapjacks', imgAddress: './images pastry/flapjacks.jpg', id: 'flapjacks'}

// hot drinks category
const coffeeObj = {itemName: 'coffee', imgAddress: './images hot drinks/coffee.jpg', id:'coffee'}
const hotChocolateObj = {itemName: 'hot chocolate', imgAddress: './images hot drinks/hot chocolate.jpg', id:'hot-chocolate'}
const ovaltineObj = {itemName: 'ovaltine', imgAddress: './images hot drinks/ovaltine.jpg', id: 'ovaltine'}
const teaObj = {itemName: 'tea', imgAddress: './images hot drinks/tea.jpg', id: 'tea'}

// cold drinks category
const cocaColaObj = {itemName: 'coca cola', imgAddress: './images cold drinks/coca cola.jpg', id:'coca-cola'}
const drPepperObj = {itemName: 'dr pepper', imgAddress:  './images cold drinks/dr pepper.jpg', id:'dr-pepper'}

 // alcohol category
const crabbiesObj = {itemName: 'crabbies', imgAddress: './images alcohol/crabbies.jpg', id: 'crabbies'}

// toiletries category
const airFreshenerObj = {itemName: 'air freshener', imgAddress: './images toiletries/air freshener.jpg', id:'air-freshener'}
const handwashObj = {itemName: 'hand wash', imgAddress: './images toiletries/hand wash.jpg', id:'hand-wash'}
const lynxObj = {itemName: 'lynx', imgAddress: './images toiletries/lynx.jpg', id: 'lynx'}
const showerGelObj = {itemName: 'shower gel', imgAddress: './images toiletries/shower gel.jpg', id: 'shower-gel'}
const toiletTissueObj = {itemName: 'toilet tissue', imgAddress: './images toiletries/toilet tissue.jpg', id: 'toilet-tissue'}
const toothbrushObj = {itemName: 'toothbrush', imgAddress: './images toiletries/toothbrush.jpg', id: 'toothbrush'}
const toothPasteObj = {itemName: 'toothpaste', imgAddress:  './images toiletries/toothpaste.jpg', id: 'toothpaste'}

// cleaning category
const bleachObj = {itemName: 'bleach', imgAddress: './images cleaning/bleach.jpg', id: 'bleach'}
const surfaceCleanerObj = {itemName: 'surface cleaner', imgAddress: './images cleaning/surface cleaner.jpg', id: 'surface-cleaner'}
const washingPowderObj = {itemName: 'washing powder', imgAddress: './images cleaning/washing powder.jpg', id: 'washing-powder'}
const washingUpLiquidObj = {itemName: 'washing up liquid', imgAddress:  './images cleaning/washing up liquid.jpg', id: 'washing-up-liquid'}

// miscellaneous category
const monkeyNutsObj = {itemName: 'monkey nuts', imgAddress: './images misc/monkey nuts.jpg', id:'monkey-nuts'}
const popcornObj = {itemName: 'popcorn', imgAddress:  './images misc/popcorn.jpg', id: 'popcorn'}
const oliveOilObj = {itemName: 'olive oil', imgAddress:  './images misc/olive oil.jpg', id: 'olive-oil'}

// below, each array, corresponding to one of each of the shopping main categories, contains the image names for items within the name category of the array. When a category is clicked, the images belonging to that category will load into the 'select' popup. 
var fishArr = [crabObj, fishcakeObj]
var meatArr = [baconObj, tortelloniMeatObj, quicheMeatObj]
var vegetarianArr = [quicheVegObj, tortelloniVegObj]
var dairyArr = [milkObj, cheeseObj, coldLatteObj]
var fruitVegArr = [carrotsObj, cornCobObj, tomatoesObj]
var bakeryArr = [biscuitsObj, cookiesObj, breadloafObj, breadrollObj, granolaSlicesObj]
var pastryArr = [cinnamonSwirlObj, maplePecanObj, flapjacksObj]
var hotDrinksArr = [coffeeObj, hotChocolateObj, teaObj, ovaltineObj]
var coldDrinksArr = [cocaColaObj, drPepperObj]
var AlcoholArr = [crabbiesObj]
var toiletriesArr = [airFreshenerObj, handwashObj, lynxObj, showerGelObj, toiletTissueObj, toothbrushObj, toothPasteObj]
var cleaningArr = [bleachObj, surfaceCleanerObj, washingPowderObj, washingUpLiquidObj]
var miscArr = [monkeyNutsObj, popcornObj, oliveOilObj]



var fishObj = {catName: 'fish', items: fishArr}
var meatObj = {catName: 'meat', items: meatArr}
var vegetarianObj = {catName: 'vegetarian', items: vegetarianArr}
var dairyObj = {catName: 'dairy', items: dairyArr}
var fruitVegObj = {catName: 'fruit-veg', items: fruitVegArr}
var bakeryObj = {catName: 'bakery', items: bakeryArr}
var pastryObj = {catName: 'pastry', items: pastryArr}
var hotDrinksObj = {catName: 'hot-drinks', items: hotDrinksArr}
var coldDrinksObj = {catName: 'cold-drinks', items: coldDrinksArr}
var AlcoholObj = {catName: 'alcohol', items: AlcoholArr}
var toiletriesObj = {catName: 'toiletries', items: toiletriesArr}
var cleaningObj = {catName: 'cleaning', items: cleaningArr}
var miscObj = {catName: 'misc', items: miscArr}

var categoryObjArr = [fishObj, meatObj, vegetarianObj, dairyObj, fruitVegObj, bakeryObj, pastryObj, hotDrinksObj, coldDrinksObj, AlcoholObj, toiletriesObj, cleaningObj, miscObj]

// BUTTON CONTROLS DICTATED BY LOCAL STORAGE CONTENT







const clearProductCreation = () =>{
  $('#new-item-or-category').hide() // hide add product modal
$('#main-page').show() // return to homepage
$('input').val('')
$('label[for="add-to"]').html(` `)
$('#add-product').hide()
$('#add-category').hide()
$('#select-add-category').hide()
$('#create-menu-para').show()
$('#new-category').show()
$('#new-product').show()
}

$('#home-icon-product-creation').click(() =>{
  $('#new-item-or-category').hide()
$('#main-page').show()
clearProductCreation()
});


// build and load category into page
const buildCategory = (category) =>{
let categoryId = category.replace(' ', '-') // replace all spaces with dashes (for id format)
let newCategory = `<div id="${categoryId}" class="categories"><p class="">${category}</p> <img class="category-img" src="./default_img.png" alt="shopping basket"></div>`
$('#category-container').append(newCategory)
// create a category object to populate when new products are added
let obj = {catName: category, items: []}
categoryObjArr.push(obj)
console.log(categoryObjArr)

clearProductCreation()
}

// DETECT ENTER KEYSTROKE - CATEGORY INPUT
document.getElementById('category-add-to').addEventListener('keyup', (e) =>{
  switch(e.code){
    case 'Enter': console.log(' category enter pressed')
 // get value of input
  let category = $('#category-add-to').val()
buildCategory(category)
    break;
  }
})


const buildProduct = (productName, category) =>{
let idFormat = productName.replace(' ', '-')// replace any spaces with dashes (for id format)
let obj ={
itemName: productName,
imgAddress: 'default_img.png',
id: idFormat
}// object created to be added to category array for later retrieveal

categoryObjArr.forEach(array =>{
  if(array.catName === category){
let index = categoryObjArr.indexOf(array)// get index of array
categoryObjArr[index].items.push(obj) // push product object to correct subarray
  }
})
clearProductCreation()
}

// DETECT ENTER KEYSTROKE - input field for new product
document.getElementById('add-to').addEventListener('keyup', (e) =>{
  switch(e.code){
    case 'Enter': console.log('enter pressed')
 // get value of input
  let product = $('#add-to').val()

buildProduct(product, categoryCreationArray[0])
    break;
  }
})


// select a category to add a product to
$('#category-selector').change((e) =>{
categoryCreationArray = [] // clear select category array
let selection = e.target.value // get value of selection
categoryCreationArray.push(selection)// push selection to array
$('#select-add-category').hide()// hide select element (dropdown list)
$('#add-product').show()// show input element
$('#add-to').attr('placeholder', `add to: ${selection}`) // show selection as input placeholder
$('label[for="add-to"]').html(`add ${selection} product`) // get 'for' attribute in label so the selection can show as text of label
})

// populate dropdown options with category names
const populateCategorySelector = () =>{
  $('#category-selector').children().remove() // clear previous options first
  categoryObjArr.forEach(category =>{
let option = `<option value="${category.catName}" class="option">${category.catName}</option>`
$('#category-selector').append(option)
  })
}

const createNewItem = (id) =>{
  $('#create-menu-para').hide()
  $('#new-category').hide()
  $('#new-product').hide()
  switch(id){
    case 'new-product': 
    $('#select-add-category').show()
    $('#reject-new').show()
    populateCategorySelector()
    break;
    case 'new-category':
    $('#add-category').show()
    $('#reject-new').show()
        break;
  }
}

const createCategory = () =>{
  $('#new-item-or-category').show()
  $('#main-page').hide()
}

// clear placeholder and any previous entry on focus
$('input').focus(() =>{
  $('input').attr('placeholder','') // clear placeholder
  $('input').val('')
})


// FUNCTION FOR CLOSING AND OPENING MODALS TAKING USER TO NEXT STEP IN SHOPPING OR LIST CREATION
const closeModals = (testID, destinationID) =>{
  console.log(testID)
  let directAncestorID;
  // get the parent of the element whose id is testID
  let directAncestor = document.getElementById(testID).parentNode
  log(directAncestor)
  // check the parent's class
  let ancestorClass = directAncestor.getAttribute('class')
  log(ancestorClass)

  // check parent has an id, and if not alert, and create an id in HTML for parent
  if(directAncestor.id){
  directAncestorID = directAncestor.id;
    log(directAncestorID)
  }else{alert('no ancestor id exits')}


  // if parent has class of modal, hide parent using ancestorID 
  if(ancestorClass == 'modal'){
$(`#${directAncestorID}`).hide()
$(`#${destinationID}`).css('display', 'block')
return;
  }else{ // otherwise run function again with parent ID 
closeModals(directAncestorID, destinationID)
  }}



console.log(localStorage)

var shoppingBegun = localStorage.getItem('shopping_started')
if(shoppingBegun === null){
  $('#open_shopping_list').hide()
}


let newListCreated = localStorage.getItem('create_shopping_list'); // beginning of new list
let listSaved = localStorage.getItem('save_shopping_list'); // saved list before upload
let newListShop = localStorage.getItem('new_shopping_list') // stored uploaded list
let checkoutList = localStorage.getItem('checkout') // record of buy items (created at purchase time)
let deliveryNote = localStorage.getItem('new_delivery') // delivers and opens the way for re-stock
let alreadyShopping = localStorage.getItem('temp_list') // keeps record of items not yet picked
let shoppingBasket = localStorage.getItem('basket_list') // record of basket
let shoppingStarted = localStorage.getItem('shopping_started')
let restockComplete = localStorage.getItem('restock')


// while list is in the process of creation, i.e. newlistShip is not yet avialable, download, open shopping list, deliver and restock are not necessary so hide them. 
if( newListShop === null || checkoutList !== null){console.log('no list started')
$('#get-shopping-list').hide()
$('#open-shopping-list').hide()

// update list is only necessary if a list has been created and is saved
if(listSaved === null){
  $('#resume-list').hide()
}else{ // if a list is saved - hide create list button which is no longer needed
  $('#start-list').hide()
}
}else{ // if list if uploaded
if(shoppingStarted !== null){$('#get-shopping-list').hide()}

}

if(shoppingStarted === null){
  $('#open-shopping-list').hide()
}


// AFTER LIST IS UPLOADED  --------

// if list storage or deliversy storage is still available, keep create list buttons hidden 
  if(newListShop !== null || deliveryNote !== null){
    $('#start-list').hide()
    $('#resume-list').hide()
  }

  if(deliveryNote !== null || checkoutList === null){
    $('#deliver-shopping').hide()
  }

  if(deliveryNote === null){
    $('#restock-shopping').hide()
  }



// CLEAR ALL LOCAL STORAGE RELATED TO SHOPPING ASSISTANT
const clearLocalStorage = () =>{
  localStorage.removeItem('save_shopping_list')
  localStorage.removeItem('basket_list')
  localStorage.removeItem('new_shopping_list')
  localStorage.removeItem('temp_list')
  localStorage.removeItem('checkout')
  localStorage.removeItem('new_delivery')
  localStorage.removeItem('create_shopping_list')
  localStorage.removeItem('shopping_started')
  localStorage.removeItem('restock')
  document.getElementById('open-shopping-list').innerText = 'Start Shopping'
  }


// clear button on main page in case you wish to restart list. 
$('#clear-items').click(() =>{
  clearLocalStorage()
})


// when first item is sent to basket this temporary list, representing items remaining in the pick list, is saved to local storage, and the 'START SHOPPING' button, has its text substituted by 'RESUME SHOPPING'
if(localStorage.getItem('temp_list') && restockComplete === null){
      // then shopping has already begun so change the start shopping name to resume shopping
      document.getElementById('open-shopping-list').innerText = 'Resume Shopping'
      console.log(document.getElementById('open-shopping-list').innerText)
}



const closePurchase = (id, destinationID) =>{

  closeModals(id, destinationID)
$('.purchase-hide').hide() // hides all unnecessary buttons

$('#deliver-shopping').css('display','block')
$('#clear-items').css('display','block')
}


const makePurchase = (id, destinationID) =>{
  // store purchase and rejected items inside the purchased array (rejected objects are stored as a separate copy of getListArr; with the word 'rejected' unshifted to the first position in that array)
  getListArr.unshift('rejected')
purchasedArr.push(...basketArr, getListArr )

// save shopping result to checkout key in local storage: this will enable the 'DELIVERY' function to execute, since it can only do so is this checkout 'key' is in local storage. It can be cleared once a new list is created. 
let savedPurchase = JSON.stringify(purchasedArr)
localStorage.setItem('checkout',`${savedPurchase}`)

closeModals(id, destinationID)

// clear all content pages, pick list, basket and checkout so that on page refresh no images are stuck left in these content holders
let pickItemContent = document.getElementById('downloaded-modal-content')
let basketContent = document.getElementById('basket-modal-content') 
let checkoutContent = document.getElementById('checkout-container')
let containersArray = [pickItemContent, basketContent, checkoutContent]

containersArray.forEach(contentHolder =>{
  while(contentHolder.firstChild){
    contentHolder.removeChild(contentHolder.firstChild)
    console.log(contentHolder)
  }})
  localStorage.removeItem('basket_list')
  localStorage.removeItem('create_shopping_list')

}

// rejected items
const loadRejects = (array) =>{

  // load items not purchased
array.forEach(element =>{

  // create document fragment
  let df2 = new DocumentFragment()
   if(element == undefined){ }else{
    // container
    let rejectProduct = document.createElement('DIV')
    rejectProduct.classList.add('product')
    
    // tick or cross for accepted or rejected
    let productStatusIcon = document.createElement('IMG')
    productStatusIcon.classList.add('checkout-status-img')
    productStatusIcon.setAttribute('src','./cross icon.png')
    // item name
    let productParagraph = document.createElement('p')
    productParagraph.classList.add('checkout-para')
    productParagraph.textContent = element.product_name
    
    // item item number
    let productItemCount = document.createElement('DIV')
    productItemCount.classList.add('product-item-count')
    productItemCount.textContent = '0'
    
    // append all elements to product container
    rejectProduct.append(productStatusIcon)
    rejectProduct.append(productParagraph)
    rejectProduct.append(productItemCount)
    
    df2.appendChild(rejectProduct)
    document.getElementById('checkout-container').append(df2)
  }

  })
}



// CHECKOUT TEMPLATE. 
const checkout = (id, destinationID) =>{

  closeModals(id, destinationID)
  let separatorDiv = document.createElement('DIV')
  separatorDiv.classList.add('product')
  separatorDiv.setAttribute('id','separator')
  separatorDiv.textContent = 'Rejected Items'
  document.getElementById('checkout-container').append(separatorDiv)

// load items for purchase  
basketArr.forEach(element =>{

// create document fragment
let df = new DocumentFragment()

  // container
  let productContainer = document.createElement('DIV')
  productContainer.classList.add('product')
  
  // tick or cross for accepted or rejected
  let productStatusIcon = document.createElement('IMG')
  productStatusIcon.classList.add('checkout-status-img')
  productStatusIcon.setAttribute('src','./tick icon.png')
  // item name
  let productParagraph = document.createElement('p')
  productParagraph.classList.add('checkout-para')
  productParagraph.textContent = element.product_name
  
  // item item number
  let productItemCount = document.createElement('DIV')
  productItemCount.classList.add('product-item-count')
  productItemCount.textContent = element.product_total_number
  
  // append all elements to product container
  productContainer.append(productStatusIcon)
  productContainer.append(productParagraph)
  productContainer.append(productItemCount)
  
  df.appendChild(productContainer)
  document.getElementById('checkout-container').prepend(df)
})



setTimeout(() => {
  loadRejects(getListArr)
}, 200);

}

const productTotal = (identifyer) =>{
  // get paragraph which displays number of items to push to basket
  let itemNumberElement = document.getElementById('pick-value')
   // get text content of item total on add to basket screen
  let itemTotalText = itemNumberElement.textContent
  // convert text to number
  let itemTotalNumber = Number(itemTotalText)
  
  console.log()
switch(identifyer){
  case 'add-1': itemTotalNumber += 1;
  itemNumberElement.textContent = itemTotalNumber;
    break;
  case 'subtract-1':
    if(itemTotalNumber > 0){
  itemTotalNumber -= 1;
  itemNumberElement.textContent = itemTotalNumber;      
    }
    break;
}

}

// back to shopping list from different locations
const openList = (id, destinationID) =>{

  // if ID is return to list on checkout modal, then checkout is completely cleared because, returning to the list, it's plausible that the user will purchase an item so checkout list gets altered, at least one item will move from rejected to accepted. so the checkout is essentially refreshed every time you go to it. 
  switch(id){
    case 'checkout-to-list':
      let modal = document.getElementById(id)
      let checkoutContent = document.getElementById('checkout-container')
      modal.parentNode.parentNode.style.display = 'none'
      // $('#basket-list').hide()
    closeModals(id, destinationID)

while(checkoutContent.firstChild){
  checkoutContent.removeChild(checkoutContent.firstChild)
}

  break;
  default:
  document.getElementById(id).parentNode.parentNode.style.display = 'none'
  // $('#basket-list').hide()
closeModals(id, destinationID)
  }}

// updates the array containing shopping list items not yet sent to basket. 
const updateLists = (listArray, basketArray) =>{
  console.log(basketArr)
 // save altered list array in local storage
 let tempList =  JSON.stringify(listArray)
 console.log(tempList)
localStorage.setItem('temp_list',`${tempList}` )

 // save basket array in local storage
let basketList = JSON.stringify(basketArray)
localStorage.setItem('basket_list',`${basketList}`)

// UPDATE START SHOPPING BUTTON TO RESUME SHOPPING BUTTON
  listArray.forEach(object =>{
  })

}


// SENDS PRODUCT TO BASKET, basically the same  operation as holdItemToList, but you send the other way, to the basket instead of back to the list. 
const populateBasket = (itemTotal) =>{

  let product = document.getElementById('hold-modal-content').firstChild
  // resize product image ready for re-appending to downloaded list
   product.classList.remove('image-div-shop-large')
   product.firstChild.classList.remove('plus-icon-large')
   product.children[1].classList.remove('pick-item-image-large')
   product.lastChild.classList.remove('product-label-large')

 // get basket modal drop item into modal. 
let basketItems = document.getElementById('basket-modal-content') 
basketItems.prepend(product)
// remove 'plus' icon which will be replaced with item amount element
product.removeChild(product.firstChild)
// item amount indicator  NEED TO FIND OUT HOW TO GET THIS INTO BASKET ARRAY
let itemAmountEl = document.createElement('DIV')
itemAmountEl.classList.add('item-amount-icon')
itemAmountEl.textContent = document.getElementById('pick-value').textContent
product.prepend(itemAmountEl)



getListArr.forEach(object =>{ // loop through objects in getListArr
  if(object == undefined){console.log('ignore')}else{
if(product.lastChild.innerText == object.product_name){ // if product name matches the one in the array
  let index = getListArr.indexOf(object) // get index of object
basketArr.push(getListArr[index]) // push object to last position of basket array
getListArr[index].product_total_number = itemTotal //  set total number of item picks
delete getListArr[index]// remove object from get list array
// place the number of items selected in the 'product_total_number' section of the product object. 
}}

})

// set number of items selected in add to basket modal to zero
document.getElementById('pick-value').textContent = '0';

  $('#hold-item').hide() // close hold item
  $('#downloaded-list').css('display', 'block') // return to shopping list (button on shopping list navigates to basket)
updateLists(getListArr, basketArr)
}


// PRE-POPULATE BASKET; prior to populating basket make sure that user has selected at leat ONE ITEM to push to basket. 

const prePopulateBasket = (id, destinationID) =>{
  // get text content of para showing number of items selected
  let pickValueText = document.getElementById('pick-value').textContent
  // convert from string real number
  let pickValueNumber = Number(pickValueText)
if(pickValueNumber > 0){ // if number > 0 move to basket and load image
  populateBasket(pickValueNumber, id, destinationID)
}else{ // alert user that number must be chosen first before sending to basket
  document.getElementById('alert-para').textContent = 'choose how many of this item you want;'
$('#msg-modal').css('display', 'block')
}}

// FROM 'ADD TO BASKET?' BACK TO  PICK ITEM LIST
const  holdItemToList = (id, destinationID) =>{
  let product = document.getElementById('hold-modal-content').firstChild
  // resize product image ready for re-appending to downloaded list
   product.classList.remove('image-div-shop-large')
   product.firstChild.classList.remove('plus-icon-large')
   product.children[1].classList.remove('pick-item-image-large')
   product.lastChild.classList.remove('product-label-large')

// // return the item to pick item modal. 
let listCurrent = document.getElementById('downloaded-modal-content') 
listCurrent.prepend(product)
// set the amount of items selected to zero
document.getElementById('pick-value').textContent = '0';
closeModals(id, destinationID)
}

// button returns to pick list from HOLD ITEM modal if you decide not to pick
$('#hold-to-list').click((e) =>{
  holdItemToList(e.target.id, 'downloaded-list')
})

// PICKED ITEM TAKES YOU HERE TO DECIDE WHETHER TO DROP TO BASKET OR RETURN TO PICK LIST. 
const itemHold = (product) =>{
  product.classList.add('image-div-shop-large')
product.firstChild.classList.add('plus-icon-large')
product.lastChild.classList.add('product-label-large')
product.children[1].classList.add('pick-item-image-large')
console.log(document.getElementById('downloaded-modal-content'))
let holdContent = document.getElementById('hold-modal-content')
holdContent.prepend(product)
$('#hold-item').css('display', 'block')
$('#downloaded-list').hide()

}


const startShop = (array) =>{
  // creat new storage point for list so it can be updated as you send items to basket
  array.forEach(item =>{
    inShopListArr.push(item)
  })

  console.log(inShopListArr)

closeModals('open-shopping-list', 'downloaded-list')


//$('#main-page').hide()
//$('#downloaded-list').css('display', 'block')

// add event listener to all shopping list items
let productSelect = document.querySelectorAll('.image-div-shop')


// ADD EVENTLISTENER TO ALL ITEMS SO THEY CAN BE SENT TO HOLD FOR BASKET MODAL
productSelect.forEach(element => {
  element.addEventListener('click',(e) =>{
    // get div and send for decision on hold-item modal
    let product = e.target.parentNode
    itemHold(product)
   
      })
      });

}

// DOING SHOPPING FUNCTIONS ARE ALL ABOVE THIS LINE ----------------------------------------------



  // CREATE ELEMENTS TO LOAD IN SHOPPING LIST - MOVING THIS TO BE ACTIVATED BY 'START LIST' BUTTON - START BUTTON WILL NOT ACTIVATE THIS FUNCTION UNLESS LIST HAS BEEN DOWNLOADED AND DOWNLOAD BUTTON IS NOT VISIBLE
const foo = (id) =>{

  // if temp list is saved in local storage then the list needs to be updated from there and the shopping list needs to be created from chopping list local storage. 
  if(localStorage.getItem('temp_list')){

    
let ListLocalStorage = localStorage.getItem('temp_list')
let listUpdate = JSON.parse(ListLocalStorage)
getListArr.push(...listUpdate)
console.log(getListArr)
let df = new DocumentFragment()
getListArr.forEach(element =>{

  // IF ELEMENT IS MISSING (NULL) IGNORE ELEMENT AND CONTINUE
  if(element == undefined){console.log(element)}else{

  // CREATE DIV
 let productDiv = document.createElement('DIV')
 $(productDiv).addClass('image-div-shop')


 // CREATE ICON
 let iconImg = document.createElement('IMG')
 iconImg.classList.add('plus-icon')
 iconImg.setAttribute('src', './images download list/add to basket.png') 

 // CREATE PRODUCT IMG
 let productImg = document.createElement('IMG')
 productImg.classList.add('pick-item-image')
 productImg.setAttribute('src', element.product_image_location)


// CREATE PRODUCT DESCRIPTION
let productDescription = document.createElement('P')
let textNode = document.createTextNode(element.product_name)
productDescription.appendChild(textNode)
productDescription.classList.add('product-label')

//  append checkbox, product image and label to product holder and append product holder to 'items for selection' modal,
productDiv.appendChild(iconImg)
productDiv.appendChild(productImg)
productDiv.appendChild(productDescription)
df.appendChild(productDiv)}
})

document.getElementById('downloaded-modal-content').appendChild(df)

// now restore basket
let basketLocalStorage = localStorage.getItem('basket_list')
let basketUpdate = JSON.parse(basketLocalStorage)
basketArr.push(...basketUpdate)
console.log(basketArr)
let df2 = new DocumentFragment()

basketArr.forEach(element =>{

  // IF ELEMENT IS MISSING (NULL) IGNORE ELEMENT AND CONTINUE
  if(element == undefined){console.log(element)}else{

  // CREATE DIV
 let productDiv = document.createElement('DIV')
 $(productDiv).addClass('image-div-shop')

 // CREATE PRODUCT IMG
 let productImg = document.createElement('IMG')
 productImg.classList.add('pick-item-image')
 productImg.setAttribute('src', element.product_image_location)


// CREATE PRODUCT DESCRIPTION
let productDescription = document.createElement('P')
let textNode = document.createTextNode(element.product_name)
productDescription.appendChild(textNode)
productDescription.classList.add('product-label')

//  append checkbox, product image and label to product holder and append product holder to 'items for selection' modal,
productDiv.appendChild(productImg)
productDiv.appendChild(productDescription)
df2.appendChild(productDiv)}
})

document.getElementById('basket-modal-content').appendChild(df2)
startShop(getListArr) // no modal is opened or closed, just button change




  }else{

    // if shopping already started - get the data that was saved from before - otherwise create completelyi new data
    // we will need to save the data


    if(getListArr.length < 1){
      // convert shopping list in local storage
      let getList = localStorage.getItem('new_shopping_list')
      let unpackList = JSON.parse(getList)
    getListArr.push(...unpackList)
    
    // NOTE... IF YOU REFRESH THE PAGE HERE, ALL GETLISTARR DATA IS LOST AND SO, THE 'ELSE' PART OF THE FOO FUNCTION CANNOT RUN BECAUSE IT DOESN'T MEET THE CONDITION FOR RUNNING WHICH REQUIRES GELISTARR TO HAVE DATA IN IT..  THAT DATA IS LOOPED THROUGH AND PROVIDES THE OBJECTS USED TO CREATE IMAGES OF THE SHOPPING LIST CONTENTS. - THE FIRST PART OF THE 'FOO' FUNCTION GETS ITS DATA FROM THE 'SAVED' SHOPPING LIST ON LOCAL STORAGE WITH THE KEY 'TEMP_LIST'. SO GETLISTARR NEEDS TO BE SAVED  ---- ALSO, IF YOU START SHOPPING BUT DON'T SAVE THE DATA, WHEN YOU REFRESH, BECAUSE THE 'START SHOPPING' FUNCTION RELIES ON THE GETLISTARR DATA, THERE IS NO DATA SO THE FUNCTION WILL THROW AN ERROR.  IT LOOKS LIKE THE PARSING OF THE SHOPPING LIST DATA NEEDS TO HAPPEN INSIDE THE 'ELSE' SECTION OF THE FOO FUNCTION. 
    
    
    // hide download list button
    $('#get-shopping-list').hide()
    $('#open-shopping-list').css('display','block')
    

    


// create a document fraction for appending to the downloaded list modal
let df = new DocumentFragment()
getListArr.forEach(element =>{
   // CREATE DIV
  let productDiv = document.createElement('DIV')
  $(productDiv).addClass('image-div-shop')


  // CREATE ICON
  let iconImg = document.createElement('IMG')
  iconImg.classList.add('plus-icon')
  iconImg.setAttribute('src', './images download list/add to basket.png') 

  // CREATE PRODUCT IMG
  let productImg = document.createElement('IMG')
  productImg.classList.add('pick-item-image')
  productImg.setAttribute('src', element.product_image_location)


// CREATE PRODUCT DESCRIPTION
let productDescription = document.createElement('P')
let textNode = document.createTextNode(element.product_name)
productDescription.appendChild(textNode)
productDescription.classList.add('product-label')

//  append checkbox, product image and label to product holder and append product holder to 'items for selection' modal,
productDiv.appendChild(iconImg)
productDiv.appendChild(productImg)
productDiv.appendChild(productDescription)
df.appendChild(productDiv)
})
document.getElementById('downloaded-modal-content').appendChild(df)
startShop(getListArr) // no modal is opened or closed, just button change
}


}}




// DOWNLOAD AND UNPACK SHOPPING list if one exists
const getShoppingList = () =>{

if(localStorage.getItem('new_shopping_list')){
  localStorage.setItem('shopping_started', 'started')
foo()

}else{alert('no shopping list exists')}

}





const restockShopping = () =>{
  let checkout = localStorage.getItem('checkout')
  let date = new Date()
  let shoppingDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}}`
localStorage.setItem(shoppingDate,checkout)
localStorage.setItem('restock', 'complete')

clearLocalStorage()
location.reload()

}



// DELIVER AFTER SHOPPING COMPLETE
const deliverAndClear = () =>{

  // move list from get
    // restore other buttons ready for new list creation etc
$('#restock-shopping').css('display','block')
$('#deliver-shopping').hide()
localStorage.setItem('new_delivery', 'delivered')

 
}

// CREATE NEW LIST
const startList = (id, destinationID) =>{
  
    if(restockRequiredArr.length < 1){ // if restock array is empty, shopping has been put away so new list can be created. 

      // local storage to save list (updated on save/upload page)
localStorage.setItem('create_shopping_list','')
console.log(localStorage)
closeModals(id, destinationID)
  }else{alert('RE-STOCK shopping before creating new list')}

  


}



const resumeList = (id, destinationID) =>{
  // for looping through children of shopping list items. 

// initiate a variable for the HTML
  let html;
  // get the local storage key with saved shopping list
let savedList = localStorage.getItem('save_shopping_list')
// parse the list using JSON
let parsedList = JSON.parse(savedList)
// you need to drop the saved items into restockRequiredArr which will have been deleted when user exits the browser - otherwise nothing will avialable to upload as a new shopping list. 
console.log(parsedList)
parsedList.forEach(element =>{
  
html += element
$('#shopping-list-items').html(html);
})

// remove the unwanted 'undefined' text element which shows up in the shopping list. 
document.getElementById('shopping-list-items').removeChild(document.getElementById('shopping-list-items').firstChild)
// this gets the name of the the product that we need to push into restockArray - because the children are part of a node list you have to convert the childnodes to an array before we can loop through them. And then the array elements can be looped through to get the innerText of the exact child element. Each child node is a DIV containing all of the product's elements, i.e. delete image, main image and lable that has product name as innerText. 
kidArray = Array.from(document.getElementById('shopping-list-items').childNodes)
for(i=0; i<kidArray.length; i++){
  let productName = kidArray[i].children[2].innerText
  console.log(kidArray[i].children[2].innerText)
  restockRequiredArr.push(productName)
}

closeModals(id, destinationID)
}


// blob that opens over save (or upload button)
$('#upload-img').hover(() =>{
$('#upload-blob').toggle()  
})



const confirmUpload = (id, destinationID) =>{
$('#resume-list').hide()
  verifiedListArr = []
  // for each product in restock array do the following
  console.log(restockRequiredArr)
restockRequiredArr.forEach(product =>{
  categoryObjArr.forEach(object =>{
// each object in the array is a JS object containing category name and an array of items, (objects for each product with in the category)
    object.items.forEach(arrayObject =>{
      // each 'arrayObject' is an object inside an array, corresponding to a category product
     if(product == arrayObject.itemName){
      // arrayObject.itemName gives the products name and if that name matches the item in the restock array, item.name, and the other values, item.id and item.image-address are placed inside a new object so all the details can be retrieved later to display the items when shopping. 

      // create an empty object (to be filled with each product's details)
      let productObj = {
        product_name:'',
        product_id:'',
        product_image_location:'',
        product_total_number:''
      }
      
      productObj.product_name = arrayObject.itemName
      productObj.product_id = arrayObject.id
      productObj.product_image_location = arrayObject.imgAddress

verifiedListArr.push(productObj);

     }
    })
   })

})

// DELETE ELEMENTS FROM SHOPPING MODAL
let clearShoppingList = document.getElementById('shopping-list-items')
while(clearShoppingList.firstChild){
  clearShoppingList.removeChild(clearShoppingList.firstChild);
}

// stringify the array containing all shopping list JS objects. 
let shoppingList = JSON.stringify(verifiedListArr)
// save in local storage
localStorage.setItem('new_shopping_list',`${shoppingList}`)
// now list is saved array can be deleted
restockRequiredArr = []
$('#start-list').hide()
$('#get-shopping-list').css('display','block')
closeModals(id, destinationID)

// shopping list no longer needed so remove relevant local storage which will cause 'start/resume' buttons to be hidden
localStorage.removeItem('create_shopping_list')

}

const saveShoppingList = (id, destinationID) =>{
  console.log(document.getElementById(id))
  // CREATE A LOCAL STORAGE ITEM TO SAVE CURRENT SHOPPING LIST

console.log(restockRequiredArr)
let shoppingListItems = []
// get container for shopping list items
let shoppingListItemsContainer = document.getElementById('shopping-list-items')

// get access to container children via childNodes 
shoppingListItemsContainer.childNodes.forEach(child =>{

// get outerHTML from childNode, which gives the HTML element of each product, if it exists as an HTML element
  let childProduct = child.outerHTML
  if(childProduct){
    // push element to shopping list array for saving as JSON object
    shoppingListItems.push(childProduct)

  }
})

// saving as JSON object 
let savedShoppingList =  JSON.stringify(shoppingListItems)
localStorage.setItem('save_shopping_list', savedShoppingList)
console.log(localStorage.getItem('save_shopping_list'))
//localStorage.removeItem('create_shopping_list')

closeModals(id, destinationID)

}


// returning to home page
const returnHome = (id, destinationID) =>{
$('#add-items').hide()
$(`#${destinationID}`).css('display', 'block')
}




// clear items in checkbox page (select items modal)
const clearSubItems = (id, destinationID) =>{
  let selectHolder = document.getElementById('items-for-selection')
  while (selectHolder.firstChild) {
    selectHolder.removeChild(selectHolder.firstChild);
}

// if clicking element id and its destination modal's id are arguments to this function then execute close modals function
if(id && destinationID){
  closeModals(id, destinationID)
}
}



// APPEND PRODUCTS FROM 'VIEW SELECTED ITEMS' TO SHOPPING LIST
const pushToShoppingList = (id, destinationID) =>{
  log(id)
  //create document fragment to hold new images
  let df = new DocumentFragment()
  // get viewed items element
  let addedHolder = document.getElementById('just-added-items') 
  console.log(addedHolder)
  while (addedHolder.firstChild) { // while it contains child elements 
    // create a delete icon
    let deleteImg = document.createElement('IMG')
// add source to delete icon
    deleteImg.setAttribute('src', 'delete image.png')
    // prepend delete image before the child
    addedHolder.firstChild.prepend(deleteImg) 
     // style image
   deleteImg.classList.add('delete-image')
   // add event listener to containing div
   addedHolder.firstChild.addEventListener('click', (e) =>{
     $('#shopping-list').hide() // when clicked, hide shopping list and append div to delete modal
    document.getElementById('delete-this-item').append(e.target.parentNode)
    $('#delete-items').css('display', 'block') // display delete modal

   })
// append child to document fragment
df.appendChild(addedHolder.firstChild)

        }
// append document fragment to shopping list
document.getElementById('shopping-list-items').append(df) 
console.log(document.getElementById('shopping-list-items'))
// switch navigation id to find out where to go next (shopping list or category page)
switch(id){
  case 'add-icon':
       clearSubItems(id, destinationID)
    break;
case 'view-shopping-list':
  clearSubItems(id, destinationID)
}
}


// PLUS ICON WHICH TAKES USER FROM JUST ADDED ITEMS MODAL BACK TO CATEGORIES
$('#add-icon').click((e)=>{
  pushToShoppingList(e.target.id, 'shopping-list')
 })

//  DELETE SHOPPING LIST ITEM (cancel)
const cancelDelete = (id, destinationID) =>{
// when image in shopping list is clicked display delete modal

// assign variable to item awaiting restoration
let cancelItemDelete = document.getElementById('delete-items').children[1].children[1].children[0];
// restore item to shopping list, by appending it. 
document.getElementById('shopping-list-items').appendChild(cancelItemDelete)
// show shopping list
closeModals(id, destinationID)
}

//  DELETE SHOPPING LIST ITEM (confirm)
const confirmDelete = (id, destinationID) =>{
  console.log(restockRequiredArr)
 // assign variable to item awaiting deletion
 let deleteThisProduct = document.getElementById('delete-items').children[1].children[1].children[0];
 // assign variable to item product name. 
  let productName = deleteThisProduct.lastChild.innerText
  // find item product name index position in restock array and assign it a variable
 let productNamePosition = restockRequiredArr.indexOf(productName)
// splice the product from the restock array (using index position variable)
restockRequiredArr.splice(productNamePosition, 1)
// hide delete modal and display shopping list;
closeModals(id, destinationID)

// remove image of deleted item from delete array - assign a variable to item's container
 let deleteProductHolder = document.getElementById('delete-this-item')
// delete container contents
while(deleteProductHolder.firstChild){
  deleteProductHolder.removeChild(deleteProductHolder.firstChild)
}

}


const duplicateCheckedItem = (id) =>{
  console.log(id)
  $('#view-added-items').hide()
  closeModals(id,'product-select')
}

// back button on select subcategory items page (takes you back to main categories)
$('#back-arrow-img').click(function(e){
// remove all checkbox items from select items (checkbox page) modal
clearSubItems(e.target.id, 'add-items')
})
//TO UPLOAD MODAL
$('#upload-img').click((e) =>{
closeModals(e.target.id, 'upload-modal')
})








// BUTTON EVENT HANDLER (ALL BUTTONS)
$('button').click((e) =>{
 // console.log(e.target)
switch(e.target.id){

  case 'return-to-main':
closeModals(e.target.id, 'add-items')
  break;
  case 'view-shopping-list':
  pushToShoppingList(e.target.id, 'shopping-list')
  break;

  case 'alert-modal-close':
duplicateCheckedItem(e.target.id)
  break;

  case 'confirm-delete':
    confirmDelete(e.target.id, 'shopping-list')
  break;
  case 'cancel-delete':
    cancelDelete(e.target.id, 'shopping-list')
  break;
  case 'view-shoplist':
closeModals(e.target.id,'shopping-list')

  break;
  case 'start-list':
startList(e.target.id, 'add-items')
  break;
  case 'resume-list':
resumeList(e.target.id, 'shopping-list')
  break;
  case 'get-shopping-list':
    getShoppingList() // this is just a download button and changes no modal
  break;
  case 'deliver-shopping':
deliverAndClear() // only button change on delivery so no closing or opening of modals
  break;
  case 'restock-shopping':
    restockShopping() // page refreshes so no need to close or open modals
  break;
  case 'authorize-upload':
    confirmUpload(e.target.id, 'main-page')
  break;
  case 'save-list':
    saveShoppingList(e.target.id, 'shopping-list')
  break;
case 'navigate-to-basket':
  prePopulateBasket(e.target.id, 'downloaded-list')
  break;
  case 'view-basket-btn':
closeModals(e.target.id, 'basket-list')
  break;
case 'basket-to-list':
  openList(e.target.id, 'downloaded-list')
  break;
case 'basket-to-checkout':
  checkout(e.target.id, 'checkout-list')
  break;
case 'add-1':
productTotal(e.target.id) // increases number of items for basket - no modal change here
break;
case 'subtract-1':
productTotal(e.target.id) // decreases number of items for basket - no modal change 
break;
case 'open-shopping-list':
foo(e.target.id) //for loading shopping list, but no modal change occurs
break;
case 'checkout-to-list':
  openList(e.target.id, 'downloaded-list')
break;
case 'buy-items':
  makePurchase(e.target.id, 'complete-purchase')
  break;
case 'purchase-confirmed-btn':
  closePurchase(e.target.id, 'main-page')
break;
case 'home-icon':
  closeModals(e.target.id, 'main-page')
break;
case 'create-new-category':
createCategory()
break;
case 'new-category':
  createNewItem(e.target.id)
break;
case 'new-product':
  createNewItem(e.target.id)
break;
case 'reject-new':
  closeModals(e.target.id)
  clearProductCreation()
break;


}

})



// LOAD CHECKBOX ITEMS
const loadItems = (array) =>{
  console.log(array)
// the above array is a subcategory item, for example, fishcakes and crabsticks (from FISH category). It contains objects representing products in each category.  The elements below are the individual procucts, and their properties (for loading onto the checkbox div), are contained in an object representing each product.  

// creating a DOCUMENT FRAGMENT so that the checkbox page is only appended to once ALL checkbox product elements have been created. 
let df = new DocumentFragment()

array.forEach(element =>{

// creat product holder for checkbox, image, and product(item) name paragraph 
let itemDiv = document.createElement('DIV')
itemDiv.classList.add('image-checkbox-holder')

// create prduct image holder, add CSS class and allocate source, from image address
let itemImg = document.createElement('IMG')
itemImg.classList.add('item-image')
itemImg.setAttribute('src', element.imgAddress) // address of product from product object


// checkbox setup
let itemCheckBox = document.createElement('INPUT')
itemCheckBox.setAttribute('type', 'checkbox') // set type
itemCheckBox.classList.add('checkbox') // CSS class for styling
itemCheckBox.setAttribute('name', 'select') 
itemCheckBox.setAttribute('value', element.itemName) // product name
itemCheckBox.setAttribute('id',element.id) // product id (same as name but with hyphens if needed)

// label element for checkbox
let itemDescription = document.createElement('LABEL')
itemDescription.classList.add('select-label')
itemDescription.setAttribute('for',element.id)

// create text for label and append, 'itemName' key is used from the object
let textNode = document.createTextNode(element.itemName)
itemDescription.appendChild(textNode)

//  append checkbox, product image and label to product holder and append product holder to 'items for selection' modal,
itemDiv.appendChild(itemCheckBox)
itemDiv.appendChild(itemImg)
itemDiv.appendChild(itemDescription)
df.appendChild(itemDiv)
productArr.push(itemDiv)
console.log(productArr)
//console.log(itemDiv)
})
// now that all of the elements 
document.getElementById('items-for-selection').appendChild(df)



// hide category modal, and show checkbox modal containing products of main category. 
$('#product-select').css('display','block');
$('#add-items').hide()

// toggle checkbox for selection/deselection (on click)
$('.image-checkbox-holder').click((e) =>{
let checkbox = e.target.parentNode.firstChild
if(!checkbox.checked){checkbox.setAttribute('checked', 'checked')}
else{checkbox.removeAttribute('checked')}

})
}


// DISPLAY CATEGORY PRODUCTS - with checkboxes for selection
$('#screen-body').click(function(e){
  categoryObjArr.forEach(element =>{ // categoryObjArr containers an object for each category; each object has two keys, 'category name', and 'items'. Category name is just a string (which is also the 'id' of the category element), but 'items' is an array which contains objects representing each product under the category name. Within each of these objects in the 'items' array, there are 3 keys: - 'itemName' which is the name of the product, 'itemAddress' which is the location of its image source, and 'id' which is the id given to each product (used later).

if(document.getElementById(element.catName).contains(e.target)){ // when the screen body is clicked, take each  element in categoryObjArr and use element.catName as the 'id' of an element, get the element, and if the event target is in that element (that is, a category element) then load that element's children, which are the products in the category, onto the checkbox page:              sending element.items ( the product parts, i.e. product name, address and id) as a parameter, to the loadItems() function, which will create a div to house all of the product parts and add a checkbox to the div so the product can be selected. 

  loadItems(element.items)} 
 // send item images to be dynamically loaded to 'select' modal
})
})

// DUPLICATE ALERT
const duplicateAlert = (duplicates, total) =>{
  // clear alert paragraph
  document.getElementById('alert-para').textContent = ''
  let df = new DocumentFragment()
let duplicateList =  document.createElement('ul')
let alertPara = document.createElement('p')
if(total > 1){
  alertPara.textContent = 'items already selected:'
}else{alertPara.textContent = 'item already selected:'}

df.appendChild(alertPara)
df.appendChild(duplicateList)

duplicates.forEach(product =>{
let li = document.createElement('li');
li.textContent = `${product}`
df.append(li)
})

document.getElementById('alert-para').appendChild(df)

$('#msg-modal').css('display', 'flex')
}

// SHOW JUST ADDED ITEMS (UNLESS NO ITEMS SELECTED, THEN SHOW ALERT)
viewAddedItems = (selected) =>{
  
  if(selected < 1){
    $('#alert-para').html(`no products selected close and select products`);
    $('#msg-modal').css('display', 'flex')

}else{


  /*
    $('#product-select').hide()
  $('#view-added-items').css('display','block')
  */
 // send to function to close and open appropriate modals
closeModals('select-items', 'view-added-items')
}
}



// FIND CHECKED CHECKBOXES AND APPEND ASSOCIATED IMAGES TO 'VIEW ADDED' MODAL
const checkClickedStatus = () =>{
let duplicateArray = []
  let duplicateTotal = 0; // determines which function executes at the end of this function
let checkedtotal = 0; // determines which function executes at the end of this function

  let df = new DocumentFragment(); // new divs appended to this fragment
      // clear previous added items modal - this happens when submit button is clicked if one or more items have been checked. 
      let addedHolder = document.getElementById('just-added-items')
  while (addedHolder.firstChild) {
    addedHolder.removeChild(addedHolder.firstChild);}

// locate all checkbox 
   let element = document.querySelectorAll('[type=checkbox]')

  element.forEach(item =>{
if(item.checked){ // if any items checkboxes are ticked --
  checkedtotal += 1;
  // give a special class to duplicate selections

    // hide product checkbox modal
    if(restockRequiredArr.includes(item.value)){
     // addedDiv.classList.add('duplicate');
     duplicateArray.push(item.value)
      duplicateTotal += 1;  // THEN FILL IN MODAL WITH DUPLICATE DETAIL

      item.removeAttribute('checked') // uncheck checkbox
              }else{ // CREATE PRODUCT for shopping list
                                restockRequiredArr.push(item.value);
        // CREATE NEW DIV and STYLE
        let addedDiv = document.createElement('DIV')
        $(addedDiv).addClass('item-checkbox-holder')
        $(addedDiv).addClass('item-image')
        $(addedDiv).css('display:, flex; flex-direction:column;')

 // DROP IMAGE AND DESCRIPTION INTO DIV
   addedDiv.append(item.parentNode.children[1]) // image
   addedDiv.append(item.parentNode.children[1]) // paragraph, which is now children[1]

      // APPEND DIV TO DOCUMENT FRAGMENT
  df.appendChild(addedDiv)

  }
}

    })
       // APPEND DOCUMENT FRACTION TO ADDED ITEMS DIV
    document.getElementById('just-added-items').append(df)
    if(duplicateTotal < 1){ // no duplicate exists
      viewAddedItems(checkedtotal)
      }else{ // duplicates exist
duplicateAlert(duplicateArray, duplicateTotal)
     // VIEW ADDED ITEMS
   }
}

// submit executes the function for finding which item checkboxes have been ticked. This is a form in the subcategory item page where you select or deselect items. 
$('#create-list').on('submit', function(e){
  e.preventDefault();
  checkClickedStatus()
})






