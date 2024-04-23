// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const ramenDetail = document.getElementById("ramen-detail");
  ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
      <h2 class="name">${ramen.name}</h2>
      <h3 class="restaurant">${ramen.restaurant}</h3>
      <h3>Rating:</h3>
      <p><span id="rating-display">${ramen.rating}</span> / 10</p>
      <h3>Comment:</h3>
      <p id="comment-display">${ramen.comment}</p>
    `;
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newRamen = {};
    formData.forEach((value, key) => {
      newRamen[key] = value;
    });
    // Adding the new ramen to the menu
    const ramenMenu = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));
    ramenMenu.appendChild(img);
    form.reset();
  });
};

const displayRamens = async () => {
  const response = await fetch("http://localhost:3000/ramens");
  const ramens = await response.json();
  const ramenMenu = document.getElementById("ramen-menu");
  console.log("ramenMenu:", ramenMenu); // Check if ramenMenu is correctly obtained
  ramens.forEach((ramen) => {
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;
    console.log("img:", img); // Check if img is correctly created
    ramenMenu.appendChild(img);
    console.log("img after append:", img); // Check if img is still accessible after append
    img.addEventListener("click", () => handleClick(ramen));
  });
};

const main = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    await displayRamens(); // Invoke displayRamens here
    addSubmitListener(); // Invoke addSubmitListener here
  });
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
