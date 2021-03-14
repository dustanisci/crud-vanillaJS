class ComponentTest extends HTMLElement{

  constructor(href) {
    super();

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = href;
    ddocument.querySelector('head').appendChild(style);
  }

}