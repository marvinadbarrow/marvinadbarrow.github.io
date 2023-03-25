// BEGIN BY CHECKING IF THERE ARE ITEMS IN A SHOPPING BASKET BECAUSE THEN WE WON'T HAVE TO DOWNLOAD THE ORIGINAL LIST AND CAN JUST POPULATE THE BASKET AND PICK LIST FROM THE ASSOCIATED LOCAL STORAGE KEYS


// below bit of code resets the shopping list and pick list saved items so you can download the shopping list and start from scratch

/*
console.log(localStorage.removeItem('basket_list', ''))
console.log(localStorage.removeItem('new_shopping_list'))
console.log(localStorage.removeItem('temp_list'))
*/

if(localStorage.getItem('basket_list')){
  console.log(localStorage.getItem('basket_list'))
  document.getElementById('get-shopping-list').style.display = 'none'
}
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
const cornCobObj = {itemName: 'cookies', imgAddress: './images fruit & veg/corn cob.jpg', id:'corn-cob'}
const tomatoesObj = {itemName: 'tomatoes', imgAddress: './images fruit & veg/tomatoes.jpg', id: 'tomatoes'}

// bakery category
const biscuitsObj = {itemName: 'biscuits', imgAddress: './images bakery/biscuits.jpg',id:'biscuits'}
const cookiesObj = {itemName: 'cookies', imgAddress: './images bakery/cookies.jpg', id:'cookies'}
const breadloafObj = {itemName: 'breadloaf', imgAddress: './images bakery/breadloaf.jpg', id: 'breadloaf'}
const breadrollObj = {itemName: 'breadroll', imgAddress: './images bakery/breadroll.jpg', id: 'breadroll'}

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

// below, each array, corresponding to one of each of the shopping main categories, contains the image names for items within the name category of the array. When a category is clicked, the images belonging to that category will load into the 'select' popup. 
var fishArr = [crabObj, fishcakeObj]
var meatArr = [baconObj, tortelloniMeatObj, quicheMeatObj]
var vegetarianArr = [quicheVegObj, tortelloniVegObj]
var dairyArr = [milkObj, cheeseObj, coldLatteObj]
var fruitVegArr = [carrotsObj, cornCobObj, tomatoesObj]
var bakeryArr = [biscuitsObj, cookiesObj, breadloafObj, breadrollObj]
var pastryArr = [cinnamonSwirlObj, maplePecanObj, flapjacksObj]
var hotDrinksArr = [coffeeObj, hotChocolateObj, teaObj]
var coldDrinksArr = [cocaColaObj, drPepperObj]
var AlcoholArr = [crabbiesObj]
var toiletriesArr = [airFreshenerObj, handwashObj, lynxObj, showerGelObj, toiletTissueObj, toothbrushObj, toothPasteObj]
var cleaningArr = [bleachObj, surfaceCleanerObj, washingPowderObj, washingUpLiquidObj]
var miscArr = [monkeyNutsObj, popcornObj]



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

const openBasket = () =>{
$('#downloaded-list').hide()
$('#basket-list').css('display', 'block')
}

const openList = () =>{
  $('#basket-list').hide()
$('#downloaded-list').css('display', 'block')
}

// updates the array containing shopping list items not yet sent to basket. 
const updateLists = (listArray, basketArray) =>{
 // save altered list array in local storage
 let tempList =  JSON.stringify(listArray)
 console.log(tempList)
localStorage.setItem('temp_list',`${tempList}` )

 // save basket array in local storage
let basketList = JSON.stringify(basketArray)
localStorage.setItem('basket_list',`${basketList}`)
console.log(basketList)


// UPDATE START SHOPPING BUTTON TO RESUME SHOPPING BUTTON

document.getElementById('open-shopping-list').textContent = 'Resume Shopping'
  console.log(localStorage)
  listArray.forEach(object =>{

  })

}


// SENDS PRODUCT TO BASKET, basically the same  operation as holdItemToList, but you send the other way, to the basket instead of back to the list. 
const populateBasket = () =>{

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
console.log(index)
basketArr.push(getListArr[index]) // push object to basket array
delete getListArr[index]// remove object from get list array
}
}

})

