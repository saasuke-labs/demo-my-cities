---
title: New York
metadata:
  slug: new-york
  name: New York
  number: "03"
  code: NYC
  country: United States
  summary: Five boroughs, one grid, and a skyline that is never finished.
  image: new-york.jpg
  accent: "#e09f1f"
  lat: "40.7128"
  lon: "-74.0060"
  coords: 40.71° N, 74.01° W
  language: English, and several hundred others
  currency: US dollar ($)
  timezone: ET, UTC−5
  best-months: April to June, September to October
  photo-by: Patrick Tomasso
  photo-by-url: https://unsplash.com/@impatrickt
  photo-url: https://unsplash.com/photos/wide-angle-photo-of-brooklyn-bridge-under-cloudy-sky-SVVTZtTGyaU
  next-slug: rome
  next-name: Rome
data:
  weather:
    source: weather
---

New York rewards walking more than any plan. Manhattan’s grid makes it nearly impossible to get lost above 14th Street, and nearly every avenue changes character every ten blocks.

Give at least a day to the boroughs that are not Manhattan. Much of what the city is known for now, from the food to the music, happens across the river.

## Don’t miss

- **The Brooklyn Bridge.** Walk it from the Brooklyn side toward Manhattan, early, before the path fills up.
- **The High Line.** A freight railway turned into a park, two storeys above the street.
- **The Metropolitan Museum.** Too big for one visit. Choose two wings and leave the rest for next time.
- **The Staten Island Ferry.** Free, runs all day and night, and passes the Statue of Liberty on the way.

## Eat and drink

Eat with your hands and standing up: a bagel with lox in the morning, a folded slice at lunch, pastrami on rye when you need to sit down. For dinner, take the 7 train to Flushing or Jackson Heights and order whatever the next table is having.

## From the airport

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "JFK Airport")
@ride(title: "AirTrain + LIRR · 40 min", bg: "#e09f1f", fg: "#ffffff")
@centre(title: "Penn Station")

airport.e --> ride.w
ride.e --> centre.w
```

Change at Jamaica and allow about 40 minutes in all. The subway from the same station costs less and takes roughly twenty minutes longer.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: New York, the next ten days
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
color: #e09f1f | #3d5a80
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
title: New York through the year
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
color: #b9cfe4 | #e09f1f | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 93 | 4 | -3
  2025-02-15: 78 | 6 | -2
  2025-03-15: 111 | 10 | 2
  2025-04-15: 104 | 17 | 7
  2025-05-15: 100 | 22 | 12
  2025-06-15: 112 | 27 | 18
  2025-07-15: 117 | 29 | 21
  2025-08-15: 113 | 29 | 20
  2025-09-15: 109 | 25 | 16
  2025-10-15: 111 | 18 | 10
  2025-11-15: 92 | 12 | 5
  2025-12-15: 111 | 7 | 0
```

Rain is spread evenly through the year, so the choice is about temperature. Spring and early autumn are mild; July and August are hot and humid, and January can sit below freezing for days.

*Monthly averages, rounded.*
