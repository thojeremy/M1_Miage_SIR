package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class IntelligentElectronicDevice {
	private long id;

	private int consumption;
	
	@Transient
	private Person person;
	
	public IntelligentElectronicDevice(){
		consumption = 0;
		person = null;
	}
	
	public IntelligentElectronicDevice(int consumption, Person person){
		this.consumption = consumption;
		
		this.person = person;
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public IntelligentElectronicDevice setId(long id) {
		this.id = id;
		
		return this;
	}
	
	public int getConsumption() {
		return consumption;
	}

	public IntelligentElectronicDevice setConsumption(int consumption) {
		this.consumption = consumption;
		
		return this;
	}

	@ManyToOne
	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}
	
	
}
