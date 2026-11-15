---
title: How it’s made
metadata:
  name: How it’s made
  eyebrow: Colophon
  summary: This site is a folder of Markdown, five HTML templates and one YAML file. Here is how they become the pages you have been reading, and how to build a site like it yourself.
---

## The short version

My Cities is a static site. Nothing runs on a server when you open a page: every page was generated ahead of time and is served as a plain file. Three tools from [Saasuke Labs](https://saasuke-labs.com/) do the work.

| Tool | Job on this site |
| --- | --- |
| [Gengo](https://saasuke-labs.com/gengo/) | Reads a manifest, renders Markdown through HTML templates and writes the site. Fetches the weather while it builds. |
| [Nagare](https://saasuke-labs.com/nagare/) | Turns the text blocks inside the Markdown into the SVG charts and diagrams. It is built into Gengo. |
| [Kotomi](https://saasuke-labs.com/kotomi/) | Comments and reactions under each city. A small server you run yourself, plus a widget in the page. |

The whole pipeline, drawn with Nagare:

```nagare
@layout(w:820,h:350)

md:Artifact(x:10,y:35,w:190,h:90)
api:APIGateway(x:10,y:215,w:190,h:90)
ci:VM(x:245,y:15,w:330,h:320) {
    gengo:Terminal(x:20,y:50,w:290,h:105)
    nagare:Package(x:65,y:190,w:200,h:90)
}
pages:CDN(x:620,y:35,w:190,h:90)
reader:Browser(x:620,y:185,w:190,h:150)

@md(title: "content/*.md", filename: "front matter + Markdown", size: "7 pages")
@api(title: "Open-Meteo", route: "/v1/forecast", method: "GET")
@ci(title: "GitHub Actions")
@gengo(title: "build", cwd: "~/demo-my-cities", command: "gengo generate", prompt: "$")
@nagare(title: "nagare", version: "built into gengo", lang: "text to SVG")
@pages(title: "GitHub Pages", provider: "static files", region: "CDN")
@reader(url: "saasuke-labs.com", text: "My Cities")

md.e --> gengo.w
api.e --> gengo.w
gengo.s --> nagare.n
gengo.e --> pages.w
pages.s --> reader.n
```

The source is in [saasuke-labs/demo-my-cities](https://github.com/saasuke-labs/demo-my-cities). Everything below refers to files in that repository, so you can read along.

## What you need

One binary: `gengo`. Nagare is compiled into it, so there is nothing else to install to build the site.

```bash
curl -fsSL https://raw.githubusercontent.com/saasuke-labs/gengo/main/install/install.sh | bash
```

This site uses three things that are on Gengo’s main branch and not yet in a tagged release: front matter, `content` file lists and `sources`. Until the next release, build Gengo from source instead (you need Go 1.24 or newer):

```bash
git clone https://github.com/saasuke-labs/gengo
cd gengo
go build -o gengo ./cmd/main.go
```

Then two commands cover the whole workflow:

```bash
gengo generate --manifest gengo.yaml --output dist --plain
gengo serve --site dist --watch
```

The first writes the site to `dist`. The second serves that folder at `http://localhost:3000` and reloads the browser when the files change.

## The files

```text
demo-my-cities/
├── gengo.yaml              the manifest: what to build, and from what
├── content/
│   ├── cities/             one Markdown file per city
│   └── how-its-made/
│       └── index.md        this page
├── layouts/
│   ├── layout.html         the shell around every page
│   ├── home.html           the home page
│   ├── cities.html         the list at /cities/
│   ├── city.html           wraps one city
│   └── article.html        wraps this page
├── static/                 CSS, one script, images; copied as they are
└── .github/workflows/
    └── deploy.yml          builds and publishes the site
```

There is no `node_modules`, no bundler and no database. The output for this site is nine HTML files and a folder of static assets.

## The manifest

`gengo.yaml` is the only configuration. This is the one for this site, lightly trimmed:

```yaml
title: My Cities

metadata:
  description: A six-city travel notebook…
  kotomi-url: ""

default-layout-template: layouts/layout.html
home-template: layouts/home.html

static-assets:
  - path: static
    destination: static

content:
  cities:
    files:
      - content/cities/barcelona.md
      - content/cities/tokyo.md
      # …four more
  how-its-made:
    files: content/how-its-made/index.md

sections:
  cities:
    template: layouts/cities.html
    page-template: layouts/city.html
  how-its-made:
    page-template: layouts/article.html

sources:
  weather:
    url: 'https://api.open-meteo.com/v1/forecast?latitude={{ index .Metadata "lat" }}&longitude={{ index .Metadata "lon" }}&…'
```

How to read it:

- **`content`** lists the Markdown files, grouped into sections. The section name becomes a folder in the output: `content/cities/tokyo.md` is written to `cities/tokyo.html`. A glob such as `content/cities/*.md` works too; the files are listed here one by one only to fix their order.
- **`sections`** says which templates a section uses. `template` is the section’s index page, and `page-template` wraps each page in it. A section with no `template`, like `how-its-made`, gets no index, so its `index.md` becomes the page at `/how-its-made/`.
- **`metadata`** is a free-form map that every template can read. A page’s own metadata is merged on top of it.
- **`static-assets`** are copied without being touched.
- **`sources`** are HTTP services Gengo may call while building. More on that [below](#build-time-data).

## Writing pages

A page is a Markdown file with a block of YAML at the top. This is the start of `content/cities/rome.md`:

```yaml
---
title: Rome
flags:
  - europe
metadata:
  slug: rome
  name: Rome
  code: ROM
  country: Italy
  summary: Two thousand years stacked on top of each other, and espresso standing up.
  image: rome.jpg
  accent: "#b7791f"
  lat: "41.9028"
  lon: "12.4964"
data:
  weather:
    source: weather
---

In Rome the ancient city is not in a museum. It is the wall your bus stop leans against.
```

Only a few keys mean something to Gengo: `title`, `flags`, `tags`, `layout`, `metadata` and `data`. Everything under `metadata` is yours. On this site the metadata carries what the design needs: the photo, the accent colour, the facts in the sidebar and the coordinates that the weather lookup uses.

The body is ordinary Markdown: headings, lists, links, tables and fenced code blocks. Raw HTML in Markdown is left out of the output, which keeps the content portable. Structure belongs in the templates.

To add a seventh city you would add one Markdown file, one photo and one line in the manifest.

## Templates

Templates are plain HTML with Go’s `html/template` syntax. A page passes through up to two of them:

1. the **page template** (`city.html`) wraps the rendered Markdown with the hero, the sidebar and the comments;
2. the **layout** (`layout.html`) wraps that with the `<head>`, the navigation and the footer.

The layout receives the page title, its section, its metadata and the HTML to place:

```html
<title>{{ .Title }} · My Cities</title>
…
<body style="--city: {{ index .Metadata "accent" }}">
  <main id="main">{{ .HTML }}</main>
</body>
```

That one `style` attribute is how each city gets its own colour. The stylesheet uses `var(--city)` for links, markers and highlights, and the value comes from the page’s front matter.

A page template receives `.HTML`, `.Metadata` and `.Data`. The sidebar facts are read straight from the metadata:

```html
<dl class="facts">
  <div><dt>Country</dt><dd>{{ index .Metadata "country" }}</dd></div>
  <div><dt>Best months</dt><dd>{{ index .Metadata "best-months" }}</dd></div>
</dl>
```

A section template receives every page of the section in `.Pages`. The [list of cities](../cities/) is one loop, run twice with a different filter:

```html
<h2>Europe</h2>
{{ range .Pages | where "europe" }}
  <a href="{{ .OutFileName }}">{{ .Title }}</a>
{{ end }}

<h2>Further afield</h2>
{{ range .Pages | where "!europe" }}
  <a href="{{ .OutFileName }}">{{ .Title }}</a>
{{ end }}
```

`where` keeps the pages that have a flag, or with `!` the ones that do not. Conditions can be combined with commas: `where "europe,!archived"`.

The home page is the odd one out: its template receives no page list, so the six cards on the [front page](../) are written by hand in `layouts/home.html`.

## Hosting in a subdirectory

This demo does not live at the root of a domain. It is served from `saasuke-labs.com/demo-my-cities/`, and it has to keep working if that path changes. So the site contains no absolute links to itself. Every URL is relative.

That is easy to arrange because the output is only two levels deep. The home page sits at the top, and every other page is exactly one folder down. The layout works out the way back to the top once:

```html
{{ $root := "./" }}{{ if .Section }}{{ $root = "../" }}{{ end }}

<link rel="stylesheet" href="{{ $root }}static/css/site.css" />
<a href="{{ $root }}cities/">Cities</a>
```

`.Section` is empty on the home page and set everywhere else. Inside a page template the depth is already known, so `city.html` simply writes `../static/img/…`.

The result is a `dist` folder you can serve from anywhere: the root of a domain, or three folders deep.

One thing to avoid if you copy this approach: `tags`. Gengo writes tag pages one level deeper, at `cities/tags/<tag>.html`, where these relative paths would no longer line up. This site uses `flags` instead, which filter lists without creating pages.

## Diagrams and charts

Every figure on this site is a fenced code block in a Markdown file. Gengo hands any block marked `nagare` to Nagare and puts the SVG it returns into the page. There are no image files to export and keep in sync.

This is the “From the airport” strip on the [Rome page](../cities/rome.html), as written:

```text
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "Fiumicino Airport")
@ride(title: "Leonardo Express · 32 min", bg: "#b7791f", fg: "#ffffff")
@centre(title: "Roma Termini")

airport.e --> ride.w
ride.e --> centre.w
```

And as rendered:

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "Fiumicino Airport")
@ride(title: "Leonardo Express · 32 min", bg: "#b7791f", fg: "#ffffff")
@centre(title: "Roma Termini")

airport.e --> ride.w
ride.e --> centre.w
```

Three kinds of line are enough for most diagrams:

- `name:Type(x, y, w, h)` declares a component and where it goes. Besides `Rectangle` there are `Browser`, `Server`, `Database`, `Terminal`, `VM` and more; the diagram at the top of this page uses several.
- `@name(…)` sets what it shows: a title, colours, an icon.
- `a.e --> b.w` draws an arrow from the east side of one to the west side of another.

A block that starts with the word `chart` is a chart instead. This is the climate chart from the same page:

```text
chart
title: Rome through the year
xaxis: date
legend: top
grid: true

scale
  id: temp
  label: Temperature (°C)
  type: number
  min: -10
  max: 40

scale
  id: rain
  label: Rainfall (mm)
  type: number
  min: 0
  max: 250

series: Rainfall | Average high | Average low
yaxis: rain | temp | temp
color: #b9cfe4 | #b7791f | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 67 | 12 | 3
  2025-02-15: 73 | 13 | 3
  2025-03-15: 58 | 16 | 5
```

Each row of `data` is one point on the x axis with a value per series, separated by `|`. Series can share a scale or have their own, and bars, lines and dashed lines can be mixed in one chart.

If a block has a mistake in it, the error is printed in the page where the figure would have been, so it is hard to publish a broken diagram without noticing.

One practical note: charts come out with a fixed pixel width. The site’s only script, `static/js/site.js`, adds a `viewBox` to them so they scale with the text column, and lets wide figures scroll sideways on a phone instead of shrinking until the labels are unreadable.

## Build-time data

The “Right now” card and the ten-day chart on each city page show real weather, and still no code runs in your browser to fetch it. Gengo asks [Open-Meteo](https://open-meteo.com/) for the numbers while it builds the site and writes them into the HTML.

It takes three steps. First, the manifest declares the service once. The URL is itself a template, filled in from each page’s metadata, so one source serves all six cities:

```yaml
sources:
  weather:
    url: 'https://api.open-meteo.com/v1/forecast?latitude={{ index .Metadata "lat" }}&longitude={{ index .Metadata "lon" }}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=10'
```

Second, a page asks for it in its front matter, under any name it likes:

```yaml
data:
  weather:
    source: weather
```

Third, the answer is available as `.Data.weather`. A JSON response is parsed, so templates can walk into it. This is the card in `city.html`:

```html
{{ with .Data.weather }}{{ with .current }}
  <p class="now-temp">{{ printf "%.0f" .temperature_2m }}<span>°C</span></p>
  <p>wind {{ printf "%.0f" .wind_speed_10m }} km/h</p>
{{ end }}{{ else }}
  <p>The weather service did not answer during the last build.</p>
{{ end }}
```

The `else` matters. If a source fails or takes longer than fifteen seconds, Gengo logs a warning and leaves the value empty rather than stopping the build. A template that checks with `with` degrades to a sentence instead of a broken page.

### A chart drawn from live data

When a page has `data`, its Markdown is run as a template before it is rendered. That makes it possible to write a Nagare chart whose rows come from the API response. This is the block behind the ten-day chart, from `content/cities/rome.md`:

````text
{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Rome, the next ten days
xaxis: date

series: Daily high | Daily low
color: #b7791f | #3d5a80
style: line | dashed
data:
{{- range $i, $day := .time }}
  {{ $day }}: {{ index $.Data.weather.daily.temperature_2m_max $i }} | {{ index $.Data.weather.daily.temperature_2m_min $i }}
{{- end }}
```
{{ end }}{{ end }}
````

Gengo fills in the rows, Nagare draws them, and the page ships an SVG. The build is the only moment anything talks to the weather service.

The numbers are as fresh as the last build, so this site is rebuilt on a schedule once a day. Each card says when its reading was taken.

## Comments and reactions with Kotomi

A static page cannot store what readers write, so comments need a server somewhere. Kotomi is that server, kept small: one Go service with an SQLite file, a widget for the page and an admin panel for moderation. The page stays static and the widget talks to Kotomi from the reader’s browser.

```nagare
@layout(w:820,h:290)

reader:Browser(x:10,y:45,w:250,h:200)
pages:CDN(x:330,y:35,w:210,h:90)
kotomi:Server(x:330,y:180,w:210,h:60)
db:Database(x:650,y:145,w:140,h:130)

@reader(url: "…/cities/tokyo.html", text: "Tokyo, with comments")
@pages(title: "GitHub Pages", provider: "static HTML", region: "no backend")
@kotomi(title: "Kotomi", icon: "golang", port: 8080)
@db(title: "comments", engine: "SQLite")

reader.e --> pages.w
reader.e --> kotomi.w
kotomi.e --> db.w
```

**Kotomi is not released yet**, so on this demo the block under each city is a labelled mock-up. The wiring is already in place, though. `city.html` checks one value from the manifest and loads the real widget when it is set:

```html
{{ $kotomi := index .Metadata "kotomi-url" }}
{{ if $kotomi }}
  <link rel="stylesheet" href="{{ $kotomi }}/static/kotomi.css" />
  <div id="kotomi-comments"></div>
  <script src="{{ $kotomi }}/static/kotomi.js"></script>
  <script>
    new Kotomi({
      baseUrl: {{ $kotomi }},
      siteId: {{ index .Metadata "kotomi-site" }},
      pageId: {{ index .Metadata "slug" }},
    }).render();
  </script>
{{ else }}
  <!-- the preview block -->
{{ end }}
```

Each page needs a stable identifier for its thread. Here it is the `slug` from the front matter, so a comment on Tokyo stays with Tokyo even if the page’s title changes.

To turn it on for your own site:

1. Run Kotomi (`docker build -t kotomi .` in its repository, then `docker run -p 8080:8080 -v kotomi-data:/app/data kotomi`).
2. Create a site in its admin panel and note the site ID.
3. Set `CORS_ALLOWED_ORIGINS` on the server to your site’s origin.
4. Put the server’s URL and the site ID in `gengo.yaml` under `metadata`, and rebuild.

The [Kotomi documentation](https://saasuke-labs.com/kotomi/) covers moderation, sign-in for readers and the rest.

## Deploying

The site is published by GitHub Actions to GitHub Pages. The workflow in `.github/workflows/deploy.yml` does three things: gets `gengo`, runs it and uploads the folder.

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: "17 5 * * *" # once a day, for fresh weather
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # …build gengo from a pinned commit…
      - run: gengo generate --manifest gengo.yaml --output dist --plain
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
```

`--plain` replaces the interactive progress display with log lines, which is what you want in CI.

The subdirectory comes for free. `saasuke-labs.com` is the organisation’s GitHub Pages domain, and GitHub serves every other repository of the organisation with Pages enabled under its own name. This repository is called `demo-my-cities`, so the site appears at `saasuke-labs.com/demo-my-cities/`. Because all its links are relative, nothing in the build needs to know that.

## Make your own

1. **Install Gengo**, or build it from source as shown [above](#what-you-need).
2. **Copy the skeleton.** Fork [demo-my-cities](https://github.com/saasuke-labs/demo-my-cities), or start from an empty folder with a `gengo.yaml`, a `layouts/layout.html` containing `{{ .HTML }}` and one Markdown file.
3. **Write a page.** Put a title and whatever your design needs in the front matter, then write.
4. **Draw something.** Add a `nagare` block to the Markdown. The [Nagare documentation](https://saasuke-labs.com/nagare/) lists the components and chart options.
5. **Pull in data,** if the page should show something that changes. Declare a source, reference it from the front matter, and guard the template with `with`.
6. **Build and look:** `gengo generate --output dist --plain`, then `gengo serve --site dist --watch`.
7. **Publish.** Copy the workflow, enable GitHub Pages for the repository with “GitHub Actions” as the source, and push.

The tools are open source and maintained by [Saasuke Labs](https://saasuke-labs.com/). If you build something with them, the [repositories](https://github.com/saasuke-labs) are the place to say so, or to report what got in your way.
