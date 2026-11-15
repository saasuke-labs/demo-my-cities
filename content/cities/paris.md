---
title: Paris
flags:
  - europe
metadata:
  slug: paris
  name: Paris
  number: "06"
  code: PAR
  country: France
  summary: Zinc rooftops, river light and the long lunch.
  image: paris.jpg
  accent: "#4c6fbf"
  lat: "48.8566"
  lon: "2.3522"
  coords: 48.86° N, 2.35° E
  language: French
  currency: Euro (€)
  timezone: CET, UTC+1
  best-months: April to June, September to October
  photo-by: Anthony DELANOIX
  photo-by-url: https://unsplash.com/@anthonydelanoix
  photo-url: https://unsplash.com/photos/eiffel-tower-at-paris-france-QAwciFlS1g4
  next-slug: barcelona
  next-name: Barcelona
data:
  weather:
    source: weather
---

Paris is smaller than people expect. The whole city inside the ring road is about ten kilometres across, and the river runs through the middle of it, so a walk along the Seine passes half the things on your list.

The other half are best found without a list: a covered passage, a market street, a café terrace facing the pavement.

## Don’t miss

- **The Eiffel Tower.** See it from the Trocadéro first, then decide whether you need to go up. The stairs to the second floor have the shortest queue.
- **Musée d’Orsay.** The Impressionists, in a railway station. Smaller than the Louvre and easier to enjoy in one morning.
- **Sainte-Chapelle.** A thirteenth-century chapel that is mostly stained glass. Go on a sunny day.
- **Canal Saint-Martin.** Iron footbridges, plane trees and the neighbourhood’s evening picnic along the water.

## Eat and drink

Breakfast is a croissant eaten at the bakery counter. At lunch, look for the *formule*: two or three courses at a fixed price, written on a chalkboard. For the evening, a baguette, a wedge of Comté and a place on the riverbank are hard to improve on.

## From the airport

```nagare
@layout(w:760,h:90)

airport:Rectangle(x:5,y:14,w:226,h:62)
ride:Rectangle(x:267,y:14,w:226,h:62)
centre:Rectangle(x:529,y:14,w:226,h:62)

@airport(title: "Charles de Gaulle Airport")
@ride(title: "RER B · 35 min", bg: "#4c6fbf", fg: "#ffffff")
@centre(title: "Gare du Nord")

airport.e --> ride.w
ride.e --> centre.w
```

Allow about 35 minutes, and take a train marked as direct to Paris: the stopping service adds ten more. From Orly, Métro line 14 reaches Châtelet in about twenty-five minutes.

## The next ten days

{{ with .Data.weather }}{{ with .daily }}
```nagare
chart
title: Paris, the next ten days
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
color: #4c6fbf | #3d5a80
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
title: Paris through the year
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
color: #b9cfe4 | #4c6fbf | #3d5a80
style: bar | line | dashed
data:
  2025-01-15: 51 | 7 | 3
  2025-02-15: 41 | 8 | 3
  2025-03-15: 48 | 12 | 5
  2025-04-15: 52 | 16 | 7
  2025-05-15: 63 | 20 | 11
  2025-06-15: 50 | 23 | 14
  2025-07-15: 62 | 25 | 16
  2025-08-15: 53 | 25 | 16
  2025-09-15: 48 | 21 | 13
  2025-10-15: 62 | 16 | 10
  2025-11-15: 52 | 11 | 6
  2025-12-15: 59 | 8 | 3
```

There is no dry season: rain is light and spread across the year. May, June and September have long evenings and mild days. In August many small restaurants close for the holidays.

*Monthly averages, rounded.*
