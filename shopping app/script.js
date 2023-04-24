const log = console.log;
log(localStorage)
let productImgArray = [] // keeps product elements append from one modal to another. 
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
var basketProductNames = []

let categoryContainerArray = []
let categoryList = []

    $('#checkout-send').click(function(e){
      console.log('sending items to checkout... ')
    })

    $('#checkout-go').click(function(e){
      console.log('proceeding to checkout... ')
    })

// modal id's
var modalArr  = ['add-items','submit-items', 'verify-items', 'get-list', 'add-to-basket', 'checkout', 'complete-purchase','get-delivery', 're-stock', 'product-select']

// button id's
var buttonsArr = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8','btn9', 'btn10']

// --------------------------------------------------------------------
// FETCH products data JSON FILE. 
fetch('./shopping.json')  // fetch weather code and moon phase data
.then(response => response.json())
.then(data =>{
  
// push each array that contain product objects to the category container
for (const key in data.categoryHolderArr) {
  categoryContainerArray.push(data.categoryHolderArr[key])
}

// push each category object to the list array
for (const key in data.category_objects) {
  categoryList.push(data.category_objects[key])
}

categoryList.forEach(listItem =>{ // for each array containing products
  listItem.forEach(product =>{ // for each product
    categoryContainerArray.forEach(category =>{ // for each category in category array
      if(category.catName === product.categoryName){ // if category name is product category 
      let index = categoryContainerArray.indexOf(category) // get index of category
      categoryContainerArray[index].items.push(product)//push listed product to category 'items' array 
      }
    })
  })
})

console.log(categoryContainerArray) // contains objects for each category with the following setup {catName: "category_name". items: [{categoryName "category name", itemName: "item name", imgAddress: "relative path", id: "id"}, {category2},......{category3},...... {category n}]}
})
// ---------------------------------------------------------------------

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


