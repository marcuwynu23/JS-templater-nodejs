// Get the root element
const root = document.getElementById("root");

// Parse context data
let context = {};
if (root.dataset.content) {
  context = JSON.parse(root.dataset.content);
}

// Render dashboard
root.innerHTML = `
    <div class="dashboard">
        <header>
            <h1>Dashboard</h1>
            <div class="user-info">
                <p>Welcome, ${context.user?.name || "Guest"}</p>
                <span>${context.user?.email || ""}</span>
            </div>
        </header>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Users</h3>
                <p class="stat-value">${context.stats?.totalUsers || 0}</p>
            </div>
            <div class="stat-card">
                <h3>Active Users</h3>
                <p class="stat-value">${context.stats?.activeUsers || 0}</p>
            </div>
            <div class="stat-card">
                <h3>Revenue</h3>
                <p class="stat-value">$${
                  context.stats?.revenue?.toLocaleString() || 0
                }</p>
            </div>
        </div>
    </div>
`;
