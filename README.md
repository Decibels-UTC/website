# Site web pour la commission, du PAE-UTC, Decibels
Decibels une commission de l'assocation loi 1901 PAE-UTC. Le but de cette commission est de fournir de l'assistance technique son et lumière aux autres associations de la fédération BDE-UTC sur des évenements étudiants.
Ce site est à la fois un site vitrine mais aussi un site d'inventaire qui permet à dBs de stocker de manière plus aisée son inventaire et l'exposer au public. 

## Technologies utilisées 
> Voici une liste non exhaustive des technologies principale utilisées.
- React.js (frontend)
- Django/python (backend - API)
- Docker (conteneurisation)
- supervisord (éxécution des scripts dans le conteneur)
- MySQL (database, peut être changé si besoin)
- github actions (déploiement automatique grâce à une CI/CD)

## Comment marche l'application 
L'application marche grâce à une API Rest. Cette API, qui est exposée grâce à django, permet de récupérer les informations stockées en base de données, la connexion utilisateur, etc. Elle communique notamment avec le frontend fait en React.JS (grâce à fetch). 

## Comment lancer le projet en local 
> Dans le futur il peut être intéressant d'utiliser un devcontainer pour permettre aux utilisateurs de développer sur l'application de façon plus aisée. Cette technologie marche avce vscode et l'extension remote development.

### Variables d'environnement 
La première étape pour pouvoir lancer le projet est de mettre ne place les variables d'environnement pour que le backend et le frontend puissent communiquer entre eux et avec la base de données (qui peut être distante ou non).
Un exemple de fichier `.env` est donné dans le fichier `.env.example`. Il se va de soi qu'un fichier `.env` ne doit jamais être inclus dans un commit. 

### Lancer l'application django
Comme tout application tournant grâce à python il faut l'éxécuter dans un environnement python (virtualvenv, poetry, conda ...)
Ici on peut accéder à cet environnement python grâce à la commande suivante <br/>
 - `pipenv shell` <br/>
Ensuite il faut installer les dépendances requises. Celles-ci sont listées dans le fichier `requirements.txt`. Pour les installer il suffit de lancer la commande suivante
 - `pip install -r requirements.txt`<br/>
Une fois cela fait, il y a des actions plus spécifiques à django qui doivent être faites.<br/>
D'abord il faut rentrer dans le projet django qui ici est dans le dossier nommé `backend`gracce à
- `cd backend`<br/>
Puis lancer la commande qui va créer la structure de la base de donnée en local et vérifier qu'il n'y a pas d'incohérances
- `python3 manage.py makemigrations` <br/>
Et enfin appliquer ces modifications à la base de données
- `python3 manage.py migrate` <br/>
Maintenant on peut enfin lancer le serveur django (qui est donc notre API)
- `python3 manage.py runserver` <br/>

### Lancer l'application React.js
> Attention il faut installer `npm` pour pouvoir lancer l'app React.js

Pour lancer l'application la première étape est (dans une autre console que l'application django qui doit continuer de tourner) d'installer les dépendances qui sont contenues dans le fichier `packages.json` grâce à la commande suivante 
- `npm install` <br/>
> Note :  Il ne faut jamais commit le `node_modules`, celui-ci se recrée au moment du `npm install`et contient les fichiers des dépendances
Une fois cela fait les dépendances sont à jour il suffit de lancer l'application grâce à la commande suivante
- `npm start` 


### Déploiement 

Actuellement déploiement de l'application se fait grâce aux github actions qui permettent via un runner github installé sur le serveur distant d'effectuer les actions décrites dans `.github/workflows/docker-image.yml`. 
Ici le fonctionnement est simple, les actions vont reconstruire le conteneur docker, le repull sur le serveur et le lancer. 
















