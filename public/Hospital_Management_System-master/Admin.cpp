#include "Admin.h"
#include <iostream>
#include <fstream>
#include "Hospital.h"
#include "Staff.h"
using namespace std;
Admin::Admin()
{
}
void Admin::addPerson()
{
    cout << "Adding new Admin into the system" << endl;
    Person::addPerson();
    string role = "Admin";
    setRole(role);
    fstream fileAdmin;
    fileAdmin.open("./../data/admin.csv", ios::app);
    fileAdmin << endl
              << getID() << ','
              << getFirstName() << ','
              << getLastName() << ','
              << getAge() << ','
              << getIDNumber() << ','
              << getBirthDate().getDay() << '/' << getBirthDate().getMonth() << '/' << getBirthDate().getYear() << ','
              << getRole() << endl;
    fileAdmin.close();
    Hospital::mapAdmin[getID()] = *this;
}
void Admin::addDoctor()
{
    Staff newStaff;
    newStaff.addPerson();
}
void Admin::viewDoctocs()
{
    Hospital::displayStaffs();
}
void Admin::removeDoctor()
{
}

void Admin::viewPatient()
{
    Hospital::displayPatient();
}
void Admin::removePatient()
{
}
void Admin::viewEquipments()
{
    // todo: view all of equipments
}
void Admin::editEquipments()
{
    // todo: edit/change all of equipments
}
void Admin::viewAppointments()
{
    Hospital::displayAppointment();
}

void Admin::removePerson()
{
}
void Admin::displayDetail()
{
    cout << "\nThis is the informations of Admin!!" << endl;
    Person::displayDetail();
}
void Admin::function()
{

    bool end_program = false;
    while (!end_program)
    {
        cout << "\nChoose your option: \n"
             << "[1]: View your information\n"
             << "[2]: Add a doctor\n"
             << "[3]: View all of doctors\n"
             << "[4]: Remove a doctor\n"
             << "[5]: view all of patients\n"
             << "[6]: view all of Equipments\n"
             << "[7]: Edit the status of Equipments\n"
             << "[8]: Exit\n"
             << "Enter your choice: ";

        int control;
        cin >> control;
        switch (control)
        {
        case 1:
            this->displayDetail();
            break;
        case 2:
            this->addDoctor();
            break;
        case 3:
            this->viewDoctocs();
            break;
        case 4:
            this->removeDoctor();
            break;
        case 5:
            this->viewPatient();
            break;
        case 6:
            this->viewEquipments();
            break;
        case 7:
            this->editEquipments();
            break;
        case 8:
            end_program = true;
            break;
        default:
            break;
        }
    }
}

Admin::~Admin()
{
}