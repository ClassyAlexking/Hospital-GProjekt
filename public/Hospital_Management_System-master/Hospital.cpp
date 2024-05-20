#include "Hospital.h"
#include <sstream>
#include <string>
#include <fstream>

#include "Patient.h"
#include "Staff.h"
#include "Admin.h"
#include "CreatePerson.h"
using namespace std;

std::map<int, Staff> Hospital::mapStaff;
std::map<int, Patient> Hospital::mapPatient;
std::map<int, Appointment> Hospital::mapAppointment;
std::map<int, Admin> Hospital::mapAdmin;
std::map<std::string, User> Hospital::mapUser;
bool Hospital::loggedIn;

Hospital::Hospital()
{
}
void Hospital::updateStaffInformation()
{
    // update staff from database
    fstream fileStaff;
    fileStaff.open("./../data/staff.csv", ios::in);
    string line, word;
    vector<string> row;
    getline(fileStaff, line);

    while (getline(fileStaff, line))
    {

        stringstream ssLine(line);
        row.clear();
        while (getline(ssLine, word, ','))
        {
            row.push_back(word);
        }
        try
        {
            int id = stoi(row[0]);
            mapStaff[id].setFirstName(row[1]);
            mapStaff[id].setLastName(row[2]);
            mapStaff[id].setAge(stoi(row[3]));
            mapStaff[id].setIDNumber(row[4]);
            // set birth day
            std::string day, month, year;
            std::stringstream ss(row[5]);
            std::getline(ss, day, '/');
            std::getline(ss, month, '/');
            std::getline(ss, year, '/');
            Date tmpDate;
            tmpDate.setDay(stoi(day));
            tmpDate.setMonth(stoi(month));
            tmpDate.setYear(stoi(year));
            mapStaff[id].setBirthDate(tmpDate);
            mapStaff[id].setRole(row[6]);
            mapStaff[id].setSpecialist(row[7]);
        }
        catch (const std::exception &e)
        {
            std::cerr << e.what() << '\n';
        }
    }

    fileStaff.close();
}
void Hospital::updatePatientInformation()
{
}
void Hospital::updateAdmin()
{
    // update staff from database
    fstream fileAdmin;
    fileAdmin.open("./../data/admin.csv", ios::in);
    string line, word;
    vector<string> row;
    getline(fileAdmin, line);

    while (getline(fileAdmin, line))
    {
        stringstream ssLine(line);
        row.clear();

        while (getline(ssLine, word, ','))
        {
            row.push_back(word);
        }
        try
        {
            int id = stoi(row[0]);
            mapAdmin[id].setFirstName(row[1]);
            mapAdmin[id].setLastName(row[2]);
            mapAdmin[id].setAge(stoi(row[3]));
            mapAdmin[id].setIDNumber(row[4]);

            // set birth day
            std::string day, month, year;
            std::stringstream ss(row[5]);
            std::getline(ss, day, '/');
            std::getline(ss, month, '/');
            std::getline(ss, year, '/');
            Date tmpDate;
            tmpDate.setDay(stoi(day));
            tmpDate.setMonth(stoi(month));
            tmpDate.setYear(stoi(year));
            mapAdmin[id].setBirthDate(tmpDate);
            mapAdmin[id].setRole(row[6]);
        }
        catch (const std::exception &e)
        {
            std::cerr << e.what() << '\n';
        }
    }

    fileAdmin.close();
}
void Hospital::updateApointments()
{
    // udate staff from database
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
        int id = stoi(row[0]);
        int idStaff = stoi(row[1]);
        int idPatient = stoi(row[2]);
        mapAppointment[id].setStaff(mapStaff[idStaff]);
        mapAppointment[id].setPatient(mapPatient[idPatient]);
        std::string day, month, year, hour, min;
        std::stringstream ss(row[3]);
        std::getline(ss, day, '/');
        std::getline(ss, month, '/');
        std::getline(ss, year, '/');
        Date tmpDate;
        tmpDate.setDay(stoi(day));
        tmpDate.setMonth(stoi(month));
        tmpDate.setYear(stoi(year));
        std::stringstream ss1(row[4]);
        std::getline(ss1, hour, ':');
        std::getline(ss1, min, ':');
        tmpDate.setMin(stoi(min));
        tmpDate.setHour(stoi(hour));
        mapAppointment[id].setDateSchedule(tmpDate);
    }
}
void Hospital::updateUsers()
{
    // update staff from database
    fstream fileUser;
    fileUser.open("./../data/user.csv", ios::in);
    string line, word;
    vector<string> row;
    getline(fileUser, line);

    while (getline(fileUser, line))
    {
        stringstream ssLine(line);
        row.clear();

        while (getline(ssLine, word, ','))
        {
            row.push_back(word);
        }
        try
        {
            std::string userName = row[1];
            mapUser[userName].setID(stoi(row[0]));
            mapUser[userName].setUserName(userName);
            mapUser[userName].setPassWord(row[2]);
        }
        catch (const std::exception &e)
        {
            std::cerr << "Error in user!" << e.what() << '\n';
        }
    }

    fileUser.close();
}
void Hospital::displayStaffs()
{
    cout << "Display all of staffs!\n";
    for (auto &staff : mapStaff)
    {
        staff.second.displayDetail();
    }
}
void Hospital::displayPatient()
{
    // cout << "Display all of patients!\n";
    // for (auto &patient : mapPatient)
    // {
    //     cout << "The patient ID is: " << patient.first << endl
    //          << patient.second.displayDetail();
    // }
}
void Hospital::displayAppointment()
{
}
void Hospital::login()
{
    std::string userName;
    std::string passWord;
    cout << "WELCOM TO HOSPITAL SYSTEM \n";
    cout << "Enter your user name: ";
    cin >> userName;
    cout << "Enter your password: ";
    cin >> passWord;
    auto it = mapUser.find(userName);
    if (it != mapUser.end())
    {
        if (it->second.getPassWord() == passWord)
        {
            cout << "LOGIN SUCCEESFULLY\n";
            loggedIn = true;
            int idNewAccount = it->second.getID();
            auto newStaff = mapStaff.find(idNewAccount);
            auto newPatient = mapPatient.find(idNewAccount);
            auto newAdmin = mapAdmin.find(idNewAccount);
            if (newStaff != mapStaff.end())
            {
                newStaff->second.function();
            }
            else if (newPatient != mapPatient.end())
            {
                newPatient->second.function();
            }
            else if (newAdmin != mapAdmin.end())
            {
                newAdmin->second.function();
            }
        }
        else
        {
            cout << "Your password is not correctly\n";
        }
    }
    else
    {
        cout << "Could not find your username !!!!\n";
    }
}
void Hospital::logout()
{
}
void Hospital::registerAccount()
{
    cout << "WELCOME TO REGISTER NEW ACCOUNT IN HOSPITAL SYSTEM!!\n";
    cout << "Enter account you want to register:" << endl
         << "[1] : Staff Registration" << endl
         << "[2] : Patient Registration" << endl
         << "[3] : Admin Registration" << endl;
    int option;
    cout << "Enter your choice: ";
    cin >> option;

    std::shared_ptr<Person> newPerson = CreatePerson::createPerson(option);
    if (newPerson)
    {
        newPerson->addPerson();
    }
    else
    {
        cout << "Invalid option selected." << endl;
    }
}

Hospital::~Hospital()
{
}
