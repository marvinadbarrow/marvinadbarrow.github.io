 // $('p#para-2').hide()
//$('p#para-1').addClass('add-red')
//$('#para-2 span').addClass('add-red')
//$('#para-2 span').css('color', 'purple')
//$('#list-1 li:nth-child(2n)').css('background-color', 'orange')
//$('#list-1 li:even').css('background-color', 'aqua')


  $('a[href="http://yahoo.com"]').css('background-color', 'aqua')
  //$('*').hide()  

  $('p#para-1').click(function(){
$(this).toggleClass('add-red')

  })
// highlight background of input when clicked into
  $('#get-item').focus(function(){
$(this).css({'background-color':'pink'})

  })

// log value entered into input
$('#get-item').keyup(function(e){
if(e.key == 'Enter'){ // if enter key is struck

  // append text to unordered list as list item; the item is a checkbox with label of the item entered into the input
  $('ul').append(`<li> <input type="checkbox" name="buy-more" id="${e.target.value}" value="${e.target.value}"> <label for="${e.target.value}">${e.target.value}</label></li>`)
  $(this).val('') // this clears the value inside the input
  // see explanation below
}
  
    })



// notes on above function.... every time 'Enter' is pressed the input text gets appended as a list item, with an accompanying checkbox which has an id, a value (the name of the shopping item) and a name (which sort of gives the purpose of the value) and a label (which is the actual item to be purchased) --

// hopefully I can use the ticked checkbox to indicate that I have collected the item for purchase.  I can then send all ticked items to the basket for processing (or you can send them individually as you go); maybe in the 'checkout' page, that's where you can specify how much of each product is purchased, or you can put 'zero' if you retract an item. Also, when you get to the checkout page you might do an alert if there are any un-purchased items to double-check that you don't wish to purchase them.  Maybe have an ignore button, or go back to shopping basket for parchases; and then return to the checkout once those purchases are made.  On the same page you could have a purchase completed button for when you've bought everything.   You need to save the data so you have to find out how to do that, maybe you could email it, and save it json-ified to local storage, perhaps creating a new object out of thet shopping date.  - once home the saved data can be un-json-ified, displayed in a list of items of items to store, and perhaps  you can have a drop down field of all storage locations next to each item - pick the item and click store, then page refreshes and item disappears; ready for you to store the next item.  

// I think the label is actually a label for the checkbox - so it appears next to the checkbox that it is associated with; so you don't really need to specify the wording for the list item because it will appear in the label in a better position than list wording.  Also, put list-style-type:none; in CSS so the bullet points don't show when the list item is appended, so things look more presentable. 


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


// below, each array, corresponding to one of each of the shopping main categories, contains the image names for items within the name category of the array. When a category is clicked, the images belonging to that category will load into the 'select' popup. 
var fishArr = ['./images fish/crab sticks.png', './images fish/fish cakes.png']
var meatArr = ['./images meat/bacon.png', './images meat/quiche meat.png', './images meat/tortelloni meat.png']
var vegetarianArr = ['./images vegetarian/quiche veg.png', './images vegetarian/tortelloni veg.png']
var dairyArr = ['./images dairy/milk.png', './images dairy/cheese.png', './images dairy/cold latte.png']
var fruitVegArr = ['./images fruit & veg/carrots.png', './images fruit & veg/corn cob.png', './images fruit & veg/tomatoes.png']
var bakeryArr = ['./images bakery/biscuits.png', './images bakery/cookies.png', './images bakery/breadloaf.png', './images bakery/breadroll.png']
var pastryArr = ['./images pastry/cinnamon swirl.png', './images pastry/maple pecan.png', './images pastry/flapjacks.png']
var hotDrinksArr = ['./images hot drinks/coffee.png', './images hot drinks/hot chocolate.png', './images hot drinks/ovaltine.png', './images hot drinks/tea.png']
var coldDrinksArr = ['./images cold drinks/coca cola.png', './images cold drinks/dr pepper.png']
var AlcoholArr = ['./images alcohol/crabbies.png']
var toiletriesArr = ['./images toiletries/air freshener.png', './images toiletries/hand wash.png', './images toiletries/lynx.png', './images toiletries/shower gel.png', './images toiletries/toilet tissue.png', './images toiletries/toothbrush.png', './images toiletries/toothpaste.png']
var cleaningArr = ['./images cleaning/bleach.png', './images cleaning/surface cleaner.png', './images cleaning/washing powder.png', './images cleaning/washing up liquid.png']
var miscArr = ['./images misc/monkey nuts.png', './images misc/popcorn.png']
/*
var categoryArr = ['fish', 'meat', 'vegetarian', 'dairy', 'fruit-veg', 'bakery', 'pastry', 'hot-drinks', 'cold-drinks', 'alcohol', 'toiletries', 'cleaning', 'misc' ]

var categoryImgArr = [fishArr, meatArr, vegetarianArr, dairyArr, fruitVegArr, bakeryArr, pastryArr, hotDrinksArr, coldDrinksArr, AlcoholArr, toiletriesArr, cleaningArr, miscArr]
*/
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

$('#back-btn').click(function(){
  $('#sub-item-select').hide();
  $('#add-items').css('display','block')
// remove all item divs which are children of the 'select' modal
let selectHolder = document.getElementById('items-for-selection')
  while (selectHolder.firstChild) {
    selectHolder.removeChild(selectHolder.firstChild);
}

})


// prepare and load images to display items in selected category
const loadItems = (array) =>{
console.log(array)

array.forEach(element =>{
// holder setup
let itemDiv = document.createElement('DIV')
itemDiv.classList.add('image-checkbox-holder')

// img setup
let itemImg = document.createElement('IMG')
itemImg.classList.add('item-image')
itemImg.setAttribute('src', element)

// checkbox setup
let itemCheck = document.createElement('INPUT')
itemCheck.setAttribute('type', 'checkbox')
itemCheck.classList.add('checkbox')

console.log(itemDiv)


document.getElementById('items-for-selection').appendChild(itemDiv)
itemDiv.appendChild(itemCheck)
itemDiv.appendChild(itemImg)
$('#sub-item-select').css('display','block');
$('#add-items').hide()

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

// now to dynamically display images on 'select' modal. 




/*

modalArr.forEach(element =>{
$(`#${element}`).on('click', function(){
  $('#sub-item-select').css('display','block');
  $('#add-items').hide();
})

})


*/