---
title: Barcelona
flags:
  - europe
metadata:
  slug: barcelona
  name: Barcelona
  number: "01"
  code: BCN
  country: Spain
  summary: Gaudí’s curves, a grid you can read from the air, and dinner at ten.
  image: barcelona.jpg
  accent: "#c8553d"
  lat: "41.3874"
  lon: "2.1686"
  coords: 41.39° N, 2.17° E
  language: Catalan and Spanish
  currency: Euro (€)
  timezone: CET, UTC+1
  best-months: May to June, September to October
  photo-by: Logan Armstrong
  photo-by-url: https://unsplash.com/@loganstrongarms
  photo-url: https://unsplash.com/photos/aerial-view-of-city-buildings-during-daytime-hVhfqhDYciU
  next-slug: tokyo
  next-name: Tokyo
data:
  weather:
    source: weather
---

From the air, Barcelona looks drawn with a ruler. The Eixample is a grid of octagonal blocks laid out in the 1850s, and in the middle of it sits a church that has been under construction since 1882. On the ground it is a city of balconies, bakeries and people who are in no hurry to finish lunch.

It is also one of the few big cities where you can walk from a medieval lane to a beach in twenty minutes.

## Don’t miss

- **La Sagrada Família.** Book a timed ticket days ahead and go in the late afternoon, when the west windows turn the nave orange.
- **Park Güell.** Gaudí’s hillside park. The paid zone is small; the free paths above it have the better view.
- **The Gothic Quarter.** Roman walls, a cathedral and lanes too narrow for a car. Best before ten in the morning.
- **Bunkers del Carmel.** An old anti-aircraft battery, and the widest sunset view over the grid.

## Eat and drink

Lunch is the main meal and rarely starts before two; dinner before nine marks you as a visitor. Start with *pa amb tomàquet* (bread rubbed with tomato) and *patates braves*, join the locals for a vermouth at midday on Sunday, and finish with *crema catalana*. For produce and a counter lunch, the Sant Antoni market is calmer than the Boqueria.

## From the airport

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "El Prat Airport")
@ride(title: "Aerobús · 35 min", bg: "#c8553d", fg: "#ffffff")
@centre(title: "Plaça de Catalunya")

airport.e --> ride.w
ride.e --> centre.w
```

The Aerobús leaves from both terminals every few minutes and takes about 35 minutes. The R2 Nord train is cheaper and takes about as long from Terminal 2.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Barcelona, the next ten days
width: 760
height: 300
xaxis: date
legend: top
grid: true

scale
  id: temp
  label: Temperature (°C)
  type: number

series: Daily high | Daily low
yaxis: temp | temp
color: #c8553d | #3d5a80
style: line | dashed
data:
{{- range $i, $day := .time }}
  {{ $day }}: {{ index $.Data.weather.daily.temperature_2m_max $i }} | {{ index $.Data.weather.daily.temperature_2m_min $i }}
{{- end }}
```

This chart is not an image, and nobody updates it by hand. The forecast was fetched from Open-Meteo while the site was being built, and Nagare drew it from those numbers. [How that works →](../how-its-made/#build-time-data)
{{ end }}{{ else }}
The forecast service did not answer during the last build, so there is no chart today. [Why the page still built →](../how-its-made/#build-time-data)
{{ end }}

## When to go

```nagare
chart
title: Barcelona through the year
width: 760
height: 340
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
color: #b9cfe4 | #c8553d | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 37 | 14 | 6
  2025-02-15: 35 | 15 | 7
  2025-03-15: 36 | 17 | 9
  2025-04-15: 40 | 19 | 11
  2025-05-15: 47 | 22 | 15
  2025-06-15: 30 | 26 | 19
  2025-07-15: 21 | 29 | 22
  2025-08-15: 62 | 29 | 22
  2025-09-15: 81 | 26 | 19
  2025-10-15: 91 | 22 | 15
  2025-11-15: 59 | 17 | 10
  2025-12-15: 40 | 14 | 7
```

Late spring and early autumn are warm enough for the beach without the August crowds or prices. October is the wettest month, usually in short, heavy bursts.

*Monthly averages, rounded.*
