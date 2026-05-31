# 1. Aşama - Derleme
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["TaskTracker/TaskTracker.csproj", "TaskTracker/"]
COPY ["TaskTracker.Application/TaskTracker.Application.csproj", "TaskTracker.Application/"]
COPY ["TaskTracker.Domain/TaskTracker.Domain.csproj", "TaskTracker.Domain/"]
COPY ["TaskTracker.Infrastructure/TaskTracker.Infrastructure.csproj", "TaskTracker.Infrastructure/"]

RUN dotnet restore "TaskTracker/TaskTracker.csproj"

COPY . .
WORKDIR "/src/TaskTracker"
RUN dotnet publish "TaskTracker.csproj" -c Release -o /app/publish

# 2. Aşama - Çalıştırma
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TaskTracker.dll"]