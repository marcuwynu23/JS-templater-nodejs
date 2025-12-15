# JS-templater

A Node.js library/tool to use pure DOM JavaScript rendering with a view engine. JS-templater allows you to build modern web applications by rendering JavaScript templates on the server side while maintaining a clean separation between your Node.js backend and JavaScript frontend.

## Features

- 🚀 **Simple Integration**: Easy to integrate with Express.js and other Node.js web frameworks
- 🎨 **Pure JavaScript**: Use vanilla JavaScript for rendering, no framework dependencies
- 📦 **Template Engine**: Server-side template generation with context data passing
- 🔧 **Flexible**: Pass JSON context data to your JavaScript templates
- 📝 **Clean HTML**: Generates clean, semantic HTML structure

## Installation

```bash
npm install js-templater
```

Or install from source:

```bash
git clone https://github.com/marcuwynu23/JSTemplater-NodeJS.git
cd JSTemplater-NodeJS
npm install
```

## Quick Start

### 1. Basic Express.js Setup

```javascript
const express = require('express');
const JSTemplate = require('js-templater');

const app = express();

// Initialize JSTemplate with your static files root
const jsTemplate = new JSTemplate('/static/');

// Serve static files
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  // Render a JavaScript template
  const html = jsTemplate.render('index', {
    title: 'Welcome',
    user: 'John'
  });
  res.send(html);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 2. Project Structure

Your Node.js application should have the following structure:

```
your-app/
├── server.js
└── public/
    ├── css/
    │   └── style.css
    └── js/
        └── index.js
```

### 3. JavaScript Template Example

Create `public/js/index.js`:

```javascript
// Get the root element
const root = document.getElementById("root");

// Parse context data if provided
let context = {};
if (root.dataset.content) {
  context = JSON.parse(root.dataset.content);
}

// Render your application
root.innerHTML = `
    <h1>${context.title || "Hello World"}</h1>
    <p>Welcome, ${context.user || "Guest"}!</p>
`;
```

## API Reference

### `JSTemplate(staticRoot)`

Initialize the JSTemplate engine.

**Parameters:**

- `staticRoot` (string): The root path for static files (e.g., '/static/')

**Example:**

```javascript
const jsTemplate = new JSTemplate('/static/');
```

### `render(scriptName, context)`

Render a JavaScript template.

**Parameters:**

- `scriptName` (string): Name of the JavaScript file (without .js extension)
- `context` (object, optional): Context data to pass to the template as JSON

**Returns:**

- `string`: Complete HTML document with embedded script

**Example:**

```javascript
const html = jsTemplate.render('dashboard', {
  users: ['Alice', 'Bob']
});
```

## Examples

See the [examples](./examples/) directory for more detailed usage examples.

## Testing

Run tests using Jest:

```bash
npm test
```

Or run tests in watch mode:

```bash
npm run test:watch
```

## Requirements

- Node.js >= 10.0.0
- Express.js (for web framework integration) or any Node.js HTTP server

## License

See [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Mark Wayne B. Menorca
