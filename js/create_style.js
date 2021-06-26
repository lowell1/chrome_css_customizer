document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("input").value;
  const content = document.querySelector("textarea").value;

  chrome.storage.local.get("styles", ({ styles }) => {
    styles.push({ name, content, active: false });
    chrome.storage.local.set(
      {
        styles,
      },
      () => {
        window.location = "/html/index.html";
      }
    );
  });
});
