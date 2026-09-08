/* ============================================================
   woahsoft.js  --  site scripts
   written 1am. do not refactor. it will notice.
   ============================================================ */

/* ---- the midi jukebox.
        the .mid files are in midi/. what actually plays is the same tune
        rendered through the Windows GM sound set, because browsers stopped
        playing MIDI about twenty years ago and took it personally. ---- */
(function () {
  var audio = document.getElementById('jbaudio');
  var list = document.getElementById('tracklist');
  if (!audio || !list) return;

  var title = document.getElementById('jbtitle');
  var note = document.getElementById('jbnote');
  var loop = document.getElementById('jbloop');
  var links = list.getElementsByTagName('a');
  var current = null;

  function setLcd(text) { title.textContent = text; }

  function mark(link) {
    for (var i = 0; i < links.length; i++) {
      links[i].className = (links[i] === link) ? 'playing' : '';
    }
  }

  function stop() {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    current = null;
    mark(null);
    note.style.visibility = 'hidden';
    setLcd('-- stopped --');
  }

  function play(link) {
    if (current === link && !audio.paused) { stop(); return; }
    current = link;
    audio.src = link.getAttribute('data-src');
    audio.loop = loop.checked;
    mark(link);
    note.style.visibility = 'visible';
    setLcd('loading...');
    audio.play().then(function () {
      setLcd(link.textContent);
    }, function () {
      setLcd('cannot play');
      mark(null);
    });
  }

  for (var i = 0; i < links.length; i++) {
    links[i].onclick = (function (link) {
      return function (e) { e.preventDefault(); play(link); };
    })(links[i]);
  }

  document.getElementById('jbstop').onclick = stop;
  loop.onchange = function () { audio.loop = loop.checked; };
  audio.onended = function () { if (!audio.loop) stop(); };
  audio.onerror = function () { setLcd('file not found'); mark(null); };

  note.style.visibility = 'hidden';
})();

/* ---- server uptime, which resets when you load the page,
        which is arguably not uptime ---- */
(function () {
  var el = document.getElementById('uptime');
  if (!el) return;
  var s = 0;
  setInterval(function () {
    s++;
    var h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, x = s % 60;
    el.textContent = 'UP ' + pad(h) + ':' + pad(m) + ':' + pad(x);
  }, 1000);
  function pad(v) { return (v < 10 ? '0' : '') + v; }
})();

/* ---- last updated ---- */
(function () {
  var el = document.getElementById('lastup');
  if (!el) return;
  var d = new Date(document.lastModified);
  if (isNaN(d.getTime())) return;
  el.textContent = d.toLocaleDateString();
})();

/* ---- guestbook. stores nothing. ---- */
function signBook(e) {
  e.preventDefault();
  var name = (document.getElementById('gname').value || '').trim();
  var site = (document.getElementById('gsite').value || '').trim();
  var msg = (document.getElementById('gmsg').value || '').trim();
  if (!name && !msg) { alert('write something first.'); return; }
  if (!name) name = 'anonymous';
  if (!msg) msg = '(no message)';

  var box = document.createElement('div');
  box.className = 'guest';

  var who = document.createElement('span');
  who.className = 'who';
  who.textContent = name;

  var when = document.createElement('span');
  when.className = 'when';
  when.textContent = ' — posted just now';

  var body = document.createElement('div');
  body.textContent = msg;

  box.appendChild(who);
  box.appendChild(when);
  if (site) {
    var s = document.createElement('div');
    s.style.fontSize = '11px';
    s.style.color = '#555577';
    s.textContent = 'homepage: ' + site;
    box.appendChild(s);
  }
  box.appendChild(body);

  var note = document.createElement('div');
  note.style.fontSize = '10px';
  note.style.color = '#997700';
  note.style.marginTop = '4px';
  note.textContent = '(this entry exists only in your browser and will be gone when you leave)';
  box.appendChild(note);

  var list = document.getElementById('entries');
  list.insertBefore(box, list.firstChild);

  document.getElementById('gname').value = '';
  document.getElementById('gsite').value = '';
  document.getElementById('gmsg').value = '';

  alert('Thank you for signing the guestbook.\n\nYour entry has been added to the page and to nothing else.');
}

/* ---- status bar text. nobody has a status bar anymore.
        we set it anyway, out of tradition. ---- */
(function () {
  var lines = [
    'Welcome to WoahSoft!',
    'Done',
    'Transferring data from woahsoft...',
    'Applet started.',
    'hello?'
  ];
  var i = 0;
  setInterval(function () {
    try { window.status = lines[i++ % lines.length]; } catch (e) {}
  }, 4000);
})();

/* ---- retractable comment sections.
        the arrow flips, the block goes away, and the browser remembers
        which ones you closed. that last part is the only modern thing
        on this entire website. ---- */
(function () {
  var heads = document.getElementsByClassName('ctoggle');
  if (!heads.length) return;

  function remember(id, closed) {
    try { localStorage.setItem('woahsoft.' + id, closed ? '1' : '0'); } catch (e) {}
  }
  function recall(id) {
    try { return localStorage.getItem('woahsoft.' + id) === '1'; } catch (e) { return false; }
  }

  function paint(head, box, closed) {
    box.className = closed ? 'comments retracted' : 'comments';
    head.getElementsByClassName('carrow')[0].innerHTML = closed ? '&#9658;' : '&#9660;';
    head.getElementsByClassName('chint')[0].textContent = closed ? '[show]' : '[hide]';
  }

  for (var i = 0; i < heads.length; i++) {
    (function (head) {
      var box = document.getElementById(head.getAttribute('data-target'));
      if (!box) return;
      var closed = recall(box.id);
      paint(head, box, closed);
      head.onclick = function () {
        closed = !closed;
        paint(head, box, closed);
        remember(box.id, closed);
      };
    })(heads[i]);
  }
})();
