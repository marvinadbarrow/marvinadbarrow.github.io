export const buildProduct = (productName, category, categoriesArray) =>{
    let obj ={
    categoryName: category,
    itemName: productName,
    imgAddress: './default_img.png',
    id: productName.replace(' ', '-'), 
    category_index: '',
    }// object created to be added to category array for later retrieveal
    categoriesArray.forEach(array =>{
      if(array.catName === category){
    let index = categoriesArray.indexOf(array)// get index of array
    obj.category_index = index;
      }
    })
     return(obj)

    }