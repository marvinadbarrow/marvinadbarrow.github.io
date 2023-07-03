
// generate size for new landscape thumbnail

let x = 300;

const newImgSizeLandscape = (widthOrigin, heightOrigin, widthNew) =>{
heightNew = Math.floor((widthNew*heightOrigin)/widthOrigin);
return  widthNew + " x " + heightNew;}

const newImgLandscape = newImgSizeLandscape(1275,539,x)
console.log(newImgLandscape, " landscape");




// generate size for new PORTRAIT thumbnail
let y = 200;

const newImgSizePortrait = (widthOrigin, heightOrigin, heightNew) =>{
widthNew = Math.floor((widthOrigin*heightNew)/heightOrigin);
return  widthNew + " x " + heightNew;}

const newImgPortrait = newImgSizePortrait(281,409,y)
console.log(newImgPortrait, " portrait");