// set number of items selected in add to basket modal to zero
document.getElementById('pick-value').textContent = '0';

  $('#hold-item').hide() // close hold item
  $('#downloaded-list').css('display', 'block') // return to shopping list (button on shopping list navigates to basket)
updateLists(getListArr, basketArr)
}


// PRE-POPULATE BASKET; prior to populating basket make sure that user has selected at leat ONE ITEM to push to basket. 

const prePopulateBasket = () =>{
  let pickValueText = document.getElementById('pick-value').textContent
  let pickValueNumber = Number(pickValueText)
if(pickValueNumber > 0){
  populateBasket()
}else{
  document.getElementById('alert-para').textContent = 'choose how many of this item you want;'
$('#msg-modal').css('display', 'block')
}


}



// FROM 'ADD TO BASKET?' BACK TO  PICK ITEM LIST
const  holdItemToList = () =>{
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
$('#hold-item').hide()
$('#downloaded-list').css('display', 'block')
}




// button returns to pick list from HOLD ITEM modal
$('#hold-to-list').click(() =>{
  holdItemToList()
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

$('#main-page').hide()
$('#downloaded-list').css('display', 'block')

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








  // CREATE ELEMENTS TO LOAD IN SHOPPING LIST - MOVING THIS TO BE ACTIVATED BY 'START LIST' BUTTON - START BUTTON WILL NOT ACTIVATE THIS FUNCTION UNLESS LIST HAS BEEN DOWNLOADED AND DOWNLOAD BUTTON IS NOT VISIBLE
const foo = () =>{

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
startShop(getListArr)




  }else{

if(getListArr.length < 1){console.log('cannot start shopping until list is downloaded')}else{

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
startShop(getListArr)
}


}}




// DOWNLOAD AND UNPACK SHOPPING list if one exists
const getShoppingList = () =>{

if(localStorage.getItem('new_shopping_list')){
  if(getListArr.length < 1){
  // convert shopping list in local storage
  let getList = localStorage.getItem('new_shopping_list')
  let unpackList = JSON.parse(getList)
getListArr.push(...unpackList)
// hide download list button
$('#get-shopping-list').hide()
}else{
  console.log('list already available')
}

}else{alert('no shopping list exists')}

}




// DELIVER AFTER SHOPPING COMPLETE
const deliverAndClear = () =>{
  // move list from get
  if(localStorage.getItem('checkout')){ // if checkout storage has been created then we can deliver and clear and move checkout items to new deliver items. 
    localStorage.removeItem('new_shopping_list')
    localStorage.setItem('new_delivery', '')
   

  }else{alert('no shopping exists to deliver')}
}


const startList = () =>{
  let storageList = localStorage.getItem('new_shopping_list')

  if(!localStorage.getItem('new_shopping_list')){ // if nothing is in local storage then shopping needs to start or resume
    if(restockRequiredArr.length < 1){ // if restock array is empty then there is no list so start a new list
      $('#main-page').hide();
      $('#add-items').css('display','block')
  }else{alert('list already in created - click "RESUME LIST" button')}

  }else{ // storage is not empty so shopping needs to be downloaded
  alert('undelivered shopping still exists - you must get shopping before beginning a new list')}


}



const resumeList = () =>{
if(restockRequiredArr.length > 0){
  $('#main-page').hide();
  $('#shopping-list').css('display','block')
}else{alert('shopping list is empty, click start new list')}

}


// blob that opens over save (or upload button)
$('#upload-img').hover(() =>{
$('#upload-blob').toggle()  
})



const confirmUpload = () =>{

  verifiedListArr = []
  // for each product in restock array do the following
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
$('#upload-modal').hide()
$('#main-page').css('display','block')
// images on shopping list need deleting too
      
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
restockRequiredArr = []}


const saveTempList = () =>{
  $('#upload-modal').hide()
  $('#shopping-list').css('display','block')

}




// clear items in checkbox page (select items modal)
const clearSubItems = () =>{
  let selectHolder = document.getElementById('items-for-selection')
  while (selectHolder.firstChild) {
    selectHolder.removeChild(selectHolder.firstChild);
}}



// APPEND PRODUCTS FROM 'VIEW SELECTED ITEMS' TO SHOPPING LIST
const pushToShoppingList = (id) =>{

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
  case 'add-more':
    $('#add-items').css('display','block')
    clearSubItems()
    break;
case 'view-shopping-list':
    $('#shopping-list').css('display','block')
    // remove all items on the 'checkbox' modal (because, here, you are on the 'view added items' page which means you bypassed the back-button on the checkbox page, so the checkboxes were have not been cleared )
    clearSubItems()
}

}



