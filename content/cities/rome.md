---
title: Rome
flags:
  - europe
metadata:
  slug: rome
  name: Rome
  number: "04"
  code: ROM
  country: Italy
  summary: Two thousand years stacked on top of each other, and espresso standing up.
  image: rome.jpg
  accent: "#b7791f"
  lat: "41.9028"
  lon: "12.4964"
  coords: 41.90° N, 12.50° E
  language: Italian
  currency: Euro (€)
  timezone: CET, UTC+1
  best-months: April to May, September to October
  photo-by: Spenser Sembrat
  photo-by-url: https://unsplash.com/@spensersembrat
  photo-url: https://unsplash.com/photos/a-very-old-looking-building-with-a-tree-in-front-of-it-8ieBQo8AvNU
  next-slug: sydney
  next-name: Sydney
data:
  weather:
    source: weather
---

In Rome the ancient city is not in a museum. It is the wall your bus stop leans against. A two-thousand-year-old temple is still in daily use, and the traffic simply goes around the amphitheatre.

The centre is compact and flat enough to cross on foot, which is how most of its best moments happen: by turning a corner.

## Don’t miss

- **The Colosseum and the Forum.** One ticket covers both. Do the Forum first, while it is cool.
- **The Pantheon.** A concrete dome poured around the year 126 and still the largest of its kind. Stand under the opening when it rains.
- **The Vatican Museums.** Book the first entry of the day and walk straight to the Sistine Chapel before doubling back.
- **Trastevere.** Across the river, for an evening of ochre walls, laundry lines and small restaurants.

## Eat and drink

Rome has four pastas and strong opinions about each: carbonara, cacio e pepe, amatriciana and gricia. Order one at lunch. Coffee is taken standing at the bar and cappuccino belongs to the morning. In between, a *supplì* (a fried rice ball with mozzarella inside) costs about as much as a bus ticket.

## From the airport

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

The Leonardo Express runs non-stop every fifteen to thirty minutes. The slower FL1 regional train is the better choice for Trastevere.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Rome, the next ten days
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
color: #b7791f | #3d5a80
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
title: Rome through the year
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
color: #b9cfe4 | #b7791f | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 67 | 12 | 3
  2025-02-15: 73 | 13 | 3
  2025-03-15: 58 | 16 | 5
  2025-04-15: 81 | 19 | 8
  2025-05-15: 53 | 24 | 12
  2025-06-15: 34 | 28 | 16
  2025-07-15: 19 | 31 | 18
  2025-08-15: 37 | 31 | 19
  2025-09-15: 73 | 27 | 16
  2025-10-15: 113 | 22 | 12
  2025-11-15: 115 | 17 | 8
  2025-12-15: 81 | 13 | 4
```

April, May and late September give warm days without the heat that empties the city in August. Autumn is when most of the rain falls.

*Monthly averages, rounded.*
