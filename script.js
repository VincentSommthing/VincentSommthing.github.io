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
	newImage.className += "listImg";
	newImage.setAttribute("src", item.url);
	newImage.style.width = "100%";
	newImage.onclick = onImgClick;

	const imgContainer = document.createElement("div");
	imgContainer.className += "imgContainer";
	imgContainer.appendChild(newImage);

	imgListEl.appendChild(imgContainer);
}

const megaImg = document.getElementById("megaImg");
const megaContainer = document.getElementById("megaImgContainer");
const zoomBg = document.getElementById("zoomBG");

megaContainer.onclick = leaveZoom;
megaImg.onclick = leaveZoom;
var selectedImgRect;
var selectedImg;
var selectedImgContainer;
//https://stackoverflow.com/questions/21686827/css-transform-a-div-without-affecting-surrounding-content
//https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
function onImgClick(e) {
	selectedImg = this;
	selectedImgContainer = this.parentNode;

	//set the zoom image container to be where the original image is
	let rect = selectedImgContainer.getBoundingClientRect();
	megaContainer.style.left = rect.x + "px";
	megaContainer.style.top = rect.y + "px";
	megaContainer.style.width = rect.width + "px";
	megaContainer.style.height = rect.height + "px";
	//https://stackoverflow.com/questions/32481972/transition-not-working-when-changing-from-display-none-to-block
	zoomBg.style.display = "block";
	megaContainer.style.display = "flex";

	setTimeout(function() {
		zoomBg.classList.add("zoomActive");
		megaContainer.classList.add("zoomActive");
		megaImg.classList.add("zoomActive");

		//zoom up the image container to fill the whole screen
		megaContainer.style.left = "0px";
		megaContainer.style.top = "0px";
		megaContainer.style.width = "100vw";
		megaContainer.style.height = "100vh";
	}, 0);

	//https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element

	this.classList.add("zoomActive");
	megaImg.setAttribute("src", this.getAttribute("src"));
}

function leaveZoom(e) {
	zoomBg.classList.remove("zoomActive");
	megaContainer.classList.remove("zoomActive");
	megaImg.classList.remove("zoomActive");
	megaImg.classList.add("zoomOut");

	//set position and dimensions back to original image
	let rect = selectedImgContainer.getBoundingClientRect();
	megaContainer.style.left = rect.x + "px";
	megaContainer.style.top = rect.y + "px";
	megaContainer.style.width = rect.width + "px";
	megaContainer.style.height = rect.height + "px";

	setTimeout(function() {
		zoomBg.style.display = "none";
		megaContainer.style.display = "none";
		selectedImg.classList.remove("zoomActive");
		megaImg.classList.remove("zoomOut");
	}, 500);
}