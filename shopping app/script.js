var restockRequiredArr = [] // contains item names that are selected for the shopping list
var verificationPageArr = [] // shopping list to be updated and verified before sending to server.
var checkboxObj = {}

    $('#checkout-send').click(function(e){
      console.log('sending items to checkout... ')
    })

    $('#checkout-go').click(function(e){
      console.log('proceeding to checkout... ')
    })
// when the proceed to checkout button is pressed maybe that's where we can check if any list items are remaining and give the shopper the options to go and get the missing items. 



// CODEPEN SCRIPT


// modal id's
var modalArr  = ['add-items','submit-items', 'verify-items', 'get-list', 'add-to-basket', 'checkout', 'complete-purchase','get-delivery', 're-stock', 'sub-item-select']

// button id's
var buttonsArr = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8','btn9', 'btn10']



// fish category
const crabObj = {itemName: 'crab sticks', imgAddress: './images fish/crab sticks.png', id:'crab-sticks'}
const fishcakeObj = {itemName: 'fish cakes', imgAddress: './images fish/fish cakes.png', id:'fish-cakes'}

// meat category
const baconObj = {itemName: 'bacon', imgAddress: './images meat/bacon.png', id:'crab-sticks'}
const tortelloniMeatObj = {itemName: 'tortelloni: meat', imgAddress: './images meat/tortelloni meat.png', id:'tortelloni-meat'}
const quicheMeatObj = {itemName: 'quiche: meat', imgAddress: './images meat/quiche meat.png', id:'quiche-meat'}

// vegetarian category
const quicheVegObj = {itemName: 'quiche: veg', imgAddress:'./images vegetarian/quiche veg.png', id:'quiche-veg'}
const tortelloniVegObj = {itemName: 'tortelloni: veg', imgAddress: './images vegetarian/tortelloni veg.png', id:'tortelloni-veg'}

// dairy category
const milkObj = {itemName: 'milk', imgAddress: './images dairy/milk.png', id:'milk'}
const cheeseObj = {itemName: 'cheese', imgAddress: './images dairy/cheese.png', id:'cheese'}
const coldLatteObj = {itemName: 'cold latte', imgAddress:  './images dairy/cold latte.png', id: 'cold-latte'}

// fruit and veg category
const carrotsObj = {itemName: 'carrots', imgAddress: './images fruit & veg/carrots.png', id:'carrots'}
const cornCobObj = {itemName: 'cookies', imgAddress: './images fruit & veg/corn cob.png', id:'corn-cob'}
const tomatoesObj = {itemName: 'tomatoes', imgAddress: './images fruit & veg/tomatoes.png', id: 'tomatoes'}

// bakery category
const biscuitsObj = {itemName: 'biscuits', imgAddress: './images bakery/biscuits.png',id:'biscuits'}
const cookiesObj = {itemName: 'cookies', imgAddress: './images bakery/cookies.png', id:'cookies'}
const breadloafObj = {itemName: 'breadloaf', imgAddress: './images bakery/breadloaf.png', id: 'breadloaf'}
const breadrollObj = {itemName: 'breadroll', imgAddress: './images bakery/breadroll.png', id: 'breadroll'}

// pastry category
const cinnamonSwirlObj = {itemName: 'cinnamon swirl', imgAddress: './images pastry/cinnamon swirl.png',id:'cinnamon-swirl'}
const maplePecanObj = {itemName: 'maple pecan', imgAddress: './images pastry/maple pecan.png', id:'maple-pecan'}
const flapjacksObj = {itemName: 'flapjacks', imgAddress: './images pastry/flapjacks.png', id: 'flapjacks'}

// hot drinks category
const coffeeObj = {itemName: 'coffee', imgAddress: './images hot drinks/coffee.png', id:'coffee'}
const hotChocolateObj = {itemName: 'hot chocolate', imgAddress: './images hot drinks/hot chocolate.png', id:'hot-chocolate'}
const ovaltineObj = {itemName: 'ovaltine', imgAddress: './images hot drinks/ovaltine.png', id: 'ovaltine'}
const teaObj = {itemName: 'tea', imgAddress: './images hot drinks/tea.png', id: 'tea'}

// hot drinks category
const cocaColaObj = {itemName: 'coca cola', imgAddress: './images cold drinks/coca cola.png', id:'coca-cola'}
const drPepperObj = {itemName: 'dr pepper', imgAddress:  './images cold drinks/dr pepper.png', id:'dr-pepper'}

 // alcohol category
const crabbiesObj = {itemName: 'crabbies', imgAddress: './images alcohol/crabbies.png', id: 'crabbies'}

