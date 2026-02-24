const API_URL = 'http://localhost:5001/url';
const form = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrl');
const shortenBtn = document.getElementById('shortenBtn');
const resultEl = document.getElementById('result');
const shortLinkInput = document.getElementById('shortLink');
const shortLinkAnchor = document.getElementById('shortLinkAnchor');
const copyBtn = document.getElementById('copyBtn');
const errorEl = document.getElementById('error');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const url = longUrlInput.value.trim();
    if (!url) return;

    errorEl.classList.add('hidden');
    resultEl.classList.add('hidden');
    shortenBtn.disabled = true;
    shortenBtn.textContent = 'Shortening…';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const baseUrl = API_URL.replace(/\/url\/?$/, '');
      const shortUrl = baseUrl + '/url/' + data.id;

      shortLinkInput.value = shortUrl;
      shortLinkAnchor.href = shortUrl;
      resultEl.classList.remove('hidden');
      longUrlInput.value = '';
    } catch (err) {
      errorEl.textContent = err.message || 'Failed to shorten URL. Make sure the server is running.';
      errorEl.classList.remove('hidden');
    } finally {
      shortenBtn.disabled = false;
      shortenBtn.textContent = 'Shorten';
    }
  });
}

if (copyBtn) {
  const copyBtnText = document.getElementById('copyBtnText');
  copyBtn.addEventListener('click', function () {
    const url = shortLinkInput ? shortLinkInput.value : (shortLinkAnchor && shortLinkAnchor.href);
    if (!url) return;
    navigator.clipboard.writeText(url).then(function () {
      if (copyBtnText) {
        copyBtnText.textContent = 'Copied!';
        setTimeout(function () { copyBtnText.textContent = 'Copy'; }, 2000);
      }
    });
  });
}
