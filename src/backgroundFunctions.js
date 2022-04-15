const backgroundDiv = document.getElementById("background-image");
const imageCaption = document.getElementById("image-caption");

export default async function updateBackground(currentCity) {
  let imageRequest = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${currentCity}&client_id=9G-bR8MIRPVXbYXAaK1zL5qBJuRb4X49j57SMk7E-HY&orientation=landscape`
  );
  let imageResponse = await imageRequest.json();
  let imageIndex = randomNum();
  let imageUrl = await imageResponse.results[imageIndex].urls.full;
  let imageCredit =
    await `${imageResponse.results[imageIndex].user.first_name} ${imageResponse.results[0].user.last_name}`;
  imageCaption.href = imageResponse.results[0].links.html;
  imageCaption.textContent = `${imageCredit} / Unsplash`;
  backgroundDiv.style.backgroundImage = `url(${imageUrl})`;
}

function randomNum() {
  return Math.floor(Math.random() * 10);
}
