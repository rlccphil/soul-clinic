/**
 * RLCC Soul Clinic — API bridge for GitHub Pages.
 * Replaces google.script.run so the original page code works unchanged.
 * After deploying the Apps Script web app, paste its /exec URL below.
 */
window.SOUL_CLINIC_API_URL = 'https://script.google.com/macros/s/AKfycbyPaxY8a53GU779AqCBHPayhmScFiiY3yVL9iQa47B5TbAH_YUaAwkUOhaYadiDoJg/exec';

(function () {
  function makeRunner(onSuccess, onFailure) {
    const base = {
      withSuccessHandler: function (fn) { return makeRunner(fn, onFailure); },
      withFailureHandler: function (fn) { return makeRunner(onSuccess, fn); }
    };
    return new Proxy(base, {
      get: function (target, name) {
        if (name in target) return target[name];
        if (typeof name !== 'string') return undefined;
        return function () {
          const args = Array.prototype.slice.call(arguments);
          callApi(name, args).then(
            function (result) { if (onSuccess) onSuccess(result); },
            function (err) { if (onFailure) onFailure(err); }
          );
        };
      }
    });
  }

  async function callApi(fn, args) {
    const url = window.SOUL_CLINIC_API_URL;
    if (!url || url.indexOf('PASTE_') === 0) {
      throw new Error('This app is not connected yet. Set SOUL_CLINIC_API_URL in api.js.');
    }
    let res;
    try {
      // text/plain avoids a CORS preflight, which Apps Script cannot answer.
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ fn: fn, args: args }),
        redirect: 'follow'
      });
    } catch (e) {
      throw new Error('Could not reach the server. Check your connection and try again.');
    }
    let data;
    try { data = await res.json(); }
    catch (e) { throw new Error('The server returned an unexpected response. Please try again.'); }
    if (!data.ok) throw new Error(data.error || 'The request failed.');
    return data.result;
  }

  window.google = window.google || {};
  window.google.script = { run: makeRunner(null, null) };
})();
