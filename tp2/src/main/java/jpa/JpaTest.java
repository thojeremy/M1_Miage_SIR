package jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import domain.Person;


public class JpaTest {

	private EntityManager manager;

	public JpaTest(EntityManager manager) {
		this.manager = manager;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("example");
		EntityManager manager = factory.createEntityManager();
		JpaTest test = new JpaTest(manager);

		EntityTransaction tx = manager.getTransaction();
		tx.begin();
		
		try{
			int nbMax = (int) ((Math.random()*100) % 50) + 5;
			for(int i = 0; i < nbMax; i++){
				Person p = new Person();
				String nom = "";
				int nb = (int) ((Math.random()*100) % 5) + 5;
				for(int j = 0; j < nb; j++){
					nom += (char) ((int) ((Math.random()*100) % 26) + 97);
				}
				
				String prenom = "";
				nb = (int) ((Math.random()*100) % 5) + 5;
				for(int j = 0; j < nb; j++){
					prenom += (char) ((int) ((Math.random()*100) % 26) + 97);
				}
				
				String mail = "";
				
				nb = (int) ((Math.random()*100) % 5) + 5;
				for(int j = 0; j < nb; j++){
					mail += (char) ((int) ((Math.random()*100) % 26) + 97);
				}
				
				mail += "@";
				
				nb = (int) ((Math.random()*100) % 5) + 5;
				for(int j = 0; j < nb; j++){
					mail += (char) ((int) ((Math.random()*100) % 26) + 97);
				}
				
				mail += ".com";
				
				p.setNom(nom).setPrenom(prenom).setMail(mail);
				manager.persist(p);
			}
		} catch (Exception e){
			e.printStackTrace();
		}
				
		tx.commit();
		
		
		// TODOs
		
		
		
		
		manager.close();
		System.out.println("done");
	}

}
