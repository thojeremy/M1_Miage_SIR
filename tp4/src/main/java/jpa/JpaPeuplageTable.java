package jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.ejb.EntityManagerImpl;

import domain.Person;


public class JpaPeuplageTable {

	private EntityManager manager;

	public JpaPeuplageTable(EntityManager manager) {
		this.manager = manager;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		EntityManagerFactory factory = Persistence
				.createEntityManagerFactory("example");
		EntityManager manager = factory.createEntityManager();
		JpaPeuplageTable test = new JpaPeuplageTable(manager);

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
