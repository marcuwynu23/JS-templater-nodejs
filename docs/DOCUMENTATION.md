# JS-templater Documentation

## Overview

JS-templater is a Node.js library that provides a template engine for web applications, allowing you to render JavaScript-based views on the server side. It generates HTML documents with embedded JavaScript modules that can access context data passed from your Node.js backend.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Classes](#classes)
- [Usage Patterns](#usage-patterns)
- [Best Practices](#best-practices)

## Installation

```bash
npm install js-templater
```

## Getting Started

### Basic Setup

1. Import the library in your Node.js application:

```javascript
const express = require("express");
const JSTemplate = require("js-templater");

const app = express();
const jsTemplate = new JSTemplate("/static/");
```

2. Create your JavaScript template file in `public/js/your-template.js`

3. Render the template in your route:

```javascript
app.get("/", (req, res) => {
  const html = jsTemplate.render("your-template", {
    key: "value",
  });
  res.send(html);
});
```

## API Reference

### Classes

#### `Element`

Represents an HTML element with opening and closing tags.

**Constructor:**

```javascript
new Element(name, attrib);
```

**Parameters:**

- `name` (string): The HTML tag name (e.g., 'div', 'span', 'h1')
- `attrib` (string): Initial attributes string (optional)

**Methods:**

- `add(element)`: Add child element or content
- `addAttribute(key, value)`: Add an attribute to the element
- `setContent(content)`: Set the text content of the element
- `toString()`: Convert the element to HTML string

**Example:**

```javascript
// Note: Element class is internal, but you can use it through JSTemplate
// For direct usage, you would need to export it from index.js
```

#### `EElement`

Represents a self-closing HTML element (void element).

**Constructor:**

```javascript
new EElement(name, attrib);
```

**Parameters:**

- `name` (string): The HTML tag name (e.g., 'link', 'img', 'input')
- `attrib` (string): Initial attributes string (optional)

**Methods:**

- `addAttribute(key, value)`: Add an attribute to the element
- `toString()`: Convert the element to HTML string

#### `JSTemplate`

Main class for rendering JavaScript templates.

**Constructor:**

```javascript
new JSTemplate(staticRoot);
```

**Parameters:**

- `staticRoot` (string): The root path for static files (typically '/static/' or '/static')

**Methods:**

- `render(scriptName, context)`: Render a JavaScript template

**Example:**

```javascript
const jsTemplate = new JSTemplate("/static/");
const html = jsTemplate.render("index", {
  title: "Home",
});
```

### Methods

#### `render(scriptName, context)`

Render a JavaScript template.

**Parameters:**

- `scriptName` (string): Name of the JavaScript file (without .js extension)
- `context` (object, optional): Context data to pass to the template as JSON

**Returns:**

- `string`: Complete HTML document with DOCTYPE, head, and body

**Generated Structure:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web Application</title>
    <link rel="stylesheet" type="text/css" href="{staticRoot}css/style.css" />
  </head>
  <body>
    <div id="root" data-content="{context_json}"></div>
    <script type="module" src="{staticRoot}js/{script_name}.js"></script>
  </body>
</html>
```

## Usage Patterns

### Passing Context Data

Context data is passed as JSON in the `data-content` attribute of the root div:

```javascript
const context = {
  user: {
    name: "John",
    email: "john@example.com",
  },
  items: ["item1", "item2", "item3"],
};

const html = jsTemplate.render("dashboard", context);
```

In your JavaScript file:

```javascript
const root = document.getElementById("root");
const context = JSON.parse(root.dataset.content);

console.log(context.user.name); // "John"
console.log(context.items); // ["item1", "item2", "item3"]
```

### Without Context Data

If you don't need to pass data, you can omit the context parameter:

```javascript
const html = jsTemplate.render("index");
```

In your JavaScript:

```javascript
const root = document.getElementById("root");
// root.dataset.content will be undefined
```

### Express.js Integration

Full Express.js example:

```javascript
const express = require("express");
const JSTemplate = require("js-templater");
const path = require("path");

const app = express();
const jsTemplate = new JSTemplate("/static/");

// Serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const html = jsTemplate.render("index", {
    title: "Home Page",
    user: req.user || "Guest",
  });
  res.send(html);
});

app.listen(3000);
```

## Best Practices

1. **Organize JavaScript Files**: Keep your JavaScript templates organized in the `public/js/` directory (or your configured static root)

2. **Error Handling**: Always check if `root.dataset.content` exists before parsing:

```javascript
let context = {};
if (root.dataset.content) {
  try {
    context = JSON.parse(root.dataset.content);
  } catch (e) {
    console.error("Failed to parse context:", e);
  }
}
```

3. **CSS Organization**: Place your CSS files in `public/css/` directory as the template automatically links to `{staticRoot}/css/style.css`

4. **Module Scripts**: The generated scripts use `type="module"`, so you can use ES6 imports in your JavaScript files:

```javascript
// In your template file (e.g., public/js/index.js)
import {helperFunction} from "./helpers.js";

const root = document.getElementById("root");
// ... your code
```

5. **Context Size**: Keep context data reasonably sized. For large datasets, consider fetching via API calls from JavaScript instead

6. **Security**: Be careful with user-generated content in context data. Always sanitize data before passing it to templates

7. **Static Root Path**: Always include a trailing slash in your static root path for consistency (e.g., '/static/' instead of '/static')

## Project Structure

Recommended project structure:

```
project/
├── server.js
├── package.json
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── index.js
│       ├── dashboard.js
│       ├── profile.js
│       └── helpers.js
└── node_modules/
```

## Testing

The library includes Jest test suite. Run tests with:

```bash
npm test
```

Test files are located in `index.test.js` and cover:

- JSTemplate initialization
- HTML generation with and without context
- Context data serialization
- HTML structure validation

## Troubleshooting

### Script Not Loading

- Verify the script path matches: `{staticRoot}js/{script_name}.js`
- Check that your static file serving middleware is configured correctly
- Ensure the file extension is `.js` (not included in `script_name` parameter)
- Check browser console for 404 errors

### Context Data Not Available

- Check that you're passing an object to the `context` parameter
- Verify JSON parsing in JavaScript (check browser console for errors)
- Ensure the root element exists before accessing `dataset.content`
- Use optional chaining: `root?.dataset?.content`

### CSS Not Loading

- Verify CSS file exists at `{staticRoot}/css/style.css`
- Check your static file serving configuration
- Inspect browser network tab for 404 errors
- Verify the static root path matches your static middleware path

### Module Import Errors

- Ensure your JavaScript files use ES6 module syntax
- Check that imported files have correct paths relative to the template file
- Verify CORS settings if loading modules from different origins

## Advanced Usage

### Custom HTML Generation

While the library provides a simple API, you can extend it by modifying the source code or by creating wrapper functions:

```javascript
function renderWithCustomTitle(jsTemplate, scriptName, context, title) {
  // This would require accessing internal methods
  // Consider forking or extending the library for advanced customization
}
```

### Dynamic Static Root

You can create multiple JSTemplate instances for different static root paths:

```javascript
const publicTemplate = new JSTemplate("/public/");
const assetsTemplate = new JSTemplate("/assets/");

// Use different templates for different routes
app.get("/admin", (req, res) => {
  res.send(assetsTemplate.render("admin"));
});
```

## License

See LICENSE file for details.
