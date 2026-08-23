/* Register the dashboard service worker from the site root. */
const dashboardPwaScriptUrl = document.currentScript?.src || window.location.href;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const workerUrl = new URL('service-worker.js', dashboardPwaScriptUrl);
    const scopeUrl = new URL('./', workerUrl);

    navigator.serviceWorker.register(workerUrl, { scope: scopeUrl }).catch((error) => {
      console.error('Dashboard service worker registration failed:', error);
    });
  });
}
