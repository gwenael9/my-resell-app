# Tester le projet

# Backend

1. installer les modules

```sh
cd backend && npm i
```

2. copier le fichier .env.example en un .env

```sh
cp .env.example .env
```

Puis changer la valeur de la clé secrète (ou pas).

3. lancer le backend ainsi qu'un script permettant la création de 15 articles

```sh
npm run init
```

Le serveur sera lancé sur le port 4000 ==> http://localhost:4000

# Frontend

1. installer les modules

```sh
cd frontend && npm i
```

2. Corriger les erreurs de formatage si besoin

```sh
npm run lint -- --fix
```

3. Lancer le frontend

```sh
npm run serve
```

Le frontend sera lancé sur le port 8080 ==> http://localhost:8080