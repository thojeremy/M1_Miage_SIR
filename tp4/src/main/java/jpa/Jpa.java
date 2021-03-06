package jpa;

import javax.persistence.Query;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Jpa {
	private static EntityManager manager;
	private static Jpa jpa = null;

	private Jpa(EntityManager manager) {
		this.manager = manager;
	}
	
	public static Jpa getInstance(){
		if(jpa == null){
			EntityManagerFactory factory = Persistence
					.createEntityManagerFactory("example");
			EntityManager manager = factory.createEntityManager();
			jpa = new Jpa(manager);
		}
		
		return jpa;
	}
	
	public List query(String query){
		Query q = (Query) manager.createQuery(query);
		return q.getResultList();
	}
	
	public EntityManager getManager(){
		return manager;
	}
	
	public void close(){
		manager.close();
	}
}
