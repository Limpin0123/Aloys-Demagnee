function loadLanguage(lang) {
    Promise.all([
        fetch(`./Json/lang/${lang}/HeaderFooterJson.json`).then(r => r.json()),
        fetch(`./Json/lang/${lang}/${document.body.dataset.page}.json`).then(r => r.json())//body must be like => <body data-page="nameOfTheJson">
    ])
    .then(([HeaderFooter, pageData]) => {
        const translations = {...HeaderFooter, ...pageData};
      document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[key]) {
          element.innerHTML = translations[key];
        }
      });
    })
    .catch(err => console.error("Error when loading language :", err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage("fr");

  document.getElementById("button-fr").addEventListener("click", () => loadLanguage("fr"));
  document.getElementById("button-en").addEventListener("click", () => loadLanguage("en"));
});
//Page must include the line : <script src="./JavaScript/Language.js"></script>