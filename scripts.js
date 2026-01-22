let selectedSentence = [];
let authenticatedUser = null;

/* ---------- AUTH ---------- */

function showLogin() {
    hideAuthForms();
    document.getElementById("login").classList.remove("hidden");
}

function showSignup() {
    hideAuthForms();
    document.getElementById("signup").classList.remove("hidden");
}

function hideAuthForms() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("signup").classList.add("hidden");
}

function goBack() {
    hideAuthForms();
}

function login() {
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;

    // Demo authentication
    if (user === "user" && pass === "password") {
        authenticatedUser = user;
        openCategory();
    } else {
        alert("Invalid credentials");
    }
}

function signup() {
    const user = document.getElementById("signup-username").value;
    const pass = document.getElementById("signup-password").value;

    // Demo storage (NOT secure – demo only)
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    authenticatedUser = user;
    openCategory();
}

function logout() {
    authenticatedUser = null;
    document.getElementById("category").classList.add("hidden");
    document.getElementById("auth").classList.remove("hidden");
}

/* ---------- NAVIGATION ---------- */

function openCategory() {
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("category").classList.remove("hidden");
}

function goBackToCategory() {
    document.getElementById("pictures").classList.add("hidden");
    document.getElementById("category").classList.remove("hidden");
}

function goBackToPictures() {
    document.getElementById("sentence-formation").classList.add("hidden");
    document.getElementById("pictures").classList.remove("hidden");
}

/* ---------- DATA ---------- */

const categories = {
    People: [
        { name: "He", src: "images/people/he.jpg" }
    ],
    Food: [
        { name: "Bread", src: "images/food/bread.jpg" },
        { name: "Rice", src: "images/food/rice.jpg" }
    ],
    Animals: [
        { name: "Dog", src: "images/animals/dog.jpg" }
    ]
};

/* ---------- LOGIC ---------- */

function selectCategory(category) {
    document.getElementById("category").classList.add("hidden");
    document.getElementById("pictures").classList.remove("hidden");

    const pictureList = document.getElementById("picture-list");
    pictureList.innerHTML = "";

    categories[category].forEach(item => {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.name;
        img.onclick = () => addPicture(item);
        pictureList.appendChild(img);
    });
}

function addPicture(item) {
    const sentenceDiv = document.getElementById("sentence");

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.name;
    img.onclick = () => removePicture(img, item.name);

    sentenceDiv.appendChild(img);
    selectedSentence.push(item.name);

    document.getElementById("sentence-formation").classList.remove("hidden");
}

function removePicture(img, name) {
    img.remove();
    selectedSentence = selectedSentence.filter(word => word !== name);
}

function playSentence() {
    const text = selectedSentence.join(" ");
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function clearSentence() {
    document.getElementById("sentence").innerHTML = "";
    selectedSentence = [];
    document.getElementById("sentence-formation").classList.add("hidden");
}
