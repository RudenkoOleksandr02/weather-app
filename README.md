## Weather App

A simple React & TypeScript application that fetches and displays current weather data using the OpenWeatherMap API. The design is clean, minimalistic, and built with Mantine components.

![App Screenshot](https://res.cloudinary.com/dk4qggbsf/image/upload/v1745190079/weather-app/exaj9bntjdrcrkuf1vz7.png)

---

## Features

- Search weather by city name
- Display of city, temperature (°C), description, and icon
- Last-updated timestamp
- Error handling for invalid city names or API failures
- Caching of API responses for 5 minutes (in `localStorage`)

---

## Demo

A live demo is available at: https://weather-app-nine-ebon-57.vercel.app/

---

## Filling evn

- REACT_APP_WEATHER_API_KEY
- REACT_APP_WEATHER_BASE_URL

## Installation & Environment Variables

1. **Clone the repository**
   ```bash
   git clone https://github.com/RudenkoOleksandr02/weather-app.git
   cd weather-app
2. **Copy `env.example` to `.env.local` or `.env`**
   ```bash
   cp env.example .env.local
