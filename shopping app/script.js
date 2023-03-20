var restockRequiredArr = []
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





// dynamically display images on 'select' modal. 
const displayCheckedItems = () =>{

  }








// send selected items to shopping list
const checkClickedStatus = () =>{
   let element = document.querySelectorAll('[type=checkbox]')
  element.forEach(item =>{
    console.log(item.parentNode.parentNode)
if(item.checked){
  if(restockRequiredArr.includes(item.value)){ // if item has already been picked, 'alert'
    item.removeAttribute('checked') // uncheck checkbox
    
    $('#alert-para').html(`<em>${item.value}</em><br> is already on your shopping list`);// para to alert user of duplicate
    $('#msg-modal').css('display', 'flex')
 // open modal to display alert

  }else{restockRequiredArr.push(item.value)
    // return to main category pages
    $('#sub-item-select').hide();
$('#added-items').css('display','block')
  }
}

    })
  console.log(restockRequiredArr)
displayCheckedItems()

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


