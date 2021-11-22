// https://www.w3schools.com/xml/xml_http.asp
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 200 | this.status == 0)) {
       setUpImages(xhttp.responseText);
    }
};
xhttp.open("GET", "images.json", true);
xhttp.send();

const imgListEl = document.getElementById("imgList");

function setUpImages(stuff) {
	imgs = JSON.parse(stuff);
	//shuffle images
	var shuffled = [];
	for(var i = imgs.length-1; i>=0; i--) {
		const index = Math.floor(Math.random()*imgs.length);
		shuffled.push(imgs[index]);
		imgs.splice(index,1);
	}

	shuffled.forEach(createImage);
}

//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
function createImage(item) {
	const newImage = document.createElement("img");
	newImage.className += "equalSpacing";
	newImage.setAttribute("src", item.url);
	newImage.style.width = "100%";
	imgListEl.appendChild(newImage)
}