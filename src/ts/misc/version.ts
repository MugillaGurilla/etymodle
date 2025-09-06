export default function populateVersion() {
  fetch('./dist/src/ts/data/version.json')
    .then((response) => response.json())
    .then((data) => {
      const versionElement = document.querySelector('.version');
      if (versionElement) {
        versionElement.textContent = `Version Info: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error('Error fetching version info:', error);
    });
  };