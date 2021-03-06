package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class IntelligentHeater {
	private long id;
	
	@Transient
	private Home home;
	
	public IntelligentHeater(Home home){
		this.home = home;
	}

	public IntelligentHeater setId(long id) {
		this.id = id;
		
		return this;
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	@ManyToOne
	public Home getHome() {
		return home;
	}

	public void setHome(Home home) {
		this.home = home;
	}
	
	
}
