//

// my channel id
let youtubeId = 'UCpCdAp4bI9IPGAFa_jIW0XA'
let key = 'AIzaSyAC3lYXGeYIxev1b07LLBn5s0HCzEb2UWw'

/*
 GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UCpCdAp4bI9IPGAFa_jIW0XA&maxResults=50&key=[AIzaSyAC3lYXGeYIxev1b07LLBn5s0HCzEb2UWw] HTTP/1.1

let Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json

*/


/* 

<script src="https://apis.google.com/js/api.js"></script>
<script>

*/


  /**
   * Sample JavaScript code for youtube.channels.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.channels.list({
      "part": [
        "snippet"
      ],
      "id": [
        "UCpCdAp4bI9IPGAFa_jIW0XA"
      ],
      "maxResults": 50
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });


/*

</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>
*/



// fetch for the YouTube 50 videos

const myUploads = (url) =>{

fetch(url)
.then(res =>{
    return res.json
})
.then(data =>{

    data.items.forEach(video =>{
        console.log(video.snippet.title)
    })
})

}
/*
myUploads('https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UCpCdAp4bI9IPGAFa_jIW0XA&maxResults=50&key=[AIzaSyAC3lYXGeYIxev1b07LLBn5s0HCzEb2UWw')
*/