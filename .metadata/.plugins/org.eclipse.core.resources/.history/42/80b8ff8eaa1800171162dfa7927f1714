package domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Home {
	private long id;

	private int size, rooms;
	@Transient
	private List<IntelligentHeater> heaters;
	@Transient
	private Person person;
	
	public Home(){
		size = rooms = 0;
		person = null;
	}
	
	public Home(int size, int rooms, Person person){
		this.size = size;
		this.rooms = rooms;
		this.person = person;
		
		heaters = new ArrayList<IntelligentHeater>();
	}
	
	public int getSize() {
		return size;
	}

	public Home setSize(int size) {
		this.size = size;
		
		return this;
	}

	public int getRooms() {
		return rooms;
	}

	public Home setRooms(int rooms) {
		this.rooms = rooms;
		
		return this;
	}

	@OneToMany(mappedBy="home", cascade=CascadeType.PERSIST)
	public List<IntelligentHeater> getHeaters() {
		return heaters;
	}

	public Home setHeaters(List<IntelligentHeater> heaters) {
		this.heaters = heaters;
		
		return this;
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public Home setId(long id) {
		this.id = id;
		
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
