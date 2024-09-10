const urlParams = new URLSearchParams(window.location.search);
const myDate = urlParams.get('date');
let date = new Date();

if (myDate != undefined) {
    date = new Date(myDate);
}

function updateinfo(myDate) {
    console.log(myDate)
    // Define the API URL
const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + new Date(myDate).toISOString().split('T')[0];;

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
  updateinfo(date.setDate(date.getDate() - 1))
}
function tomorrowDay() {
  updateinfo(date.setDate(date.getDate() + 1))
}

updateinfo(date)
