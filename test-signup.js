/* No storage or network submission: the visitor sends the prepared email. */
(() => {
  'use strict';
  const form = document.getElementById('test-form');
  if (!form) return;
  const email = document.getElementById('tester-email');
  const status = document.getElementById('signup-status');
  const link = document.getElementById('draft-link');
  email.addEventListener('input', () => {
    email.setCustomValidity('');
    status.textContent = '';
    link.hidden = true;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    email.value = email.value.trim();
    email.setCustomValidity(/^[^\s@]+@gmail\.com$/i.test(email.value) ? '' : 'Bitte gib deine Gmail-Adresse ein (endet auf @gmail.com).');
    if (!form.reportValidity()) return;
    const recipient = 'remediongames@gmail.com';
    const subject = 'Clay Hero – Anmeldung zum geschlossenen Test';
    const body = 'Hallo Remedion Games,\r\n\r\nich möchte mich für den geschlossenen Android-Test von Clay Hero vormerken lassen.\r\n\r\nMeine Gmail-Adresse im Google Play Store: ' + email.value + '\r\n\r\nIch willige ein, dass meine E-Mail-Adresse zur Verwaltung der Testanfrage, Einladung und Kommunikation zum Test verarbeitet und für die Freischaltung in die Tester-Liste bei Google Play Console aufgenommen wird. Ich habe die Datenschutzhinweise unter https://remediongames.com/privacy.html#clay-hero-test gelesen. Widerruf jederzeit per E-Mail. Kein Newsletter.\r\n\r\nBitte schickt mir die Einladung und den Teilnahme-Link, sobald eine Teilnahme möglich ist. Vielen Dank!';
    const gmail = event.submitter?.dataset.mode === 'gmail';
    const url = gmail
      ? 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(recipient) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
      : 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    link.href = url;
    link.hidden = false;
    if (gmail) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    else { link.removeAttribute('target'); link.removeAttribute('rel'); }
    status.textContent = 'Dein E-Mail-Entwurf ist vorbereitet. Bitte sende ihn ab. Erst dann erhalten wir deine Anmeldung. Falls sich kein Entwurf öffnet, nutze den Link unten oder die Gmail-Schaltfläche.';
    if (gmail) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  });
})();
