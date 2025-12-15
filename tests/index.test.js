const JSTemplate = require("../index");

describe("Element", () => {
  // We need to access Element and EElement classes for testing
  // Since they're not exported, we'll test them through JSTemplate usage
  // or we could modify index.js to export them, but for now let's test indirectly
});

describe("JSTemplate", () => {
  let jsTemplate;

  beforeEach(() => {
    jsTemplate = new JSTemplate("/static/");
  });

  describe("constructor", () => {
    test("should initialize with static root", () => {
      expect(jsTemplate.staticRoot).toBe("/static/");
      expect(jsTemplate.jsRoot).toBe("/static/js/");
    });

    test("should handle static root without trailing slash", () => {
      // Note: The library expects trailing slash for proper path construction
      // Without trailing slash, paths concatenate directly
      const template = new JSTemplate("/static");
      expect(template.jsRoot).toBe("/staticjs/"); // Current behavior without trailing slash

      // Recommended: always use trailing slash
      const template2 = new JSTemplate("/static/");
      expect(template2.jsRoot).toBe("/static/js/");
    });
  });

  describe("render", () => {
    test("should render basic HTML structure without context", () => {
      const html = jsTemplate.render("index");

      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("<html");
      expect(html).toContain("<head");
      expect(html).toContain("<body");
      expect(html).toContain("id='root'");
      expect(html).toContain("type='module'");
      expect(html).toContain("src='/static/js/index.js'");
      expect(html).not.toContain("data-content");
    });

    test("should render HTML with context data", () => {
      const context = {title: "Welcome", user: "John"};
      const html = jsTemplate.render("dashboard", context);

      expect(html).toContain(
        'data-content=\'{"title":"Welcome","user":"John"}\''
      );
      expect(html).toContain("src='/static/js/dashboard.js'");
    });

    test("should render HTML with complex context data", () => {
      const context = {
        user: {name: "John", email: "john@example.com"},
        items: ["item1", "item2", "item3"],
        active: true,
      };
      const html = jsTemplate.render("profile", context);

      expect(html).toContain("data-content");
      const contextMatch = html.match(/data-content='([^']+)'/);
      expect(contextMatch).toBeTruthy();

      const parsedContext = JSON.parse(contextMatch[1].replace(/'/g, '"'));
      expect(parsedContext.user.name).toBe("John");
      expect(parsedContext.items).toEqual(["item1", "item2", "item3"]);
      expect(parsedContext.active).toBe(true);
    });

    test("should include CSS link in rendered HTML", () => {
      const html = jsTemplate.render("index");

      expect(html).toContain("<link");
      expect(html).toContain("rel='stylesheet'");
      expect(html).toContain("href='/static/css/style.css'");
    });

    test("should include title tag in rendered HTML", () => {
      const html = jsTemplate.render("index");

      expect(html).toContain("Web Application");
      expect(html).toContain("</title>");
    });

    test("should handle empty context object", () => {
      const html = jsTemplate.render("index", {});

      expect(html).toContain("data-content='{}'");
    });

    test("should handle null context", () => {
      const html = jsTemplate.render("index", null);

      // Should not have data-content attribute
      expect(html).not.toContain("data-content");
    });

    test("should handle different static root paths", () => {
      const template1 = new JSTemplate("/assets/");
      const html1 = template1.render("test");

      expect(html1).toContain("src='/assets/js/test.js'");
      expect(html1).toContain("href='/assets/css/style.css'");
    });

    test("should generate valid HTML structure", () => {
      const html = jsTemplate.render("index");

      // Check basic structure
      expect(html.indexOf("<!DOCTYPE html>")).toBe(0);
      expect(html).toContain("</html>");
      expect(html).toContain("</head>");
      expect(html).toContain("</body>");
      expect(html).toContain("</div>");
      expect(html).toContain("</script>");
    });
  });
});