// toiletries category
const airFreshenerObj = {itemName: 'air freshener', imgAddress: './images toiletries/air freshener.png', id:'air-freshener'}
const handwashObj = {itemName: 'hand wash', imgAddress: './images toiletries/hand wash.png', id:'hand-wash'}
const lynxObj = {itemName: 'lynx', imgAddress: './images toiletries/lynx.png', id: 'lynx'}
const showerGelObj = {itemName: 'shower gel', imgAddress: './images toiletries/shower gel.png', id: 'shower-gel'}
const toiletTissueObj = {itemName: 'toilet tissue', imgAddress: './images toiletries/toilet tissue.png', id: 'toilet-tissue'}
const toothbrushObj = {itemName: 'toothbrush', imgAddress: './images toiletries/toothbrush.png', id: 'toothbrush'}
const toothPasteObj = {itemName: 'toothpaste', imgAddress:  './images toiletries/toothpaste.png', id: 'toothpaste'}

// cleaning category
const bleachObj = {itemName: 'bleach', imgAddress: './images cleaning/bleach.png', id: 'bleach'}
const surfaceCleanerObj = {itemName: 'surface cleaner', imgAddress: './images cleaning/surface cleaner.png', id: 'surface-cleaner'}
const washingPowderObj = {itemName: 'washing powder', imgAddress: './images cleaning/washing powder.png', id: 'washing-powder'}
const washingUpLiquidObj = {itemName: 'washing up liquid', imgAddress:  './images cleaning/washing up liquid.png', id: 'washing-up-liquid'}

// miscellaneous category
const monkeyNutsObj = {itemName: 'monkey nuts', imgAddress: './images misc/monkey nuts.png', id:'monkey-nuts'}
const popcornObj = {itemName: 'popcorn', imgAddress:  './images misc/popcorn.png', id: 'popcorn'}

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

// display modal corresponding with button press
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



const clearSubItems = () =>{
  let selectHolder = document.getElementById('items-for-selection')
  while (selectHolder.firstChild) {
    selectHolder.removeChild(selectHolder.firstChild);
}

}

// back button on select items page
$('#back-btn').click(function(){
  $('#sub-item-select').hide();
  $('#add-items').css('display','block')
// remove all item divs which are children of the 'select' modal
clearSubItems()
})

// close alert modal
$('#alert-modal-close').click((e) =>{
$(e.target.parentNode).hide()
})

// button to go from selected items page to shopoping list page
$('#view-shopping-list').click(function(){
  $('#added-items').hide();
  $('#shopping-list').css('display','block')
// remove all item divs which are children of the 'select' modal
clearSubItems()
})


// return to main from shopping list
$('#return-to-main').click(function(){
  $('#shopping-list').hide();
  $('#add-items').css('display','block')
// remove all item divs which are children of the 'select' modal
clearSubItems()
})


// prepare and load images to display items in selected category
const loadItems = (array) =>{

array.forEach(element =>{
// holder setup
let itemDiv = document.createElement('DIV')
itemDiv.classList.add('image-checkbox-holder')

// img setup
let itemImg = document.createElement('IMG')
itemImg.classList.add('item-image')
itemImg.setAttribute('src', element.imgAddress)


// checkbox setup
let itemCheck = document.createElement('INPUT')
itemCheck.setAttribute('type', 'checkbox')
itemCheck.classList.add('checkbox')
itemCheck.setAttribute('name', 'select')
itemCheck.setAttribute('value', element.itemName)
itemCheck.setAttribute('id',element.id)

let itemDescription = document.createElement('LABEL')
itemDescription.classList.add('select-label')
itemDescription.setAttribute('for',element.id)


let textNode = document.createTextNode(element.itemName)
itemDescription.appendChild(textNode)

document.getElementById('items-for-selection').appendChild(itemDiv)
itemDiv.appendChild(itemCheck)
itemDiv.appendChild(itemImg)
itemDiv.appendChild(itemDescription)
//console.log(itemDiv)
})
$('#sub-item-select').css('display','block');
$('#add-items').hide()

// toggle checkbox
$('.image-checkbox-holder').click((e) =>{
console.log('image clicked...')
let checkbox = e.target.parentNode.firstChild
if(!checkbox.checked){checkbox.setAttribute('checked', 'checked')}
else{checkbox.removeAttribute('checked')}

})
}


// selecting a category displays category's image names
$('#screen-body').click(function(e){
  categoryObjArr.forEach(element =>{ // for each category in the object
if(document.getElementById(element.catName).contains(e.target)){ // object category name is clicked
  loadItems(element.items)} 
 // send item images to be dynamically loaded to 'select' modal
})
})

// to view shopping list from main category page
$('#view-shoplist').click(()=>{
  $('#shopping-list').css('display','block');
  $('#add-items').hide()

})

// cancel delete operation
$('#cancel-delete').click(() =>{
  $('#delete-items').css('display', 'none')
  $('#shopping-list').css('opacity', 1)
})

