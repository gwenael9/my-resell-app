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

# RabbitMQ

Instruction pour l'installation de RabbitMQ et Erlang : 

Installer la version 4.0.5 de RabbitMQ (via l'exécutable) : https://github.com/rabbitmq/rabbitmq-server/releases/tag/v4.0.5
Installer la dernière version d'Erlang (via l'exécutable) : https://www.erlang.org/downloads

Une fois les deux installé, exécutez un invite de commande en tant qu'administrateur et exécutez la commande : 

```sh
rabbitmqctl status
```

Si rabbitmqctl n'est pas reconnu, ajoutez le dossier sbin de **C:\Program Files\RabbitMQ Server\rabbitmq_server-3.x.x\sbin** à la variable d'environnement "Path".

Ensuite, si rabbitmqctl vous affiche une erreur : **"Error, unable to perform an operation on node 'rabbit@username'..."**, vous allez devoir copier le fichier **C:\Users<ton_nom_utilisateur>.erlang.cookie** dans un deux autres endroits (copiez-le même s'il existe déjà).
**C:\Windows\System32\config\systemprofile.erlang.cookie**
**C:\ProgramData\RabbitMQ.erlang.cookie** (Si le dossier n'existe pas, créez-le et copiez le fichier .erlang.cookie à l'intérieur).

Une fois fait, exécutez un invite de commande en tant qu'administrateur et exécutez les commandes : 

```sh
rabbitmq-service.bat stop
rabbitmq-service.bat start
```

Maintenant, testez de nouveau la commande : 

```sh
rabbitmqctl status
```

1. Installation

```sh
npm install amqplib
```

Puis les types : 

```sh
npm install @types/amqplib
```

Puis lancer le serveur :

```sh
npm run dev
```

2. Lancer le worker de la modification d'article

```sh
 ts-node src/workers/article.worker.ts 
 ```

