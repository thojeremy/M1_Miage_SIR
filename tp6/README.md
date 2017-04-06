# TP6: AngularJS - Pokédex

https://docs.google.com/document/d/1FpdYNG02e9F_q3BaYQqJfkHEqwAdGHOzR0ts3PV3jOg/edit?usp=sharing

## Description

Ce tp est un pokédex uniquement compatible avec Firefox

Un conseil, en le testant, mettez le son, vous aurez une surprise lorsque le pokémon se chargera!

Il utilise une api : http://pokeapi.co/

## Mise en place technique

### Le $scope

Angular1 dispose d'une variable '$scope' permettant de transférer/utiliser des variables mises à jour au long du code dans le HTML

### Principe de factory

Afin d'interroger l'api, plusieurs 'factories' ont été mises en place.
Le principe d'une factory est qu'on peut les voir comme des fonctions utilisables partout. C'est pour cela qu'on retourne des ressources pointant sur les différentes adresses de l'api.

### Principe de service et le $watch

Afin de savoir quand l'utilisateur clique sur le bouton 'GO', un système de 'service' a été mis en place avec un '$watch' sur un de ses éléments booléen.

Le $watch prend en arguments :

* L'objet à observer et tracker les changements
* La fonction exécutée lorsque l'objet est modifié