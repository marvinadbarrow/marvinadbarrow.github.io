var restockRequiredArr = [] // contains item names that are selected for the shopping list
var verificationPageArr = [] // shopping list to be updated and verified before sending to server.
var checkboxObj = {}
var productArr = []
    $('#checkout-send').click(function(e){
      console.log('sending items to checkout... ')
    })

    $('#checkout-go').click(function(e){
      console.log('proceeding to checkout... ')
    })
// when the proceed to checkout button is pressed maybe that's where we can check if any list items are remaining and give the shopper the options to go and get the missing items. 



// CODEPEN SCRIPT


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

console.log(fishObj)

// for buttons to open associated modals (BUTTON ELEMENTS CURRENTLY HIDDEN)
document.addEventListener('click', function(e){
 if(buttonsArr.includes(e.target.id)){
    let index = buttonsArr.indexOf(e.target.id)
    console.log(index)
   modalArr.forEach(element => {
     let modalIndex = modalArr.indexOf(element)
     if(modalIndex === index){console.log(`open ${modalArr[modalIndex]} modal`);
 let modalSelect = modalArr[modalIndex]
 $(`#${modalSelect}`).css('display','block'); }else{
  let modalSelect = modalArr[modalIndex]
 $(`#${modalSelect}`).hide();
       }
   })
 }
})


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
   deleteImg.style.cssText = 'margin-left:5px; margin-top:5px;'
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
$('#cancel-delete').click(() =>{ // when image in shopping list is clicked display delete modal
  $('#delete-items').css('display', 'none')// hide delete modal
  // assign variable to item awaiting restoration
  let cancelItemDelete = document.getElementById('delete-items').children[1].children[1].children[0];
  // restore item to shopping list, by appending it. 
 document.getElementById('shopping-list-items').appendChild(cancelItemDelete)
// show shopping list
 $('#shopping-list').css('display', 'block')
})


//  DELETE SHOPPING LIST ITEM (confirm)
$('#confirm-delete').click((e) =>{
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
})



// back button on select subcategory items page (takes you back to main categories)
$('#back-btn').click(function(){
  $('#product-select').hide();
  $('#add-items').css('display','block')
// remove all checkbox items from select items (checkbox page) modal
clearSubItems()
})

// close alert modal - the hidden alert modal reveals the checkbox modal which is were the user was before the alert occurred. 
$('#alert-modal-close').click((e) =>{
$(e.target.parentNode).hide()
})



// return to main category screen (from 'view added items' modal, to add more items from main categories
$('#add-more').click(() =>{
  $('#view-added-items').hide()
  let id = 'add-more'
pushToShoppingList(id)
});


// button to go from 'view added items' page to shopping list page
$('#view-shopping-list').click(function(){
  $('#view-added-items').hide();
  let id = 'view-shopping-list'
pushToShoppingList(id)

})


// return to main category page from shopping list page (to pick more items if you wish)
$('#return-to-main').click(function(){
  $('#shopping-list').hide();
  $('#add-items').css('display','block')
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


console.log(productArr)
// hide category modal, and show checkbox modal containing products of main category. 
$('#product-select').css('display','block');
$('#add-items').hide()

// toggle checkbox for selection/deselection (on click)
$('.image-checkbox-holder').click((e) =>{
console.log('image clicked...')
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

// VIEW SHOPPING LIST from main category page
$('#view-shoplist').click(()=>{
  $('#shopping-list').css('display','block');
  $('#add-items').hide()

})




// now all is left to do on the FRONT END is sourt out the unintended displays of items not to be deleted. Clone divs might have to get an id from item.value IN BELOW FUNCION


// FIND CHECKED CHECKBOXES AND APPEND ASSOCIATED IMAGES TO 'VIEW ADDED' MODAL
const checkClickedStatus = () =>{

  let df = new DocumentFragment(); // new divs appended to this fragment
      // clear previous added items modal - this happens when submit button is clicked if one or more items have been checked. 
      let addedHolder = document.getElementById('just-added-items')
  while (addedHolder.firstChild) {
    addedHolder.removeChild(addedHolder.firstChild);}

// locate all checkbox items in the document - these will only be in the item divs (the products) of the current category because, on exciting a product veiw, the categorycategory, the checkbox items are deleted from the page. NOTE* checkbox items are still on the invisible modal
   let element = document.querySelectorAll('[type=checkbox]')
  element.forEach(item =>{
if(item.checked){ // if any items checkboxes are ticked --
  if(restockRequiredArr.includes(item.value)){ // if item name is in restock array, item is already picked. 
    item.removeAttribute('checked') // uncheck checkbox because you already listed the item. 
    
    // item value is the name of the product
    $('#alert-para').html(`<em>${item.value}</em><br> is already on your shopping list`);// paragraph to alert user of duplicate
    $('#msg-modal').css('display', 'flex')
 // open message modal to display alert to user

  }else{restockRequiredArr.push(item.value) // if item is not already picked send value (product) to array


    // hide product checkbox modal
    $('#product-select').hide();

    // creating a div to hold a duplicate item image and item name (excluding the checkbox)
    let addedDiv = document.createElement('DIV')
    $(addedDiv).addClass('item-checkbox-holder')
    $(addedDiv).addClass('item-image')
    $(addedDiv).css('display:, flex; flex-direction:column;')

    // remove image and description para from original item by appending them to the newly created div
   addedDiv.append(item.parentNode.children[1]) // image
   addedDiv.append(item.parentNode.children[1]) // paragraph, which is now children[1]
console.log(addedDiv)

   // append div to document fragment
  df.appendChild(addedDiv)
  }
}

    })
    // append document fragment to 'just added items' modal
    document.getElementById('just-added-items').append(df)
    $('#view-added-items').css('display','block')
  console.log(restockRequiredArr)

}



// submit executes the function for finding which item checkboxes have been ticked. This is a form in the subcategory item page where you select or deselect items. 
$('#create-list').on('submit', function(e){
  e.preventDefault();
  checkClickedStatus()
})