// BUILD NEW CATEGORY
const buildCategory = (category) =>{
let categoryId = category.replace(' ', '-') // replace all spaces with dashes (for id format)
let newCategory = `<div id="${categoryId}" class="categories"><p class="">${category}</p> <img class="category-img" src="./default_img.png" alt="shopping basket"></div>`
$('#category-container').append(newCategory)
// create a category object to populate when new products are added
let obj = {catName: category, items: []}
categoryContainerArray.push(obj)
console.log(categoryContainerArray)

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

// BUILD NEW PRODUCT
const buildProduct = (productName, category) =>{
let idFormat = productName.replace(' ', '-')// replace any spaces with dashes (for id format)
let obj ={
itemName: productName,
imgAddress: 'default_img.png',
id: idFormat
}// object created to be added to category array for later retrieveal

categoryContainerArray.forEach(array =>{
  if(array.catName === category){
let index = categoryContainerArray.indexOf(array)// get index of array
categoryContainerArray[index].items.push(obj) // push product object to correct subarray
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
  categoryContainerArray.forEach(category =>{
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
  $('input').val('') // clear text
})

const closeModalsNoButton = (hideID, showID) =>{
  $(`#${hideID}`).hide()
  $(`#${showID}`).show()
}

// FUNCTION FOR CLOSING AND OPENING MODALS TAKING USER TO NEXT STEP IN SHOPPING OR LIST CREATION
const closeModals = (testID, destinationID) =>{
  let directAncestorID;
  // get the parent of the element whose id is testID
  let directAncestor = document.getElementById(testID).parentNode
    // check the parent's class
  let ancestorClass = directAncestor.getAttribute('class')
  // check parent has an id, and if not alert, and create an id in HTML for parent
  if(directAncestor.id){
  directAncestorID = directAncestor.id;
  }else{alert('no ancestor id exits')}
  // if parent has class of modal, hide parent using ancestorID 
  if(ancestorClass == 'modal'){
$(`#${directAncestorID}`).hide()
$(`#${destinationID}`).show()
return;
  }else{ // otherwise run function again with parent ID 
closeModals(directAncestorID, destinationID)
  }}

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

// while list is in the process of creation, i.e. new_shopping_list is not yet avialable, download, open shopping list, deliver and restock are not necessary so hide them. 
if( newListShop === null || checkoutList !== null){
$('#get-shopping-list').hide()
$('#open-shopping-list').hide()

// update list is only necessary if a list has been created and is saved
if(listSaved === null){
  $('#resume-list').hide()
}else{ // if a list is saved - hide create list button which is no longer needed
  $('#start-list').hide()
}
}else{ // if list is uploaded. if list downloaded, hide 'download' button. 
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

//shopping already begun if temp list is in local storage, change 'start' btn to 'resume' btn
if(localStorage.getItem('temp_list') && restockComplete === null){
$('#open-shopping-list').text('Resume Shopping')
  }

const closePurchase = (id, destinationID) =>{
  closeModals(id, destinationID)
$('.purchase-hide').hide() // hides all unnecessary buttons
$('#deliver-shopping').show()
$('#clear-items').show()
}


const makePurchase = (id, destinationID) =>{
  getListArr.unshift('rejected')// whatever is left is getListArr was not purchased (rejected)
purchasedArr.push(...basketArr, getListArr )
localStorage.setItem('checkout',`${JSON.stringify(purchasedArr)}`)
closeModals(id, destinationID)
// clear all content pages, 
 $('#downloaded-modal-content').children().remove
 $('#basket-modal-content').children().remove 
 $('#checkout-container').children().remove
localStorage.removeItem('basket_list')
localStorage.removeItem('create_shopping_list')
}

// rejected items
const loadRejects = (array) =>{
array.forEach(element =>{  // load items not purchased
   let myRegex = /(?<=bel"\>).*(?=\<\/lab)/gi;// reg expression pulls out product name from string
  let productWord = element.match(myRegex) // result assigned a variable. 
  // create div to show rejected items
    let rejectContainer = `<div class="product">
  <img class="checkout-status-img" src="./cross icon.png">
  <p class="checkout-para">${productWord}</p>
  <div class="product-item-count">0</div>
  </div>`
 $('#checkout-container').append(rejectContainer)
  })
}

// CHECKOUT TEMPLATE. 
const checkout = (id, destinationID) =>{
  closeModals(id, destinationID)
let separator = `<div id="separator" class="product">Rejected Items</div>`
$('#checkout-container').append(separator) // separates purchases from rejects
basketProductNames.forEach(element =>{// load purchased items
  console.log(element)
  let productContainer = `<div class="product">
  <img class="checkout-status-img" src="./tick icon.png">
  <p class="checkout-para">${element[0]}</p>
  <div class="product-item-count">${element[1]}</div>
  </div>`
 $('#checkout-container').prepend(productContainer)
})
  loadRejects(getListArr)
}

const productTotal = (identifyer) =>{
  let itemTotalNumber = Number($('#pick-value').text())
switch(identifyer){
  case 'add_1': itemTotalNumber += 1; // increase number by 1
  $('#pick-value').text(itemTotalNumber); // render number
    break;
default:  if(itemTotalNumber > 0){ // prevent negative numbers
  itemTotalNumber -= 1; // decrease number by 1
  $('#pick-value').text(itemTotalNumber); } // render number
}}

// back to pick list from different locations
const openList = (id, destinationID) =>{
  switch(id){
    case 'checkout-to-list':
      $(`#${id}`).hide();
      $('#checkout-container').children().remove();
    closeModals(id, destinationID);
  break;
  default: // any other button takes user back to list
closeModals(id, destinationID);
  }}

// move picked items from list array to basket array
const updateLists = (listArray, basketArr, label, productCount) =>{
let nameOfProduct = label.textContent; // get product name
listArray.forEach(item =>{ 
  if(item.includes(nameOfProduct)){ // find product in list array
    let index = listArray.indexOf(item); // get index of product
basketArr.push(listArray[index]); // move copy to basket
listArray.splice(index,1);// delete original from list array
basketProductNames.push([nameOfProduct, productCount])// push just name to array for checkout names
  }else{}
})// save updated arrays to local storage
localStorage.setItem('product_names',`${JSON.stringify(basketProductNames)}` );
localStorage.setItem('temp_list',`${JSON.stringify(listArray)}` ); 
localStorage.setItem('basket_list',`${JSON.stringify(basketArr)}`); 
}


const productResize = (product, icon, label, image, destination, size) =>{
  let productClass ='image-div-shop-large';
  let iconClass = 'plus-icon-large';
  let imageClass ='pick-item-image-large';
  let labelClass = 'product-label-large'; 
  switch(size){
    case 'large':
      product.classList.remove(productClass);
      icon.classList.remove(iconClass);
      label.classList.remove(labelClass);
      image.classList.remove(imageClass);
    $(`#${destination}`).prepend(product)
      break;
    case 'small':
      product.classList.add(productClass);
      icon.classList.add(iconClass);
      label.classList.add(labelClass);
      image.classList.add(imageClass);
        $(`#${destination}`).prepend(product)
        break;
      } 
  }


// SENDS PRODUCT TO BASKET,
const populateBasket = (product) =>{
productResize(product, product.firstChild, product.lastChild, product.children[1], 'basket-modal-content', 'large')
let productName = product.lastChild; 
product.removeChild(product.firstChild)// remove 'plus' icon
let itemAmountEl = document.createElement('DIV') // create item count indicator 
itemAmountEl.classList.add('item-amount-icon')
let productCount = $('#pick-value').text()
itemAmountEl.textContent = productCount
product.prepend(itemAmountEl)

$('#pick-value').text('0');// reset item count
  $('#hold-item').hide() // close hold item
  $('#downloaded-list').show()// return to pick list
updateLists(getListArr, basketArr, productName, productCount)
}

// PRE-POPULATE BASKET; prior to populating basket make sure that user has selected at leat ONE ITEM 
const prePopulateBasket = (id, destinationID) =>{
  let pickValueNumber = Number($('#pick-value').text())   // convert to real number
if(pickValueNumber > 0){ // if number > 0 move to basket and load image
  let product = document.getElementById('hold-modal-content').firstChild
  populateBasket(product)
}else{ // alert user that at least one of item must be selected
$('#alert-para').text('choose how many of this item you want;') 
$('#msg-modal').css('display', 'flex')
}}


// FROM 'ADD TO BASKET?' BACK TO  PICK ITEM LIST
const  holdItemToList = (id, destinationID) =>{
  let product = document.getElementById('hold-modal-content').firstChild
  console.log(product)
productResize(product, product.firstChild, product.lastChild, product.children[1], 'downloaded-modal-content', 'large')
$('#pick-value').text('0') // set the amount of items selected to zero
closeModals(id, destinationID)
}

// button returns to pick list from HOLD ITEM modal if you decide not to pick
$('#hold-to-list').click((e) =>{
  holdItemToList(e.target.id, 'downloaded-list')
})

// execute selected item amount modal
const itemView = (product) =>{
productResize(product, product.firstChild, product.lastChild, product.children[1], 'hold-modal-content', 'small')
$('#hold-item').show()
$('#downloaded-list').hide()
}

const startShop = (array) =>{
inShopListArr.push(...array)  // creat new storage point to save basket items to
closeModals('open-shopping-list', 'downloaded-list')
$('.image-div-shop').click((e) =>{ // add event listener to each product
  itemView(e.target.parentNode) 
})
}

const loadShoppingList = (id) =>{ 
  if(localStorage.getItem('temp_list')){ // load saved saved list if one exists
    getListArr = JSON.parse(localStorage.getItem('temp_list'))
getListArr.forEach(element =>{ // render each product to pick list
    $('#downloaded-modal-content').append(element)
})
basketProductNames = JSON.parse(localStorage.getItem('product_names')) // product names for checkout
basketArr = JSON.parse(localStorage.getItem('basket_list')) //get basket list
basketArr.forEach(element =>{
$('#basket-modal-content').append(element)  // restore each product to basket
});
console.log(basketArr)
startShop(getListArr)
  }else{ // no temp list saved 
    if(getListArr.length < 1){//so get new shopping list
      getListArr = JSON.parse(localStorage.getItem('new_shopping_list')) 
  getListArr.forEach(element =>{
    $('#downloaded-modal-content').append(element); // render each product to pick list
    })
   $('#downloaded-modal-content').children().addClass('image-div-shop')//add .shop class to items
    $('#get-shopping-list').hide(); // hide download list button
    $('#open-shopping-list').show();
    startShop(getListArr)};
}}


// DOWNLOAD AND UNPACK SHOPPING list if one exists
const getShoppingList = () =>{
if(localStorage.getItem('new_shopping_list')){
  localStorage.setItem('shopping_started', 'started')
loadShoppingList()
}else{alert('no shopping list exists')}

}

const restockShopping = () =>{
  let shoppingDate = new Date() // set local storage key/value to yyyy-mm-dd/ + checkout list
localStorage.setItem(shoppingDate.toISOString().slice(0,10), localStorage.getItem('checkout'))
localStorage.setItem('restock', 'complete')// set shopping status to complete in local storage
clearLocalStorage() // clear appropriate key/values in local storage
location.reload()// reload page
}

// DELIVER AFTER SHOPPING COMPLETE
const deliverAndClear = () =>{
$('#restock-shopping').show()
$('#deliver-shopping').hide()
localStorage.setItem('new_delivery', 'delivered')
}

// CREATE NEW LIST
const startList = (id, destinationID) =>{
      if(restockRequiredArr.length < 1){ //shopping has been put away so new list can be created. 
localStorage.setItem('create_shopping_list','') // removed once list is uploaded
closeModals(id, destinationID)
  }else{alert('RE-STOCK shopping before creating new list')}
}


const resumeList = (id, destinationID) =>{
let savedList = JSON.parse(localStorage.getItem('save_shopping_list')) // get saved list
savedList.forEach(element =>{
$('#shopping-list-items').append(element); // render products to shopping list. 
})
$('#shopping-list-items').children().each((index, value) =>{ // repopulate restockArr
  restockRequiredArr.push(value.lastChild.textContent)// push product name to array
})
closeModals(id, destinationID)
}

// blob that opens over save (or upload button)
$('#upload-img').hover(() =>{
$('#upload-blob').toggle()  
})

const confirmUpload = (id, destinationID) =>{
$('#resume-list').hide()
  verifiedListArr = []
  $('#shopping-list-items').children().each((index, value) =>{
    let plusImg = new Image() // create a 'plus' icon for product selection once list is downloaded
  plusImg.src = "./add to basket.png"
  plusImg.classList.add('plus-icon')
value.prepend(plusImg)
verifiedListArr.push(value.outerHTML)}) // push shopping list elements to array
$('#shopping-list-items').children().remove() // clear shopping list
localStorage.setItem('new_shopping_list',`${JSON.stringify(verifiedListArr)}`)// save to local storage
restockRequiredArr = [] // pre uploaded list no longer needed
$('#start-list').hide()
$('#get-shopping-list').show()
closeModals(id, destinationID)
localStorage.removeItem('create_shopping_list')// shopping list no longer needed 
}

const saveShoppingList = (id, destinationID) =>{
let shoppingListItems = [] // create shopping list array
$('#shopping-list-items').children().each((index, value) =>{
  shoppingListItems.push(value.outerHTML)}); // push each product element to array
localStorage.setItem('save_shopping_list',  JSON.stringify(shoppingListItems)) // save to storage
closeModals(id, destinationID) // close modal
}

// clear items in checkbox page (select items modal)
const clearSubItems = (id, destinationID) =>{
  $('#items-for-selection').children().remove() // this is probably in the wrong place
if(id && destinationID){ closeModals(id, destinationID)};
}
// APPEND PRODUCTS FROM 'VIEW SELECTED ITEMS' TO SHOPPING LIST
const pushToShoppingList = (id, destinationID) =>{
 productImgArray.forEach(product =>{
  $('#shopping-list-items').append(product.outerHTML)
 })
 $('#shopping-list-items').children().click((e) =>{ // make product clickable
  $('#shopping-list').hide() // hide shopping list modal
$('#delete-this-item').append(e.target.parentNode) // append clicked product to delete modal
  $('#delete-items').css('display', 'block') // show delete modal
 })
switch(id){ 
  case 'add-icon': clearSubItems(id, destinationID) // return to categories 
    break;
default: clearSubItems(id, destinationID) // show shopping list
}
}

// push items to shopping list and navigate back to categories
$('#add-icon').click((e)=>{
  pushToShoppingList(e.target.id, 'add-items')
 })

//  CANCEL DELETE ITEM
const cancelDelete = (id, destinationID) =>{ // restore element to shopping list items
$('#shopping-list-items').append(document.getElementById('delete-this-item').children[0])
closeModals(id, destinationID)
}

//  DELETE SHOPPING LIST ITEM (confirm)
const confirmDelete = (id, destinationID) =>{
let productName = $('#delete-this-item .select-label ').text() // get product name
if(restockRequiredArr.includes(productName)){
  let productNamePosition = restockRequiredArr.indexOf(productName) //
  restockRequiredArr.splice(productNamePosition, 1)
}
closeModals(id, destinationID)
$('#delete-this-item').children().remove()
}


const duplicateCheckedItem = (id) =>{
  $('#view-added-items').hide()
  closeModals(id,'product-select')
}

// back button on select subcategory items page (takes you back to main categories)
$('#back-arrow-img').click(function(e){
clearSubItems(e.target.id, 'add-items') // remove all checkbox items from select modal
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
case 'add_1':
productTotal(e.target.id) // increases number of items for basket - no modal change here
break;
case 'subtract_1':
productTotal(e.target.id) // decreases number of items for basket - no modal change 
break;
case 'open-shopping-list':
loadShoppingList(e.target.id) //for loading shopping list, but no modal change occurs
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
// if selected item already on shopping list, alert user
const duplicateAlert = (duplicates) =>{
let duplicateList = `<p>item(s) already selected:</p>
<ul id="unordered-list"><ul>`
  $('#alert-para').html(duplicateList)
  duplicates.forEach(product =>{
    $('#unordered-list').append(`<li>${product}</li>`)})
$('#msg-modal').css('display', 'flex')
}

// alert 'no item selected' if submit button pressed but no items checked
const noItemsSelected = () =>{
  $('#alert-para').html(`no products selected close and select products`);
  $('#msg-modal').css('display', 'flex')
}

// FIND CHECKED CHECKBOXES AND APPEND ASSOCIATED IMAGES TO 'VIEW ADDED' MODAL
const checkClickedStatus = () =>{
let duplicateArray = [];
$('#just-added-items').children().remove(); // remove previously viewed products
   let element = document.querySelectorAll('[type=checkbox]') // locate all checkbox 
   if(element.length > 1){ // if <= 1, then no checkboxes have been selected. 
element.forEach(item =>{
  if(item.checked && restockRequiredArr.includes(item.value)){ //  if checked items are duplicates
  duplicateArray.push(item.value)
  item.removeAttribute('checked') // uncheck checkbox
  duplicateAlert(duplicateArray) // alert user
          }else if(item.checked && !restockRequiredArr.includes(item.value)){
  let holder = item.nextElementSibling.parentNode // get product holder using next sibling
            restockRequiredArr.push(item.value); 
            item.parentNode.removeChild(item.parentNode.children[0]) // delete checkbox
  $('#just-added-items').append(holder) // append product holder to view items modal
    }
     })
    }else{noItemsSelected()}
     closeModals('select-items', 'view-added-items') // once appended close modal and open 'view list'
  }
// submit executes the function for finding which item checkboxes have been ticked.
$('#create-list').on('submit', function(e){
  e.preventDefault();
  checkClickedStatus()
})

// LOAD category items (with checkboxes for selection)
const loadItems = (array) =>{ productImgArray = [];
  array.forEach(element =>{ 
  let product = `<div class="image-checkbox-holder"><input type="checkbox" name="select" value="${element.itemName}" id="${element.id}" class="checkbox"></input><img src="${element.imgAddress}" class="item-image">
  <label for="${element.id}" class="select-label">${element.itemName}</label></div>`
  productArr.push(product)
  $('#items-for-selection').append(product)
  })
  closeModalsNoButton('add-items', 'product-select') // hide categories, open selection modal 
  $('.image-checkbox-holder').click((e) =>{ // toggle checkbox 
  let checkbox = e.target.parentNode.firstChild
  productImgArray.push(e.target.parentNode) // push all products to array for retrieval later
  if(!checkbox.checked){checkbox.setAttribute('checked', 'checked')}
  else{checkbox.removeAttribute('checked')}
  })
  }
  // open a category
  $('#screen-body').click(function(e){
    categoryContainerArray.forEach(element =>{ // for each category element
  if(document.getElementById(element.catName).contains(e.target)){ // if element contains target
    loadItems(element.items)} // load category items
  })
  })
  



