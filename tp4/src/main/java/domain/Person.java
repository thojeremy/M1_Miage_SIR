package domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Person {
	private Long id;
	
	private String nom, prenom, mail;
	@Transient
	private List<Home> homes;
	@Transient
	private List<Person> friends;
	@Transient
	private List<ElectronicDevice> devices;
	
	public Person(String nom, String prenom, String mail){
		this.nom = nom;
		this.prenom = prenom;
		this.mail = mail;
		
		homes = new ArrayList<Home>();
		friends = new ArrayList<Person>();
		devices = new ArrayList<ElectronicDevice>();
	}
	
	public Person(){
		nom = prenom = mail = "";
		
		homes = new ArrayList<Home>();
		friends = new ArrayList<Person>();
		devices = new ArrayList<ElectronicDevice>();
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public Person setId(Long id) {
		this.id = id;
		return this;
	}

	public String getNom() {
		return nom;
	}

	public Person setNom(String nom) {
		this.nom = nom;
		return this;
	}

	public String getPrenom() {
		return prenom;
	}

	public Person setPrenom(String prenom) {
		this.prenom = prenom;
		
		return this;
	}

	public String getMail() {
		return mail;
	}

	public Person setMail(String mail) {
		this.mail = mail;
		
		return this;
	}

	@OneToMany(mappedBy="person", cascade=CascadeType.PERSIST)
	public List<Home> getHomes() {
		return homes;
	}

	public Person setHomes(List<Home> homes) {
		this.homes = homes;
		
		return this;
	}

	@ManyToMany
	public List<Person> getFriends() {
		return friends;
	}

	public Person setFriends(List<Person> friends) {
		this.friends = friends;
		
		return this;
	}

	@OneToMany(mappedBy="person", cascade=CascadeType.PERSIST)
	public List<ElectronicDevice> getDevices() {
		return devices;
	}

	public Person setDevices(List<ElectronicDevice> devices) {
		this.devices = devices;
		
		return this;
	}
}
