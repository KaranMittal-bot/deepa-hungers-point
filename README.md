# Deepa Hunger's Point — QR Restaurant Website

V1 prototype based on the project's Product Requirements and User Flow documents.

## Stack
- React
- Vite
- Framer Motion
- Lucide React
- LocalStorage for cart persistence

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Important placeholders
Before production:
- Replace restaurant phone / WhatsApp / email / Instagram.
- Replace address and opening hours.
- Replace food images with approved restaurant photography.
- Replace sample menu data and prices with the actual menu.
- Decide final payment flow.
- Purchase/configure a permanent domain.
- Generate the final QR only after the permanent URL is ready.

## V1 architecture
No backend/database is required for this prototype. Menu content is centralized in `src/main.jsx`.
For production, move menu data into a dedicated data/config file before expanding the project.
