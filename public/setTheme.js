(function () {
  function setTheme() {
    const userTheme = localStorage.getItem("theme");
    if (userTheme) {
      document.documentElement.classList.add(userTheme);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    }
  }
  setTheme();
})();