// confirm delete operation
$('#confirm-delete').click((e) =>{
let deleteContainer = document.getElementById('delete-this-item')
let deleteItem = deleteContainer.firstChild
let deleteName = deleteItem.lastChild.innerText
console.log(deleteName)



if(restockRequiredArr.includes(deleteName)){
let deleteThis = restockRequiredArr.indexOf(deleteName)
restockRequiredArr.splice(deleteThis,1)
console.log(restockRequiredArr)


// now we need to find the div with corresponding name in the shopping list in order to delete it.
let shoppingList =  document.getElementById('shopping-list-items')
console.log(shoppingList)
const clonedItems = document.querySelectorAll('.div-clone')
console.log(clonedItems)
clonedItems.forEach(clone =>{
  console.log(clone.lastChild.innerText)
  if(deleteName == clone.lastChild.innerText){
    console.log(clone)
    shoppingList.removeChild(clone)}

})

}
// delete image, checkbox and words from delete modal
while (deleteContainer.firstChild) {
  deleteContainer.removeChild(deleteContainer.firstChild);
}

 $('#delete-items').css('display', 'none')
 $('#shopping-list').css('opacity', 1)
})


// now all is left to do on the FRONT END is sourt out the unintended displays of items not to be deleted. Clone divs might have to get an id from item.value IN BELOW FUNCION








// send selected items to shopping list
const checkClickedStatus = () =>{
      // clear previous selected items display
      let addedHolder = document.getElementById('just-added-items')
  while (addedHolder.firstChild) {
    addedHolder.removeChild(addedHolder.firstChild);
}
   let element = document.querySelectorAll('[type=checkbox]')
  element.forEach(item =>{
if(item.checked){
  if(restockRequiredArr.includes(item.value)){ // if item has already been picked, 'alert'
    item.removeAttribute('checked') // uncheck checkbox
    
    $('#alert-para').html(`<em>${item.value}</em><br> is already on your shopping list`);// para to alert user of duplicate
    $('#msg-modal').css('display', 'flex')
 // open modal to display alert

  }else{restockRequiredArr.push(item.value)


    // return to main category pages
    $('#sub-item-select').hide();
    let addedDiv = document.createElement('DIV')
    $(addedDiv).addClass('item-checkbox-holder')
    $(addedDiv).addClass('item-image')
    $(addedDiv).css('display:, flex; flex-direction:column;')

   addedDiv.append(item.parentNode.children[1])
   addedDiv.append(item.parentNode.children[1])
   let node = addedDiv
   let addedDivClone = node.cloneNode(true)
   addedDivClone.classList.add('div-clone')

let deleteNode = addedDiv
let deleteClone = deleteNode.cloneNode(true) 
deleteClone.classList.add('delete-this')
console.log(deleteClone)
   // adding delete image to shopping list item for deletion
   let deleteImg = document.createElement('IMG')
   deleteImg.classList.add('delete-image')
   deleteImg.setAttribute('src', 'delete image.png')
   addedDivClone.prepend(deleteImg)
  deleteImg.style.cssText = 'margin-left:5px; margin-top:5px;'
  
   // remove if doesn't work

   console.log(addedDivClone)
   document.getElementById('just-added-items').append(addedDiv)
   document.getElementById('shopping-list-items').append(addedDivClone)

// create a node out of all of the cloned div
const clonedItems = document.querySelectorAll('.div-clone')
console.log(clonedItems)

// attach an event listener to each created clone so it can be deleted if required; when image or any other area inside the clone is clicked, the function recognizes that the even target is within the clone so will carry out the method in the function; for now it's just to log the 'dare you sure you want to delete this item???' question.  will need a model with two buttons, delete and cancel; cancel will just close the modal, delete will have to delete the clone AND remove the item from the array containing shopping list items. 
clonedItems.forEach(clone =>{
clone.addEventListener('click', (e) =>{
  if(clone.contains(e.target)){
    document.getElementById('delete-this-item').append(deleteClone)  
    $('#delete-items').css('display', 'block')
    $('#shopping-list').css('opacity', 0)
  }
})
})

// I wanted to append a copy of the selected items to the shopping list modal , but didn't realize that appending the image and wording to the shopping modal, removes it from the 'just added' modal.  Looking for answers found that you can make a clone of an element so that's done below.  

$('#added-items').css('display','block')
  }
}

    })
  console.log(restockRequiredArr)
justAddedItems()

}














// checked values sent to array; but maybe it's good to send all values and distinguish
$('#create-list').on('submit', function(e){
  e.preventDefault();
  checkClickedStatus()
})

// return to category screen to add more items
$('#add-more').click(() =>{
  console.log('back to items page...')
  $('#added-items').hide()
  $('#add-items').css('display','block')
  clearSubItems()

});


