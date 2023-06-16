
// BUILD NEW CATEGORY
   export const buildCategory = (category) =>{
    // replace all spaces with dashes (for id format)
    let newCategory = `<div id="${category.replace(' ', '-')}" class="categories"><p class="category-para">${category}</p> <img class="category-img" src="./default_img.png" alt="shopping basket"></div>`
    $('#category-container').append(newCategory)
    // create a category object to populate when new products are added
    let obj = {catName: category.replace(' ', '-'), items: []}
       return(obj)
        }

