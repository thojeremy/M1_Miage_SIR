# TP2: Traitement d'une base de données avec JPA

## Sujet

https://docs.google.com/document/d/1IfN_LvfZCZJIu4aNO3_2zpZqAsjObqWRd8Bs4sYtN1I/edit

## Explications

### JPA

JPA permet de traiter les données d'une base de données. On peut les traiter avec plusieurs annotations :
@OneToMany, @ManyToOne, @ManyToMany, @JSONIgnore...

### Explication de quelques annotations

* @OneToMany
	* Permet de mettre une relation 1..* se trouvant dans le code
* @ManyToOne
	* Permet de mettre une relation *..* se trouvant dans le code
* @ManyToMany
	* Permet de mettre une relation *..* se trouvant dans le code
* @Transiant
	* Permet de dire que la variable (de classe) annotée référencie une autre table
* @JSONIgnore
	* Permet de pallier à l'erreur qui fait que le les éléments se chargent entre eux et que ça boucle à l'infini