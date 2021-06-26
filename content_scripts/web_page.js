// add stylesheet to dom
const addStyle = (name, content) => {
  const styleSheetElement = document.querySelector(
    `style[style_name="${name}"]`
  );

  if (styleSheetElement === null) {
    const newStyleSheet = document.createElement("style");

    newStyleSheet.setAttribute("style_name", name);
    newStyleSheet.innerHTML = content;

    document.head.appendChild(newStyleSheet);
  } else {
    // modify existing style sheet
    styleSheetElement.innerHTML = content;
  }
};

chrome.runtime.onMessage.addListener((request) => {
  const { active, name, content } = request;
  const styleSheetElement = document.querySelector(
    `style[style_name="${name}"]`
  );

  if (active) {
    addStyle(name, content);
  } else if (styleSheetElement !== null) {
    document.head.removeChild(styleSheetElement);
  }
});

// when the page loads
chrome.storage.local.get("styles", ({ styles }) => {
  styles.forEach(
    (style) => style.active && addStyle(style.name, style.content)
  );
});
