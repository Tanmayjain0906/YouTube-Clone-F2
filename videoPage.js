let curr_location = window.location.href;
let arr = curr_location.split("=");
let video_id = arr[1];

let apiKey = "AIzaSyDUsEjNCN-m2gDf5yj5pOy6ovTWIxmGa-g";
let baseUrl = "https://www.googleapis.com/youtube/v3";
const video_suggestion_url = `https://www.googleapis.com/youtube/v3/videos?`;



let bodyContainer = document.getElementsByClassName("body-container")[0];

async function homePage(result) {
    let url = `${baseUrl}/search?key=${apiKey}&type=channel,video,playlist&q=${result}&part=snippet&maxResults=50`;
    let response = await fetch(url);
    let data = await response.json();


    addDataToLeftBar(data.items);
}
// homePage("coding bollywood songs trending");


function addDataToLeftBar(data) {

    let videoContainer = document.getElementsByClassName("video-container")[0];
    videoContainer.innerHTML = "";

    data.forEach(element => {

        let channel = fetchChannelDetails(element.snippet.channelId);
        channel.then((channelData) => {

            let div = document.createElement("div");
            div.className = "video-card";

            div.innerHTML = `   <div class="left-container">
            <a href="videoPage.html?videoId=${element.id.videoId}"><img src="${element.snippet.thumbnails.high.url}" class="thumbnial"></a>
        </div>

        <div class="right-container">

            <p class="title-info">${element.snippet.title}</p>

            <div class="channel-name">
            ${element.snippet.channelTitle}
            </div>

            <div class="views-post">
                <div class="channel-data">
                    <p class="views">${formatNumber(
                channelData.items[0].statistics.viewCount
            )} views</p>

                    <p class="post-time">&bull; ${new Date(
                channelData.items[0].snippet.publishedAt
            ).toLocaleDateString()}</p>
                </div>
            </div>


        </div>`

            videoContainer.appendChild(div);
        })
    });
}



function formatNumber(num, precision = 2) {
    const map = [
        { suffix: "T", threshold: 1e12 },
        { suffix: "B", threshold: 1e9 },
        { suffix: "M", threshold: 1e6 },
        { suffix: "K", threshold: 1e3 },
        { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
        const formatted = (num / found.threshold).toFixed(precision) + found.suffix;

        return formatted;
    }

    return num;
}

async function fetchVideoDetails(video_id) {
    let url = `${video_suggestion_url}key=${apiKey}&part=snippet,contentDetails,statistics,player&maxResults=50&id=${video_id}`;

    let response = await fetch(url);
    let data = await response.json();

     
    addDataToVideoPlay(data.items);
}

fetchVideoDetails(video_id);



async function addDataToVideoPlay(data) {

    bodyContainer.innerHTML = "";
    let channelData = await fetchChannelDetails(data[0].snippet.channelId);


    let div = document.createElement("div");
    div.className = "play-container";

    div.innerHTML = ` <div class="row">
    <div class="left">

        <div class="play-video">
            ${data[0].player.embedHtml}

            
        </div>

        <div class="tags">
                
            </div>

        <div class="channel-title">
            <h3>${data[0].snippet.localized.title}</h3>
        </div>

        <div class="response">

            <div class="views">
                <p>${formatNumber(data[0].statistics.viewCount)} views</p>
                <p>&bull;${new Date(
        data[0].snippet.publishedAt
    ).toLocaleDateString()}</p>
            </div>

            <div class="likes">
                <a href=""><img src="./Images/like.png">${formatNumber(data[0].statistics.likeCount)}</a>
                <a href=""><img src="./Images/share.png">Share</a>
                <a href=""><img src="./Images/save.png">Save</a>
            </div>

        </div>


        <hr>

        <div class="channel-info">

            <div class="channel-logo">
                <img src="${channelData.items[0].snippet.thumbnails.default.url
        }">
                <div class="channel-info-detail">
                    <p>${data[0].snippet.channelTitle}</p>
                    <span>${formatNumber(channelData.items[0].statistics.subscriberCount)} Subscribers</span>
                </div>
            </div>

            <button class="subs">Subscribe</button>
        </div>

        <div class="description">
            <p>${data[0].snippet.description}</p>
        </div>

        <hr>

        <div class="comments-length">
            <h3></h3>
        </div>

        <div class="leave-comments">
            <img src="./Images/Jack.png">
            <input type="text" placeholder="Write Comment">
        </div>

        <div class="comment-container">
                 
          

            
        </div>

    </div>

    <div class="right">

        <div class="video-container">


        </div>

    </div>
</div>`


    bodyContainer.appendChild(div);
    homePage("coding bollywood songs trending");
    fetchComments(video_id);
    fetchTags(data);
}



async function fetchComments(video_id) {
    let url = `${baseUrl}/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=50`;

    let response = await fetch(url);
    let data = await response.json();

    addDataToComments(data.items);
}




async function fetchChannelDetails(data) {
    let url = `${baseUrl}/channels?part=snippet,statistics,contentDetails&id=${data}&key=${apiKey}`;

    let response = await fetch(url);
    let result = await response.json();

    return result;
}


function addDataToComments(value) {
    let commentContainer = document.getElementsByClassName("comment-container")[0];
    let commentLength = document.querySelector(".comments-length h3");
    commentLength.innerHTML = `${value.length} Comments`
    value.forEach((ele) => {

        let div = document.createElement("div");

        div.className = "comment-card"

        div.innerHTML = `<div class="left-comment-part">
        <img src="${ele.snippet.topLevelComment.snippet.authorProfileImageUrl}" >
     </div>

     <div class="right-comment-part">
       
         <div class="user-name">
               <h3>${ele.snippet.topLevelComment.snippet.authorDisplayName}</h3>
               <p>&bull; ${new Date(
                ele.snippet.topLevelComment.snippet.updatedAt
            ).toLocaleDateString()}</p>
         </div>

         <div class="comment-description">
             <p>${ele.snippet.topLevelComment.snippet.textOriginal}</p>
         </div>
          
         <div class="comment-info">
             <a href=""><img src="./Images/like.png">${formatNumber(ele.snippet.topLevelComment.snippet.likeCount)}</a>
             <p>Reply</p>
             <a href="">All replies</a>
         </div>
     </div>`

     commentContainer.appendChild(div);
    })
}



function fetchTags(tagsData)
{
  let tagContainer = document.getElementsByClassName("tags")[0];

  let arr = tagsData[0].snippet.tags;
  console.log(arr[1]);

  if(arr.length>5)
  {
    arr.splice(5, (arr.length-5));
  }
  
  arr.forEach((tagsEle) => {
    
    let anchor = document.createElement("a");
    anchor.innerHTML = `#${tagsEle}`;
    tagContainer.appendChild(anchor);
  })
}