# Aguas Newenko - Backend

Este es el backend de la aplicación de gestión interna para Aguas Newenko. Está construido con Node.js, Express y MongoDB.

## Estructura

- `models/`: Definiciones de esquemas de Mongoose
- `routes/`: Rutas de la API REST
- `index.js`: Archivo principal de entrada
- `.env.example`: Variables de entorno
- `package.json`: Dependencias y scripts

## Cómo iniciar

```bash
npm install
cp .env.example .env
npm run dev
```

## Endpoints

- `/api/auth`: Login y autenticación
- `/api/users`: Gestión de usuarios
- `/api/gpt`: Interacción con IA
- `/api/gpt-analisis`: Análisis inteligente
