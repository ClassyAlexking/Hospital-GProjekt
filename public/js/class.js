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
function main() {
    // Create medications
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

main();