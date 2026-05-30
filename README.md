# TaskTracker API

ASP.NET Core 8 ile geliştirilmiş görev takip REST API'si.

## Teknolojiler
- ASP.NET Core 8 Web API
- Clean Architecture
- Entity Framework Core
- PostgreSQL
- Docker & Docker Compose

## Çalıştırmak için
docker-compose up --build

## Katmanlar
- **Domain** - Entity'ler
- **Application** - Interface'ler, iş kuralları
- **Infrastructure** - Veritabanı işlemleri
- **API** - Controller'lar