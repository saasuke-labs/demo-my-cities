---
title: Sydney
metadata:
  slug: sydney
  name: Sydney
  number: "05"
  code: SYD
  country: Australia
  summary: Harbour ferries, sandstone headlands and a swim before work.
  image: sydney.jpg
  accent: "#1f8a9e"
  lat: "-33.8688"
  lon: "151.2093"
  coords: 33.87° S, 151.21° E
  language: English
  currency: Australian dollar (A$)
  timezone: AEST, UTC+10
  best-months: October to November, March to April
  photo-by: Toni Pomar
  photo-by-url: https://unsplash.com/@t3k
  photo-url: https://unsplash.com/photos/a-view-of-the-sydney-opera-house-from-across-the-water-gUjGy3WPd8Y
  next-slug: paris
  next-name: Paris
data:
  weather:
    source: weather
---

Sydney is built around water. The harbour reaches so far inland that the ferry is ordinary public transport, and the ocean beaches are a bus ride from the office towers.

The seasons are the other way round. Christmas is high summer, and the coolest month is July.

## Don’t miss

- **The Opera House.** Walk all the way around it. The roof is covered in more than a million tiles and is not quite white.
- **The Manly ferry.** Half an hour across the harbour from Circular Quay, and the cheapest cruise in the city.
- **Bondi to Coogee.** A six-kilometre path along the cliffs, with a beach or a sea pool every twenty minutes.
- **The Royal Botanic Garden.** Follow the shore to Mrs Macquarie’s Chair for the view that puts the Opera House and the bridge in one frame.

## Eat and drink

Coffee is taken seriously, and the flat white is the local order. Eat fish and chips on the sand at Watsons Bay, try Sydney rock oysters when you see them, and head to Thai Town on Campbell Street for dinner. A meat pie is the correct lunch at any sports ground.

## From the airport

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "Sydney Airport")
@ride(title: "T8 train · 13 min", bg: "#1f8a9e", fg: "#ffffff")
@centre(title: "Central Station")

airport.e --> ride.w
ride.e --> centre.w
```

Trains leave from both terminals and reach Central in about 13 minutes. The fare includes a station access fee, so it costs more than the distance suggests.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Sydney, the next ten days
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
color: #1f8a9e | #3d5a80
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
title: Sydney through the year
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
color: #b9cfe4 | #1f8a9e | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 91 | 26 | 19
  2025-02-15: 132 | 26 | 19
  2025-03-15: 118 | 25 | 18
  2025-04-15: 127 | 23 | 15
  2025-05-15: 103 | 20 | 12
  2025-06-15: 142 | 17 | 9
  2025-07-15: 80 | 17 | 8
  2025-08-15: 75 | 18 | 9
  2025-09-15: 64 | 20 | 11
  2025-10-15: 68 | 22 | 14
  2025-11-15: 90 | 24 | 16
  2025-12-15: 73 | 25 | 18
```

The chart runs the other way from the European ones. Spring (October, November) and autumn (March, April) are warm and less humid than midsummer, and the sea stays swimmable until May.

*Monthly averages, rounded.*
