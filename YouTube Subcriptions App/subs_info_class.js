export  class VideoDetails {
    constructor(thumbnailAddress, channelAddress, channelName, channelDescription){
        this.logo = thumbnailAddress;
        this.channelAddress = channelAddress;
        this.channelName = channelName;
        this.description = channelDescription;
        }
     };

// function to dynamically load video information
//export

export const appendVideoDetails = (vidInfo) =>{
    const videoThumnail = `
    <div class="video-container"><div class="video-thumbnail-container">
        <a href="${vidInfo.channelAddress}"><img class="video-thumbnail" src="${vidInfo.logo}" ></a></div>

    <div class="channel-name-holder"><p class="channel-name"><a class="channel-name-anchor" href="${vidInfo.channelAddress}">${vidInfo.channelName}</a></p><span class="checkmark">&#10003;</span>
    </div>

    <div class="details-holder"><div class="video-links"><a class="descriptions-anchor" href="${vidInfo.channelAddress}"><p class="description multiline-ellipsis" >${vidInfo.description}</p></a></a>
            </div>
        </div>
    </div>
</div>
`
// append video information to container
$('.rows').append(videoThumnail)
}

