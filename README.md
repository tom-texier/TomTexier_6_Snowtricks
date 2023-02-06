# OpenClassrooms - Développeur d'applications PHP / Symfony
## Projet 6 - Développez de A à Z le site communautaire SnowTricks

[![SymfonyInsight](https://insight.symfony.com/projects/8699c5e7-ac22-408c-bfa8-b7aa02e55ee9/mini.svg)](https://insight.symfony.com/projects/8699c5e7-ac22-408c-bfa8-b7aa02e55ee9)
[![Symfony Badge](https://img.shields.io/badge/Symfony-5.4-000000?style=flat-square&logo=symfony&logoColor=white/)](https://symfony.com/)
[![Twig Badge](https://img.shields.io/badge/Twig-3.5-bacf29?style=flat-square&logo=symfony&logoColor=white/)](https://twig.symfony.com/) 
[![Composer Badge](https://img.shields.io/badge/Composer-2.4-6c3e22?style=flat-square&logo=composer&logoColor=white/)](https://getcomposer.org/)
[![PHP Badge](https://img.shields.io/badge/PHP-7.4-7a86b8?style=flat-square&logo=php&logoColor=white/)](https://www.php.net/)
![HTML5 Badge](https://img.shields.io/badge/HTML-5-e34f26?style=flat-square&logo=html5&logoColor=white/)
![CSS3 Badge](https://img.shields.io/badge/CSS-3-1572B6?style=flat-square&logo=css3&logoColor=white/)
[![Node Badge](https://img.shields.io/badge/Node-18.9-339933?style=flat-square&logo=Node.js&logoColor=white/)](https://nodejs.org/fr/)

## Prérequis d'installation

Pour initialiser le projet, vous devrez avoir installé sur votre machine (les versions utilisées pour le projet sont indiquées ci-dessus) :
- Composer
- Node.js
- PHP
- Un SGBD

## Installation

1. Cloner le projet à l'emplacement de vote choix
```shell
git clone https://github.com/tom-texier/TomTexier_6_Snowtricks.git
```

2. Se déplacer à la racine du projet
```shell
cd TomTexier_6_Snowtricks
```

3. Installer les dépendances Composer
```shell
composer install
```

4. Installer les packages
```shell
npm install
```

5. Dupliquer le fichier `.env` à la racine et le renommer `.env.local`

6. Renseigner les informations de connexion à la base de données (ligne 32)
```dotenv
DATABASE_URL=mysql://username:password@127.0.0.1:3306/snowtricks
```

7. Compléter la clé secrète avec une chaîne aléatoire (minuscules, majuscules, chiffres, caractères spéciaux)
```dotenv
JWT_SECRET=VOTRE_CHAINE_DE_CARACTERES
```

8. Monter la base de données
```shell
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
```

9. Charger les données initiales
```shell
php bin/console doctrine:fixtures:load --no-interaction
```

10. Démarrer l'application
```shell
php -S localhost:8000 -t public
```
ou
```shell
symfony server:start
```

---

Ci-dessous les informations de connexion générées par le chargement des données initiales :

- Admin
  - ID : admin
  - MDP : 1adminadmin
- Utilisateur
    - ID : user0
    - MDP : password

Vous avez, bien sûr, la possibilité de vous inscrire sur le site en vous rendant sur la page d'inscription.
