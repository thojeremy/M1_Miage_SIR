package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class ElectronicDevice {
	private long id;

	private int consumption;
	
	@Transient
	private Person person;
	
	public ElectronicDevice(int consumption, Person person){
		this.consumption = consumption;
		
		this.person = person;
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public ElectronicDevice setId(long id) {
		this.id = id;
		
		return this;
	}
	
	public int getConsumption() {
		return consumption;
	}

	public ElectronicDevice setConsumption(int consumption) {
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