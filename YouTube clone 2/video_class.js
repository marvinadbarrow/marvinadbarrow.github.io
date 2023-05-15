 export default class VideoDetails {
    constructor(videoAddress, thumbnailAddress, thumbnailAlt, VideoDuration, channelAddress, anchorId, channelLogoAddress, logoId,  channelLogoAlt, vidTitle, channelName, views, age){
        // 
        this.address = videoAddress;
        this.thumbnail = thumbnailAddress;
        this.videoAlt = thumbnailAlt;
        this.duration = VideoDuration;
        this.channelAddress = channelAddress;
        this.id = anchorId;
        this.logo = channelLogoAddress;
        this.logoId = logoId;
        this.channelLogoAlt = channelLogoAlt;
        this.title = vidTitle;
        this.channelName = channelName;
        this.views = views;
        this.age = age; 
    
    }
    
    
    
    };

// function to dynamically load video information
export const appendVideoDetails = (vidInfo) =>{
    const videoThumnail = `
        <div class="video-container">

            <div class="video-thumbnail-container">
            <a href="${vidInfo.address}"><img class="video-thumbnail" src="${vidInfo.thumbnail}" alt="${vidInfo.videoAlt}"> <div class="video-time">${vidInfo.duration}</div></a>
            </div>

            <div class="video-links">
            <a id="${vidInfo.id}"  class="logo-anchor" href="${vidInfo.channelAddress}"><img id="${vidInfo.logoId}" class="logo" src="${vidInfo.logo}" alt="${vidInfo.channelAlt}"></a>

                <div class="details-holder">
                        <a href="${vidInfo.address}"><p class="titles">${vidInfo.title}</p></a>

                        <div class="channel-name-holder">
                        <p class="channel-name"><a class="channel-name-anchor" href="${vidInfo.channelAddress}">${vidInfo.channelName}</a></p><span class="checkmark">&#10003;</span>
                        </div>


                    <div class="stats-holder">
                    <a class="stats-anchor" href="${vidInfo.address}">
                    <p class="video-stats"><span class="views">${vidInfo.views}</span><span class="hours">${vidInfo.age}</span></p>
                    </a>
                    </div>
                </div>
            </div>
       </div>
`
// append video information to container
$('.rows').append(videoThumnail)
}