# TP1: Initiation aux Syst�mes d'Informations R�partis

## Norme de codage

La norme de codage � laquelle se r�f�re le rapport est : Sun
Pour utiliser la norme de google, il faut cr�er le fichier de configuration de google. Lui donner un nom
comme par exemple google.xml. Enfin, il faut ajouter le plugin maven-checkstyle-plugin, lui mettre un
tag configuration, y mettre un tag configLocation avec le nom du fichier de configuration qu'on veut.
Dans notre cas ce sera google.xml. Cela nous donnera donc:

'<plugin>
	  <groupId>org.apache.maven.plugins</groupId>
	  <artifactId>maven-checkstyle-plugin</artifactId>
	  <version>2.17</version>
	  <configuration>
			<configLocation>google.xml</configLocation>
	  </configuration>
</plugin>'

## Le plugin JXR de maven

Le plugin JRX permet d'avoir des rapports en plus, mais en affichant le code source

## Les rapports d'erreur avec PMD

Il faut ajouter le plugin dans le reporting pour savoir s'il y a du code dupliqu�:
'<plugins>
	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-pmd-plugin</artifactId>
		<version>2.5</version>
	</plugin>
</plugins>'

Apr�s avoir fait un mvn site, 2 nouveaux rapports sont g�n�r�s:
CPD Report: Sert � trouver le code dupliqu� (Pr�sence d'une section "Duplications"
PMD Report: Sert � trouver le code mort

## Activit� du projet

Ajouter le plugin maven-changelog-plugin dans la section reporting:
'<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-changelog-plugin</artifactId>
</plugin>'

Mettre une connection:

'<scm>
	<connection>scm:git://github.com/thojeremy/M1_Miage_SIR</connection>
	<url>http://github.com/thojeremy/M1_Miage_SIR</url>
</scm>'