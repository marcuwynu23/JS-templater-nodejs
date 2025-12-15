// Get the root element
const root = document.getElementById("root");

// Parse context data
let context = {};
if (root.dataset.content) {
  context = JSON.parse(root.dataset.content);
}

// Render profile page
root.innerHTML = `
    <div class="profile">
        <h1>User Profile</h1>
        
        <div class="profile-card">
            <h2>${context.user?.name || "Unknown User"}</h2>
            <p><strong>Email:</strong> ${context.user?.email || "N/A"}</p>
            <p><strong>Bio:</strong> ${
              context.user?.bio || "No bio available"
            }</p>
        </div>
        
        <div class="preferences">
            <h3>Preferences</h3>
            <ul>
                <li><strong>Theme:</strong> ${
                  context.preferences?.theme || "light"
                }</li>
                <li><strong>Notifications:</strong> ${
                  context.preferences?.notifications ? "Enabled" : "Disabled"
                }</li>
            </ul>
        </div>
        
        <button onclick="console.log('Profile updated!')">Update Profile</button>
    </div>
`;