//  DELETE SHOPPING LIST ITEM (cancel)
const cancelDelete = () =>{
// when image in shopping list is clicked display delete modal
$('#delete-items').css('display', 'none')// hide delete modal
// assign variable to item awaiting restoration
let cancelItemDelete = document.getElementById('delete-items').children[1].children[1].children[0];
// restore item to shopping list, by appending it. 
document.getElementById('shopping-list-items').appendChild(cancelItemDelete)
// show shopping list
$('#shopping-list').css('display', 'block')
}

//  DELETE SHOPPING LIST ITEM (confirm)
const confirmDelete = () =>{
 // assign variable to item awaiting deletion
 let deleteThisProduct = document.getElementById('delete-items').children[1].children[1].children[0];
 // assign variable to item product name. 
  let productName = deleteThisProduct.lastChild.innerText
  // find item product name index position in restock array and assign it a variable
 let productNamePosition = restockRequiredArr.indexOf(productName)
// splice the product from the restock array (using index position variable)
restockRequiredArr.splice(productNamePosition, 1)
// hide delete modal and display shopping list;
 $('#delete-items').css('display', 'none')
$('#shopping-list').css('display', 'block')

// remove image of deleted item from delete array - assign a variable to item's container
 let deleteProductHolder = document.getElementById('delete-this-item')
// delete container contents
while(deleteProductHolder.firstChild){
  deleteProductHolder.removeChild(deleteProductHolder.firstChild)
}

}


const duplicateCheckedItem = () =>{
  $('#msg-modal').hide()
  $('#view-added-items').hide()
}

// back button on select subcategory items page (takes you back to main categories)
$('#back-btn').click(function(){
  $('#product-select').hide();
  $('#add-items').css('display','block')
// remove all checkbox items from select items (checkbox page) modal
clearSubItems()
})


//TO UPLOAD MODAL
$('#upload-img').click((e) =>{
  // show decider modal to save temporary list, or to confirm completed list and upload
$('#upload-modal').css('display','block')
$('#shopping-list').hide()

})



// BUTTON EVENT HANDLER (ALL BUTTONS)
$('button').click((e) =>{
 // console.log(e.target)
switch(e.target.id){

  case 'return-to-main':
    $('#shopping-list').hide();
    $('#add-items').css('display','block')
  break;
  case 'view-shopping-list':
    $('#view-added-items').hide();
    let idlist = 'view-shopping-list'
  pushToShoppingList(idlist)
  break;
  case 'add-more':
    $('#view-added-items').hide()
    let idAdd = 'add-more'
  pushToShoppingList(idAdd)
      break;
  case 'alert-modal-close':
duplicateCheckedItem()
  break;

  case 'confirm-delete':
    confirmDelete()
  break;
  case 'cancel-delete':
    cancelDelete()
  break;
  case 'save-list':
  break;
  case 'view-shoplist':
    $('#shopping-list').css('display','block');
    $('#add-items').hide()
  break;
  case 'start-list':
startList()
  break;
  case 'resume-list':
resumeList()
  break;
  case 'get-shopping-list':
    getShoppingList()
  break;
  case 'deliver-shopping':
deliverAndClear()
  break;
  case 'restock-items':
  break;
  case 'authorize-upload':
    confirmUpload()
  break;
  case 'save-list':
    saveTempList()
  break;
case 'navigate-to-basket':
  prePopulateBasket()
  break;
  case 'view-basket-btn':
    openBasket()
  break;
case 'basket-to-list':
  openList()
  break;
case 'basket-to-checkout':
  checkout()
  break;
case 'add-1':
productTotal(e.target.id)
break;
case 'subtract-1':
productTotal(e.target.id)
break;

case 'open-shopping-list':
foo()
break;
}

})



// LOAD CHECKBOX ITEMS
const loadItems = (array) =>{
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
  $('#product-select').hide()
  $('#view-added-items').css('display','block')
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






