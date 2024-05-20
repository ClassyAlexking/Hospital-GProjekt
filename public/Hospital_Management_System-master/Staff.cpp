
#include "Staff.h"
#include "Hospital.h"
#include <sstream>
#include <fstream>
#include <vector>
#include <string>

using namespace std;
Staff::Staff() {}
Staff::~Staff() {}

void Staff::setSpecialist(string specialization)
{

    this->specialization = specialization;
}
std::string Staff::getSpecialist()
{
    return this->specialization;
}

void Staff::displayDetail()
{
    cout << "\nThis is the informations of staff!!" << endl;
    Person::displayDetail();
    cout << "Specialization of staff is " << this->specialization << endl;
}
void Staff::addPerson()
{
    cout << "Adding new staff into the system" << endl;
    Person::addPerson();
    string role = "Doctor";
    setRole(role);
    string specialization;
    cout << "Enter your specialization: ";
    cin >> specialization;
    setSpecialist(specialization);
    fstream fileStaff;
    fileStaff.open("./../data/staff.csv", ios::app);
    fileStaff << endl
              << getID() << ','
              << getFirstName() << ','
              << getLastName() << ','
              << getAge() << ','
              << getIDNumber() << ','
              << getBirthDate().getDay() << '/' << getBirthDate().getMonth() << '/' << getBirthDate().getYear() << ','
              << getRole() << ','
              << getSpecialist();
    fileStaff.close();

    Hospital::mapStaff[getID()] = *this;
}
void Staff::checkAppointments()
{
    // int coutAppointment = 0;
    //  udate staff from database
    fstream fileApp;
    fileApp.open("./../data/apointment.csv", ios::app);
    string line, word;
    vector<string> row;
    getline(fileApp, line);
    stringstream ssLine(line);
    while (!fileApp.eof())
    {
        while (getline(ssLine, word, ','))
        {
            row.push_back(word);
        }
        if (stoi(row[1]) == this->getID())
        {
            int idStaff = stoi(row[2]);
            int status = stoi(row[5]);
            cout << "Your appointment id " << row[0] << endl
                 << "Patient name is " << Hospital::mapPatient[idStaff].getFirstName() << " "
                 << Hospital::mapPatient[idStaff].getLastName() << endl
                 << "Status is " << (status ? "Wating" : "Checked") << endl;
        }
    }
    char control;
    do
    {
        cout << "Do you want to check any patient appointment??? Y or N\n";
        cin >> control;
        if (control == 'Y')
        {
            int idApp;
            cout << "Enter id appointment: " << endl;
            cin >> idApp;
            Hospital::mapAppointment[idApp].setStatus(1);
        }
    } while (control == 'N');
    fileApp.close();
}
void Staff::earseAppointments(int idApp)
{
    if (Hospital::mapAppointment.erase(idApp))
    {
        cout << "Earse id appointment " << idApp << "successfully" << endl;
    }
    else
    {
        cout << "There is no ID appointment " << endl;
    }
}
void Staff::function()
{

    bool end_program = false;
    while (!end_program)
    {
        cout << "\nChoose your option: \n"
             << "[1]: View your information\n"
             << "[2]: Watch all of appoitments\n"
             << "[3]: Earse a appoitment\n"
             << "[4]: Logout!\n"
             << "Enter your choice: ";
        int control;
        cin >> control;
        switch (control)
        {
        case 1:
            this->displayDetail();
            break;
        case 2:
            this->checkAppointments();
            break;
        case 3:
            int appoitment;
            cout << "Enter your earsed appoitment: ";
            cin >> appoitment;
            this->earseAppointments(appoitment);
            break;
        case 4:
            cout << "Loggout suceecfully\n";
            Hospital::loggedIn = false;
            end_program = true;
            break;
        default:
            break;
        }
    }
}
void Staff::removePerson()
{
}