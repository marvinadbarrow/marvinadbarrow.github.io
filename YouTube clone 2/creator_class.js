

// class for creating 'creator modal elements'
export default class CreateModalDetails {
    constructor(link, iconAddress, paraText){
this.address = link;
this.image = iconAddress;
this.text = paraText;

    }
}

// element template to be loaded dynamically
export const appendCreatorElements = (elements) =>{
let creatorElement = `
<a href="${elements.address}"><div class="creator-containers">
<div class="creator-icon-container">
  <img src="${elements.image}" alt="" class="creator-icon">
</div>

<div class="creator-para-container">
<p class="creator-para">${elements.text}</p>
<div class="creator-empty-para"></div>
</div>

</div></a>
`

$('#creator-content').append(creatorElement)
}