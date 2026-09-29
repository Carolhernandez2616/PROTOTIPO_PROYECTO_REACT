# LSC — Conecta tus manos

Aplicación React para conocer y aprender sobre la Lengua de Señas Colombiana (LSC).

## Requisitos

- Node.js 20.19+ o 22.12+
- pnpm

## Desarrollo

```bash
pnpm install
pnpm dev
```

Vite inicia el servidor local e imprime la URL disponible en la terminal.

## Producción

```bash
pnpm build
pnpm preview
```

## Estructura

- `src/App.tsx`: vistas y lógica principal de la aplicación.
- `src/context/`: estado compartido de accesibilidad.
- `src/components/`: componentes reutilizables.
- `src/lib/`: utilidades compartidas.
- `src/assets/`: recursos procesados por Vite.
- `public/`: recursos estáticos servidos sin transformación.
