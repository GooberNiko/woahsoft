# WoahSoft

> Giving you Vibecoded Slop Scince 2026!

The website for **WoahSoft**, which is not a real company. It is where I post my
software. Giving it a name and a logo made it feel more real than "here are some
exe files I made", and once there was a logo there had to be a website.

Live at **https://gooberniko.github.io/woahsoft/**

Static HTML/CSS/JS in the style of a personal software page from about 1999 to
2003. No build step, no framework, no dependencies. Open `index.html`.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Homepage, badges, contact, MIDI jukebox |
| `software.html` | Downloads. There are not any yet. |
| `about.html` | Company info for the company that does not exist |
| `guestbook.html` | A guestbook. It saves nothing. |

## The MIDI jukebox

`midi/` holds the original `.mid` files. Browsers stopped playing MIDI a long
time ago, so `audio/` holds those same files rendered offline through
`C:\Windows\System32\drivers\gm.dls` — the Windows General MIDI sound set — so
they still sound the way they are supposed to. The jukebox in the sidebar plays
the renders. No autoplay.

Rendered with [spessasynth_core](https://github.com/spessasus/spessasynth_core),
which reads DLS soundbanks directly, then encoded to MP3.

## Guestbook

The form works, in the sense that your entry appears on the page. It is not sent
anywhere, not stored, and it is gone when you close the tab. There is no
database. There has never been a database.

The existing entries are fiction, including the very long angry one.

## How it was made

Woah decides what gets made. Claude writes it. Woah does not know how to code.
This is stated plainly on the About page and in the logo, which also has a typo
in it that is not going to be fixed.

## Structure

```
index.html  software.html  about.html  guestbook.html
style.css   script.js
img/        logo.png, badges/*.svg
audio/      rendered MP3s (what actually plays)
midi/       the original .mid files
```

## License

Do whatever you want with it.
