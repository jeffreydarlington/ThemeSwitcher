const toggleSwitch = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme (now using async/await for demonstration)
async function loadTheme() {
    const savedTheme = await Promise.resolve(localStorage.getItem("theme") ?? "");
    if (savedTheme === "dark-mode") {
        body.classList.add("dark-mode");
        toggleSwitch.checked = true; // Ensure the switch is ON
    }
}

// Debounce function with arrow function syntax
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Toggle theme function with async localStorage update
const toggleTheme = async () => {
    body.classList.toggle("dark-mode");

    // Save theme asynchronously using a Promise
    await new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark-mode" : "");
            resolve();
        }, 100);
    });
};

// Attach event listener with debounced function
toggleSwitch.addEventListener("change", debounce(toggleTheme, 300));

// Call the async function to load theme on page load
loadTheme();
