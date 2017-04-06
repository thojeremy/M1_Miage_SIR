# TP7: AngularJS communiquant avec le TP4

https://docs.google.com/document/d/1dv3CJVP8OSk63r8KtoYjF0ByZL3VLcJ0Bjsf1opZfiA/edit

Lien vers le TP4 : https://github.com/thojeremy/M1_Miage_SIR/tree/master/tp4

## Démarrage du tp

Faire le build avec la commande 'grunt'

Lancer dans le navigateur avec la commande 'grunt serve'

## Description du tp

Dans ce tp, il nous a été demandé d'utiliser AngularJS afin de créer une interface interragissant avec le tp4 (JAX-RS)

Ce tp contient une architecture MVC. Les vues sont dans 'app/views' et les controlleurs sont dans 'app/scripts/controllers'

Vue  		  | Controlleur
------------- | -------------
main.html  	  | app.js
ajout.html    | ajout.js
liste.html    | liste.js

## Easter eggs

* Monte le son!
	* Une synthèse vocale a été mise en place sur le projet
* Nombre d'erreurs rencontrées
	* Dans la page d'ajout, lorsque tu te trompes 4 fois ou plus, la synthèse vocale t'insulte
* Champs de formulaire
	* Dans la page d'ajout, lorsque tu écris 'ma bite' dans le nom ou le prénom, la synthèse vocale te trolle
