package models;

public class Kindergarten {

    private String address;
    private int capacityAgeGroup2to3;
    private int capacityAgeGroup3to6;
    private String elderate;
    private String id;
    private String name;
    private String directorName;
    private String directorSurname;

    public String getDirectorName() {
        return directorName;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }

    public String getDirectorSurname() {
        return directorSurname;
    }

    public void setDirectorSurname(String directorSurname) {
        this.directorSurname = directorSurname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getElderate() {
        return elderate;
    }

    public void setElderate(String elderate) {
        this.elderate = elderate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCapacityAgeGroup2to3() {
        return capacityAgeGroup2to3;
    }

    public void setCapacityAgeGroup2to3(int capacityAgeGroup2to3) {
        this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
    }

    public int getCapacityAgeGroup3to6() {
        return capacityAgeGroup3to6;
    }

    public void setCapacityAgeGroup3to6(int capacityAgeGroup3to6) {
        this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
    }

    public enum elderate {
        ANTAKALNIO, FABIJONIŠKIŲ, GRIGIŠKIŲ, JUSTINIŠKIŲ, KAROLINIŠKIŲ, LAZDYNŲ, NAUJAMIESČIO, NAUJININKŲ,
        NAUJOSIOS_VILNIOS, PANERIŲ, PAŠILAIČIŲ, PILAITĖS, RASŲ, SENAMIESČIO, ŠEŠKINĖS, ŠNIPIŠKIŲ, VERKIŲ,
        VILKPĖDĖS, VIRŠULIŠKIŲ, VISOS_SENIŪNIJOS, ŽIRMŪNŲ, ŽVĖRYNO

    }
}
