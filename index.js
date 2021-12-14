class Element{
  constructor(name,attrib){
    this.name = name;
    this.attrib = (attrib == undefined) ? " ": attrib;
    this.content = "";
    this.closeTag = `</${name}>`;
  }
  add(element){
    this.content +=`${element}`;
  }
  addAttribute(key,value){
    this.attrib+=`${key}='${value}' `;
  }
  setContent(content){
    this.content = content;
  }
  toString(){
    this.startTag = '';
    this.startTag +=`<${this.name} ${this.attrib}>`;
    return `${this.startTag}${this.content}${this.closeTag}`.trim();
  }
}


class EElement{
  constructor(name,attrib){
    this.name = name;
    this.attrib = (attrib == undefined) ? " ": attrib;
  }
  add(element){
    this.content +=`${element}`;
  }
  addAttribute(key,value){
    this.attrib+=`${key}='${value}' `;
  }
  setContent(content){
    this.content = content;
  }
  toString(){
    this.startTag = `<${this.name}${this.attrib}/>`;
    return `${this.startTag}`.trim();
  }
}

const setTemplate = function (root,div,script) {
  let doctype = "<!DOCTYPE html>";
  let html = new Element("html");
  let  head = new Element("head");
  let  body = new Element("body");
  let cssLink = new EElement("link");
  cssLink.addAttribute("rel","stylesheet");
  cssLink.addAttribute("type","text/css");
  cssLink.addAttribute("href",`${root}css/style.css`);

  let title = new Element("title");
  title.setContent("Web Application");

  head.add(title);
  head.add(cssLink);
  html.add(head);
  body.add(div);
  body.add(script);
  html.add(body);
  return `${doctype}${html.toString()}`;  
}



class JSTemplate{
  constructor(staticRoot){
    this.staticRoot = staticRoot
    this.initials();
  }

  initials(){
    // this.jsRoot = `${this.staticRoot}/javascript/src/`;
    this.jsRoot = `${this.staticRoot}js/`;
  }
  render(scriptName,context){
    let div = new Element("div");
    div.addAttribute("id","root");
    context = (context == undefined) ? "": div.addAttribute("data-content",JSON.stringify(context));
    let script = new Element("script");
    script.addAttribute("type","module");
    script.addAttribute("src",`${this.jsRoot}${scriptName}.js`);
    return setTemplate(this.staticRoot,div,script);
  }
}


module.exports = JSTemplate; 
