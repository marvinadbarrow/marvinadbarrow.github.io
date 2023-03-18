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
var modalArr  = ['add-items','submit-items', 'verify-items', 'get-list', 'add-to-basket', 'checkout', 'complete-purchase','get-delivery', 're-stock']

// button id's
var buttonsArr = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8','btn9']

// display modal corresponding with button press
document.addEventListener('click', function(e){
console.log(e.target.id)
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