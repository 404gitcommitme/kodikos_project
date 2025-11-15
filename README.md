# 🖥️ Admin Dashboard – React App

## Description
Cette application est un **dashboard administrateur** développée avec **React**.  
Elle permet de visualiser les données des utilisateurs et capteurs provenant d’un serveur backend via des API.  
L’application est conçue pour être facile à utiliser et à personnaliser.

---

## Fonctionnalités
- Interface moderne et responsive
- Visualisation des données utilisateurs / capteurs / statistiques
- Navigation simple et fluide
- Chargement dynamique des données depuis un backend
- Code modulable et facilement maintenable

---

## Configuration du Backend
L’application communique avec un serveur backend.  
Vous pouvez modifier l’adresse IP du backend directement dans le fichier `App.tsx`.

```tsx
// src/ App.tsx ligne 16 ---------------( const res = await fetch('http://192.168.15.125:8000/api/admin/hive-stats/', { cache: 'no-store' });
)
const BACKEND_URL = "http://192.168.15.125:8000"; 
// Remplacez par l’adresse IP de votre serveur
