---
title: Tokyo
metadata:
  slug: tokyo
  name: Tokyo
  number: "02"
  code: TYO
  country: Japan
  summary: Neon and temple bells, trains to the second, and ramen at midnight.
  image: tokyo.jpg
  accent: "#d6336c"
  lat: "35.6762"
  lon: "139.6503"
  coords: 35.68° N, 139.65° E
  language: Japanese
  currency: Yen (¥)
  timezone: JST, UTC+9
  best-months: March to April, October to November
  photo-by: Takashi Miyazaki
  photo-by-url: https://unsplash.com/@miyatankun
  photo-url: https://unsplash.com/photos/aerial-view-of-city-buildings-during-night-time-64ajtpEzlYc
  next-slug: new-york
  next-name: New York
data:
  weather:
    source: weather
---

Tokyo is less one city than a few dozen towns joined by the best railway on earth. Each station has its own centre, its own shopping street and its own mood, so the map only starts to make sense once you stop looking for a downtown.

It is enormous and almost never stressful. Things work, queues are orderly and the trains leave when the board says they will.

## Don’t miss

- **Sensō-ji, Asakusa.** Tokyo’s oldest temple. Arrive before eight, when the lanterns are lit and the stalls are still shuttered.
- **Shibuya Crossing.** Cross it once, then watch it from above. Dusk is the hour.
- **Meiji Shrine.** A forest planted a century ago in the middle of the city, five minutes from the noise of Harajuku.
- **Yanaka.** Low wooden houses, a cemetery full of cats and a shopping street that survived the twentieth century.

## Eat and drink

The best meals are often at a counter with eight seats. Buy a ticket from the machine at a ramen shop, point at what looks good in a standing soba bar, and let a department store food hall (a *depachika*) take care of the picnic. Convenience store egg sandwiches deserve their reputation.

## From the airport

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "Haneda Airport")
@ride(title: "Keikyū Line · 15 min", bg: "#d6336c", fg: "#ffffff")
@centre(title: "Shinagawa Station")

airport.e --> ride.w
ride.e --> centre.w
```

Haneda is the close airport, about a quarter of an hour from Shinagawa. From Narita, allow about an hour on the Narita Express or the Keisei Skyliner.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Tokyo, the next ten days
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
color: #d6336c | #3d5a80
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
title: Tokyo through the year
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
color: #b9cfe4 | #d6336c | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 60 | 10 | 1
  2025-02-15: 57 | 10 | 2
  2025-03-15: 116 | 14 | 5
  2025-04-15: 134 | 19 | 10
  2025-05-15: 140 | 23 | 15
  2025-06-15: 168 | 26 | 19
  2025-07-15: 156 | 30 | 23
  2025-08-15: 155 | 31 | 24
  2025-09-15: 225 | 27 | 21
  2025-10-15: 235 | 22 | 15
  2025-11-15: 96 | 17 | 9
  2025-12-15: 58 | 12 | 4
```

Cherry blossom arrives around the end of March and autumn colour in late November. June is the rainy season, and September and October bring the typhoon rain you can see in the chart.

*Monthly averages, rounded.*
