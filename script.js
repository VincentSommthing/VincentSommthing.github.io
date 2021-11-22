// https://www.w3schools.com/xml/xml_http.asp
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 200 | this.status == 0)) {
       setUpImages(JSON.parse(xhttp.responseText));
    }
};
xhttp.open("GET", "images.json", true);
xhttp.send();

function setUpImages() {
	//shuffle images
	var shuffled = [];
	for(var i = images.length-1; i>=0; i--) {
		const index = Math.floor(Math.random()*images.length);
		shuffled.push(images[index]);
		images.splice(index,1);
	}

	shuffled.forEach(createImage);
}

//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
function createImage(item) {
	const newImage = document.createElement('img');
	newImage.setAttribute("src", item.url)
	newImage.style.width = "100%"
	document.body.appendChild(newImage);
}
