# My Cities

A six-city travel notebook, and a demo of three [Saasuke Labs](https://saasuke-labs.com/) tools working together:

- **[Gengo](https://github.com/saasuke-labs/gengo)** generates the site from Markdown, HTML templates and one YAML manifest, and fetches each city's weather while it builds.
- **[Nagare](https://github.com/saasuke-labs/nagare)** draws every chart and diagram from text blocks inside the Markdown.
- **[Kotomi](https://github.com/saasuke-labs/kotomi)** provides comments and reactions. It is not released yet, so the site shows a labelled preview until a server is configured.

Live at **https://saasuke-labs.com/demo-my-cities/** once GitHub Pages is enabled for this repository (see [Publishing](#publishing)).

The site explains itself: the [How it's made](content/how-its-made/index.md) page walks through the manifest, the templates, the diagrams, the build-time data and the deploy, and ends with the steps to build your own.

## Run it locally

You need Go 1.24 or newer, and [just](https://github.com/casey/just) if you want the shortcuts.

```sh
just init    # builds the pinned Gengo into ./.bin
just serve   # generates ./dist and serves it at http://localhost:3000
```

Without `just`:

```sh
git clone https://github.com/saasuke-labs/gengo && (cd gengo && go build -o gengo ./cmd/main.go)
./gengo/gengo generate --manifest gengo.yaml --output dist --plain
./gengo/gengo serve --site dist --watch
```

The site needs Gengo features that are on its main branch but not in a tagged release yet (front matter, `content` file lists and `sources`), which is why it builds Gengo from a pinned commit instead of using the install script. The commit is set in two places: `justfile` and `.github/workflows/deploy.yml`.

The build calls [Open-Meteo](https://open-meteo.com/) once per city. If it cannot be reached, the build still succeeds and the weather card and forecast chart are replaced by a sentence saying so.

## What is where

```text
gengo.yaml                 the manifest: what to build, and from what
content/cities/*.md        one Markdown file per city, with front matter
content/how-its-made/      the "How it's made" page
layouts/layout.html        the shell around every page
layouts/home.html          the home page
layouts/cities.html        the list at /cities/
layouts/city.html          wraps one city: hero, weather, facts, comments
layouts/article.html       wraps the "How it's made" page
static/                    CSS, one small script, images
.github/workflows/         build and deploy
```

To add a city: add a Markdown file in `content/cities/` (copy an existing one for the front matter), add a `<name>.jpg` and `<name>-800.jpg` to `static/img/`, list the file under `content.cities.files` in `gengo.yaml`, and add a card to `layouts/home.html`.

## Publishing

`.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages on every push to `main`, once a day (so the weather stays current) and on demand. Pull requests are built and checked but not deployed. The deploy is skipped if a page is missing or a Nagare block failed to render, so the last good version stays online.

One-time setup: in the repository settings, under **Pages**, set **Source** to **GitHub Actions**.

Because `saasuke-labs.com` is the organisation's GitHub Pages domain, this repository is then served at `saasuke-labs.com/demo-my-cities/`. The path is the repository name. Every link in the site is relative, so it works under any path without configuration; only `metadata.site-url` in `gengo.yaml` (used for social card image URLs) would need updating if the path changes.

GitHub pauses scheduled workflows in repositories with no activity for 60 days. If the daily rebuild stops, re-enable the workflow from the Actions tab.

## Turning on Kotomi

Set two values under `metadata` in `gengo.yaml` and rebuild:

```yaml
metadata:
  kotomi-url: https://comments.example.com   # your Kotomi server, no trailing slash
  kotomi-site: my-cities                     # the site ID from Kotomi's admin panel
```

With `kotomi-url` empty, `layouts/city.html` renders the preview block. With it set, it loads Kotomi's stylesheet and script from that server and starts the widget with the page's `slug` as the page ID. The server must allow the site's origin in `CORS_ALLOWED_ORIGINS`.

## Credits

- Photos from [Unsplash](https://unsplash.com/): Marc-Olivier Jodoin (home), Logan Armstrong (Barcelona), Takashi Miyazaki (Tokyo), Patrick Tomasso (New York), Spenser Sembrat (Rome), Toni Pomar (Sydney), Anthony Delanoix (Paris). Each page links to the original.
- Weather data by [Open-Meteo](https://open-meteo.com/), licensed under CC BY 4.0.
- Climate figures on the city pages are rounded monthly averages, meant as a guide.

## Licence

MIT. See [LICENSE](LICENSE).
