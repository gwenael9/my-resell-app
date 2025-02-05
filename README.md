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

# Echanges

**Pour quelles raisons est-il possible de choisir un échange direct pour implémenter CQRS ?**

Un échange Direct est parfait pour CQRS car il permet de router les messages précisément grâce à des clés de routage. C’est simple et efficace : chaque message va directement à la bonne file (exemple : "commands" pour les commandes).

Avantages d'un échange Direct :
- Chaque message va là où il doit aller.
- Pas de surcharge inutile.

Files utilisées :
- commands_queue pour les écritures (création, updates).
- queries_queue (optionnel) pour les lectures.

Exemple de Nommage :
- Exchange : cqrs_exchange
- Queues : commands_queue, queries_queue
- Routing key : "commands", "queries"


**Dans quels cas un échange fanout serait-il pertinent pour le patron Saga ?**

Un échange Fanout est top pour Saga car il envoie le message à toutes les files connectées. C'est parfait quand plusieurs services doivent réagir à un même événement (exemple : lors du traitement d'une commande).

Cas d’usage :
- Notifier plusieurs services à la fois (stock, facturation, emails).

Exemple de Nommage :
- Exchange : saga_exchange
- Queues : stock_queue, billing_queue, notification_queue

Exemple concret : Une commande validée ➜ le message part à tous les services concernés en même temps.

# Sécurité

<div align="center">

| **Partie de l'application** | **Echanges** | **File** 
| :------------: | :------------: | :------------: | :------------: | :------------: |

</div>