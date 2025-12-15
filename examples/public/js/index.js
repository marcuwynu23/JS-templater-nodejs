// Get the root element
const root = document.getElementById("root");

// Parse context data if provided
let context = {};
if (root.dataset.content) {
  context = JSON.parse(root.dataset.content);
}

// Render your application
root.innerHTML = `
    <div class="container">
        <h1>${context.title || "Hello World"}</h1>
        <p>Welcome, ${context.user || "Guest"}!</p>
        ${context.message ? `<p class="message">${context.message}</p>` : ""}
        <button onclick="alert('Hello!')">Click Me</button>
    </div>
`;
