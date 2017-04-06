# TP3: MongoDB

## Description de MongoDB

MongoDB est un système de base de données orienté Big Data. Le point fort du Big Data est que les colonnes ne sont pas fixes comme dans les bases de données non orienté Big Data, comme par exemple celles en PostgreSQL.

## Questions

* Quelles sont les limites d'une base de données orientée document?
	* On ne peut pas faire de jointures (ou on peut seulement difficilement en faire)
	* Ce n'est pas performant pour faire des traitements comparant toutes les entrées de la base, car il faudra lire les documents un à un

* Quels sont les types de données stockés dans Redis?
	* Seulement des données simples
		* Chaînes de caractères
		* Tableaux associatifs
		* Listes
		* Ensembles de données
		* Bitmaps
		* Hyperloglogs
		* Indexes géospatiaux
		
* Que peut-on faire comme types de requêtes?
	* Les requêtes radius (pour le géospatial)
	* Les range queries (pour les ensembles)