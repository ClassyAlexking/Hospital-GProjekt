import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAd2ugMbf5y8Xyp_yOHusRUFwB0e_sCynQ",
    authDomain: "hospital-gprojekt.firebaseapp.com",
    databaseURL: "https://hospital-gprojekt-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hospital-gprojekt",
    storageBucket: "hospital-gprojekt.appspot.com",
    messagingSenderId: "195852882182",
    appId: "1:195852882182:web:803d496230956b3dab4e87"
  };

const app = initializeApp(firebaseConfig);

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";


const db = getDatabase();


export class User {
    constructor(email,password,username,phoneNumber,sex,birthdate,role,historyVer) {
        this.userName = username;
        this.passWord = password;
        this.email = email;
        this.phoneNumber=phoneNumber;
        this.sex= sex;
        this.birthdate= birthdate;
        this.role=role;
        this.historyVer=historyVer;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(userName) {
        this.userName = userName;
    }

    setPassWord(passWord) {
        this.passWord = passWord;
    }

    getPassWord() {
        return this.passWord;
    }

    setID(id) {
        this.id = id;
    }

    getID() {
        return this.id;
    }

    addUser() {
        // Implement functionality to add user (if needed)
    }
}
export class Doctor extends User {
    constructor(email,password,username,phoneNumber,sex,birthdate,role,historyVer,specialty,yearOfExp) {
        super(email,password,username,phoneNumber,sex,birthdate,role,historyVer);
        alert("THIS");
        this.specialty = specialty;
        alert(specialty);
        this.yearOfExp = yearOfExp;
    }
}

export class DoctorList {
    constructor() {
        this.doctors = [];
    }

    // Method to add a doctor to the list
    addDoctor(doctor) {
        if (doctor instanceof Doctor) {
            this.doctors.push(doctor);
        } else {
            throw new Error("Only Doctor instances can be added to the list.");
        }
    }

    // Method to remove a doctor by email
    removeDoctor(email) {
        this.doctors = this.doctors.filter(doctor => doctor.email !== email);
    }

    // Method to find a doctor by email
    findDoctor(email) {
        return this.doctors.find(doctor => doctor.email === email);
    }

    // Method to get all doctors
    getAllDoctors() {
        return this.doctors;
    }
}




class Medication {
    constructor(ID, name, number, manufacturer, expiryDate,) {
        this.ID = ID;
        this.name = name;
        this.number = number;
        this.manufacturer = manufacturer;
        this.expiryDate = expiryDate;
        this.versionDate = 1;
    }

    // Method to check if medication is expired
    isExpired() {
        let currentDate = new Date();
        return this.expiryDate < currentDate;
    }
}

// Warehouse class representing a warehouse containing medications
class Warehouse {
    constructor() {
        this.medications = [];
    }

    // Method to add medication to the warehouse
    addMedication(medication) {
        this.medications.push(medication);
    }

    // Method to export medications that are expired
    exportExpiredMedications() {
        let expiredMedications = [];
        this.medications = this.medications.filter(medication => {
            if (medication.isExpired()) {
                expiredMedications.push(medication);
                return false; // Remove expired medication from warehouse
            }
            return true;
        });
        return expiredMedications;
    }
}

// Main function to test the functionality

export let currentUser = {
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    sex: "",
    birthdate: "",
    role: "",
    historyVer: ""
};

export function updateUser(updateUser) {
    Object.assign(currentUser, updateUser);
}

function main() {
    // Init all the data class
    //


    let med1 = new Medication("Paracetamol", "ABC Pharmaceuticals", new Date(2024, 4, 30));
    let med2 = new Medication("Aspirin", "XYZ Pharmaceuticals", new Date(2023, 6, 15));
    let med3 = new Medication("Ibuprofen", "DEF Pharmaceuticals", new Date(2022, 10, 10));

    // Create warehouse
    let warehouse = new Warehouse();

    // Add medications to warehouse
    warehouse.addMedication(med1);
    warehouse.addMedication(med2);
    warehouse.addMedication(med3);

    // Export expired medications
    let expiredMeds = warehouse.exportExpiredMedications();
    
    // Display expired medications
    console.log("Expired medications:");
    expiredMeds.forEach(med => {
        console.log(`Name: ${med.name}, Manufacturer: ${med.manufacturer}, Expiry Date: ${med.expiryDate}`);
    });
}

// main();