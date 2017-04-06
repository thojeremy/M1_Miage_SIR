# TP3: MongoDB

## Description de MongoDB

MongoDB est un syst�me de base de donn�es orient� Big Data. Le point fort du Big Data est que les colonnes ne sont pas fixes comme dans les bases de donn�es non orient� Big Data, comme par exemple celles en PostgreSQL.

## Questions

* Quelles sont les limites d'une base de donn�es orient�e document?
	* On ne peut pas faire de jointures (ou on peut seulement difficilement en faire)
	* Ce n'est pas performant pour faire des traitements comparant toutes les entr�es de la base, car il faudra lire les documents un � un

* Quels sont les types de donn�es stock�s dans Redis?
	* Seulement des donn�es simples
		* Cha�nes de caract�res
		* Tableaux associatifs
		* Listes
		* Ensembles de donn�es
		* Bitmaps
		* Hyperloglogs
		* Indexes g�ospatiaux
		
* Que peut-on faire comme types de requ�tes?
	* Les requ�tes radius (pour le g�ospatial)
	* Les range queries (pour les ensembles)