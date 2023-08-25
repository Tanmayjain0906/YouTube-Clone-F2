const sidebar = document.getElementsByClassName("yt-sidebar")[0];
const slider = document.getElementsByClassName("ham-bar")[0]

const filter = document.getElementsByClassName("filters")[0];

const videoContainer = document.getElementsByClassName("video-container")[0];

slider.addEventListener("click", () => {
    sidebar.classList.toggle("small-slidebar");
    filter.classList.toggle("big-filter");
    videoContainer.classList.toggle("big-video-container");
})




let apiKey = "AIzaSyDUsEjNCN-m2gDf5yj5pOy6ovTWIxmGa-g";
let baseUrl = "https://www.googleapis.com/youtube/v3";
const video_suggestion_url = `https://www.googleapis.com/youtube/v3/videos?`;

let searchButton = document.getElementById("search");
let searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {

    let result = searchInput.value.trim();

    if (result === "") {
        return;
    }

    getSearchResult(result);
})

async function getSearchResult(result) {

    let url = `${baseUrl}/search?key=${apiKey}&type=channel,video,playlist&q=${result}&part=snippet&maxResults=50`;

    let response = await fetch(url, { method: "GET" });
    let data = await response.json();


    addDataToUISearch(data.items);
}


async function homePage()
{
    let url = `${video_suggestion_url}key=${apiKey}&part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=In`;
    let response = await fetch(url);
    let data = await response.json();

    
    addDataToUI(data.items);
}
homePage();

function addDataToUISearch(data) {
    videoContainer.innerHTML = "";

    data.forEach(element => {
        
        let channel = fetchChannelDetails(element.snippet.channelId);
        channel.then((channelData) => {
            
            let div = document.createElement("div");
            div.className = "video-card";

            div.innerHTML = `<div class="upper">
        <a href="videoPage.html?videoId=${element.id.videoId}"><img src="${element.snippet.thumbnails.high.url}" class="thumbnial"></a>
    </div>

    <div class="lower">

        <div class="channel-container">

            <img src="${channelData.items[0].snippet.thumbnails.default.url
                }"" class="channel-logo">

            <div class="right">

                <p class="title-info">${element.snippet.title}</p>

                <div class="channel-name">
                    ${element.snippet.channelTitle}
                </div>
                   
                <div class="channel-data">
                    <p class="views">${formatNumber(
                        channelData.items[0].statistics.viewCount
                      )} views</p>

                    <p class="post-time">&bull; ${new Date(
                    channelData.items[0].snippet.publishedAt
                ).toLocaleDateString()}</p>
                </div>

            </div>
        </div>
        
    </div>`

   
            videoContainer.appendChild(div);
        })
    });

    
}

function addDataToUI(data) {
    videoContainer.innerHTML = "";

    data.forEach(element => {
        
        let channel = fetchChannelDetails(element.snippet.channelId);
        channel.then((channelData) => {
            
            let div = document.createElement("div");
            div.className = "video-card";

            div.innerHTML = `<div class="upper">
        <a href="videoPage.html?videoId=${element.id}"><img src="${element.snippet.thumbnails.high.url}" class="thumbnial"></a>
    </div>

    <div class="lower">

        <div class="channel-container">

            <img src="${channelData.items[0].snippet.thumbnails.default.url
                }"" class="channel-logo">

            <div class="right">

                <p class="title-info">${element.snippet.title}</p>

                <div class="channel-name">
                    ${element.snippet.channelTitle}
                </div>
                   
                <div class="channel-data">
                    <p class="views">${formatNumber(
                        channelData.items[0].statistics.viewCount
                      )} views</p>

                    <p class="post-time">&bull; ${new Date(
                    channelData.items[0].snippet.publishedAt
                ).toLocaleDateString()}</p>
                </div>

            </div>
        </div>
        
    </div>`

   
            videoContainer.appendChild(div);
        })
    });

    
}

async function fetchChannelDetails(data) {
    let url = `${baseUrl}/channels?part=snippet,statistics,contentDetails&id=${data}&key=${apiKey}`;

    let response = await fetch(url);
    let result = await response.json();

    return result;
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