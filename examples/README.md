# JS-templater Examples

This directory contains example implementations of JS-templater.

## Setup

1. Install dependencies:
```bash
npm install express js-templater
```

2. Run the example server:
```bash
node server.js
```

3. Open your browser and navigate to:
- http://localhost:3000/ - Home page with context
- http://localhost:3000/dashboard - Dashboard with complex context
- http://localhost:3000/profile - Profile page
- http://localhost:3000/simple - Simple page without context

## Project Structure

```
examples/
├── server.js              # Express.js server example
├── public/
│   ├── css/
│   │   └── style.css      # Stylesheet
│   └── js/
│       ├── index.js       # Home page template
│       ├── dashboard.js   # Dashboard template
│       ├── profile.js     # Profile template
│       └── simple.js      # Simple template
└── README.md
```

## JavaScript Templates

All JavaScript templates follow the same pattern:

1. Get the root element: `document.getElementById("root")`
2. Parse context data from `root.dataset.content` (if available)
3. Render the application using the context data

## Customization

You can modify the examples to suit your needs:

- Update `server.js` to add new routes
- Modify JavaScript templates in `public/js/` to change the UI
- Customize styles in `public/css/style.css`
- Pass different context data to templates

