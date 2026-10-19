# Návod pro Clauda – web iryba.cz

Úvodní web aplikací Pstruh a Kapr (GitHub Pages, repo `pstruhapp/iryba`, doména iryba.cz). Piš česky.

- `index.html` – celý web: úvod, instalace na plochu, video návod (`navod-pstruh.mp4`, náhled `nahledy/video-poster.jpg`), přehled funkcí, podmínky užití, bonus.
- `obchodni-podminky.html` – připravené obchodní podmínky pro placenou funkci. **Jsou skryté** (nikde na ně neodkazujeme), placení přes Stripe není aktivní. Znovu je připoj jen na pokyn majitele.
- Majitel vystupuje anonymně jako „Tým Pstruh & Kapr“; nezveřejňuj jeho osobní e-mail ani DIČ.
- Při nové funkci v aplikacích uprav i popis v sekci „Co všechno umí“; když se mění video, přidej k adrese verzi (`?v=N`), ať se nedrží stará.
- Aplikace jsou optimalizované hlavně pro telefony a tablety – web to uvádí v úvodu.
- Návod k aplikacím a pravidla úprav: `CLAUDE.md` v repozitářích `pstruhapp/pstruhapp.github.io` a `kaprapp/kaprapp.github.io`.
- Commit: autor i committer `Claude <noreply@anthropic.com>`, zpráva česky; před pushem `git pull --rebase`.
