# TP4 - Servlet, JPA et REST

docs.google.com/document/d/1FwMNYKXeDpCgM07ETd5hNb0qLhYRwuZXeUPf3_uAf9U/edit

# Architecture

Ressources statiques dans le dossier src/main/webapp

# A retenir

* En JPA, il faut utiliser le nom de la classe, et pas le nom de la table pour les requêtes.
* Mise en place d'un Singleton pour le JPA pour ne pas avoir de soucis.
* Pour ne pas DROP TABLE et CREATE TABLE automatiquement à chaque démarrage d'hibernate, il faut aller dans le persistence.xml et mettre la valeur de hibernate.hbm2ddl.auto à "update"

# Simplification de la question 6.e. et 7. - REST

Il fallait faire une méthode rest permettant d'afficher le code JSON d'une maison dans la question 6.e.
La question 7. d'adapter ce code aux autres classes que l'on avait (JSON de personne, heater, etc..).

J'ai donc directement fait la question 7 afin d'afficher le JSON d'une Person (REST). Comme ça, c'est validé.
Donc si vous cherchez ce qui doit être vu, allez dans la classe PersonService.

En gros, Jersey va aller chercher les classes annotées avec l'API JAX-RS dans le package fr.istic.sir.rest
Ensuite, en fonction de ce qu'on met @GET ou @POST ça agit quand le @Path est appelé par une requête GET ou POST (verbes html).
Et puis si on veut retourner du JSON, on met @Produces(MediaType.APPLICATION_JSON)

# Explication plus en détail de la mise en place pour l'API JAX-RS et la récupération/ajout de personne

En gros, j'ai déclaré @Path("/person") à la déclaration de la classe PersonService. Cela a permis de dire au serveur : "Quand t'as un bonhomme qui vient sur /person, par défaut tu lui balances ce que je te mettrai sans @Path et qui sera une de tes méthodes de classe. Ici, ce sera getPerson()"

Alors, j'ai fait une méthode de classe getPerson qui renvoie un objet Person et qui n'a pas de @Path (Pour être appelé par l'utilisateur qui tappe localhost:8080/rest/person dans sa barre de recherche).
Il y a @GET, cela veut dire que cette méthode est appelée lors d'un appel GET sur l'url localhost:8080/rest/person. Si on veut pour POST, on met @POST, pour DELETE, on met @DELETE, etc...
Enfin, j'ai mis un @Produces(MediaType.APPLICATION_JSON) ce qui permet de dire à l'API: "Toi, transforme l'objet que je te donne en un objet JSON et affiche-le à l'utilisateur"

Donc, cela permet de montrer le contenu de mon objet Person en JSON à un utilisateur venu consulter localhost:8080/rest/person via une requête GET.

Pour pousser un peu plus loin, j'ai fait une méthode donnant un objet Person qui s'appelle Jean-mich et qui est accessible via localhost:8080/rest/person/jean-mich. Le principe est le même.

Pour pousser encore un peu, j'ai fait un add qui permet d'ajouter. Le principe reste quasiment le même, ce qui change est que j'accède aux paramètres que transporte la requête POST pour les traiter.
En décortiquant ma fonction, il y a de nouveau:
@FormParam("email") qui correspond au "name" du champ dans le formulaire. Un peu comme $_POST["email"] si on veut une équivalence PHP.