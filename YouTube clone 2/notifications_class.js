export default class NotificationDetails {

constructor(notificationAddress, logoImage, logoAltText, titleText, ageText, thumbnailImage, thumbnailAltText, menuImage, menuAltText){
    this.address = notificationAddress;
    this.logo = logoImage;
    this.logoAlt = logoAltText;
    this.title = titleText;
    this.age = ageText;
    this.thumbnail = thumbnailImage;
    this.thumbnailAlt = thumbnailAltText;
    this.menu = menuImage;
    this.menuAlt = menuAltText;

}

}

// function to dynamically load notifications
export const appendNotifictions = (info) =>{
    const notification = `
    <a href="${info.address}"><div class="notifications-containers">
    <div class="notifications-logo-container">
      <img src="${info.logo}" alt="${info.logoAlt}" class="notifications-logo">
    </div>
    
    <div class="notifications-para-container">
    <p class="notifications-video-para">${info.title}</p>
    <p class="notifications-time-para">${info.age}</p>
    </div>
    
    <div class="notifications-thumbnail-container">
    <img src="${info.thumbnail}" alt="${info.thumbnailAlt}" class="notifications-thumbnail">
    </div>
    
    <div class="notifications-dot-menu-container">
    <img src="${info.menu}" class="notifications-dot-menu" alt="${info.menuAlt}">
    </div>
    </div></a>
    `
    $('#notification-body').append(notification)
    }