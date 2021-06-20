// script that runs in the context of the web page
chrome.runtime.onMessage.addListener((request) => {
  const { active, name, content } = request;
  const styleSheetElement = document.querySelector(
    `style[style_name="${name}"]`
  );

  if (active) {
    if (styleSheetElement === null) {
      // create and add style sheet

      const newStyleSheet = document.createElement("style");

      newStyleSheet.setAttribute("style_name", name);
      newStyleSheet.innerHTML = content;

      document.head.appendChild(newStyleSheet);
    } else {
      // modify existing style sheet
      styleSheetElement.innerHTML = content;
    }
  } else if (styleSheetElement !== null) {
    document.head.removeChild(styleSheetElement);
  }
});
