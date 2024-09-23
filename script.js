const urlParams = new URLSearchParams(window.location.search);
var paramdate = new Date(urlParams.get('date'));
var APIKEYALREADYINSERT
const todayDate = new Date();
if (paramdate == 'Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)' ){
  paramdate = new Date(todayDate);
}

function APIKEYINSERT() {
  let text;
  APIKEYALREADYINSERT = prompt("Please enter your API key:", "");
  if (APIKEYALREADYINSERT == null || APIKEYALREADYINSERT == "") {
    text = "User cancelled the prompt.";
  } else {
    console.log(APIKEYALREADYINSERT);
    localStorage.setItem('APIKEY', APIKEYALREADYINSERT)
    updateinfo(APIKEYALREADYINSERT)

  }
}





function updateinfo(paramdate) {

    // Define the API URL
  window.history.pushState("", "title", "/kata-APOD/index.html?date=" + new Date(paramdate).toISOString().split('T')[0]);
  const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + localStorage.getItem('APIKEY') + '&date=' + new Date(paramdate).toISOString().split('T')[0];
// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    console.log(data.date)

    if (data.media_type == "video") {
        //afficher vidéo et cacher image 
        document.getElementById("media-video").src = data.url;
        document.getElementById("media-image").style.display = 'none';
        document.getElementById("media-video").style.display = 'block';
    } else {
        //afficher image et cacher vidéo
        document.getElementById("media-image").src = data.url;
        document.getElementById("media-video").style.display = 'none';
        document.getElementById("media-image").style.display = 'block';
    }
    let btn = document.getElementById("LA");
    btn = document.getElementById("LA");
    console.log(btn)
      btn.addEventListener("click", previousDay);
      if (paramdate < todayDate) {
        document.getElementById("RA").style.display = 'inline';
      }
      else {
        document.getElementById("RA").style.display = 'none';
      }
      let btn1 = document.getElementById("RA");
    console.log(btn)
        btn1.addEventListener("click", tomorrowDay);

    document.getElementById("image-date").innerHTML = data.date
    document.getElementById("description").innerHTML = data.explanation
    document.getElementById("image-title").innerHTML = data.title
      document.getElementById("copyright").innerHTML = data.copyright
      document.getElementById("linkimage").href = data.hdurl

})
  .catch(error => {
    console.error('Error:', error);
  });
}

function previousDay() {
  paramdate.setDate(paramdate.getDate() - 1);
  updateinfo(paramdate);
}
function tomorrowDay() {
  paramdate.setDate(paramdate.getDate() + 1);
  updateinfo(paramdate)
}
updateinfo(paramdate);
