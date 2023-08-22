const sidebar = document.getElementsByClassName("yt-sidebar")[0];
const slider = document.getElementsByClassName("ham-bar")[0]

slider.addEventListener("click", () => {
    sidebar.classList.toggle("small-slidebar");
})




// let apiKey = "AIzaSyDUsEjNCN-m2gDf5yj5pOy6ovTWIxmGa-g";
// let baseUrl = "https://www.googleapis.com/youtube/v3";

// let searchButton = document.getElementById("search");
// let searchInput = document.getElementById("search-input");

// searchButton.addEventListener("click", ()=> {

//     let result = searchInput.value.trim();

//     if(result === "")
//     {
//         return;
//     }

//     getSearchResult(result);
// })

// async function getSearchResult(result)
// {

//     let url = `${baseUrl}/search?key=${apiKey}&q=${result}&part=snippet&maxResults=10`;
     

//     let response = await fetch(url);
//     let data = await response.json();

//     console.log(data);
// }