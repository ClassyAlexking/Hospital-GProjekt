#include "Appointment.h"
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>

#include "Staff.h"
#include "Patient.h"
#include "Hospital.h"
using namespace std;
Appointment::Appointment()
{
    this->id = -1;
    this->patient.setID(-1);
    this->staff.setID(-1);
    this->status = -1;
}

void Appointment::setPatient(Patient& patient)
{
    this->patient = patient;
}
Patient Appointment::getPatient()
{
    return this->patient;
}

void Appointment::setStaff(Staff &staff)
{
    this->staff = staff;
}
Staff Appointment::getStaff()
{
    return this->staff;
}
void Appointment::setDateSchedule(Date& schedule)
{
    this->dateSchedule = schedule;
}
Date Appointment::getDateSchedule()
{
    return this->dateSchedule;
}
void Appointment::setStatus(int status)
{
    this->status = (status ? 1 : 0);
}
int Appointment::getStatus()
{
    return this->status;
}
void Appointment::addAppointment()
{
    // serch in data base and then adding patient and doctor
    string control;
    cout << "Did patient register yet? Y or N";
    cin >> control;
    if (control.compare("N") == 1)
    {
        this->patient.addPerson();
    }
    else
    {
        Hospital::displayStaffs();
        int tmp_id;
        cout << "Enter your ID patient: ";
        cin >> tmp_id;
    }
    cout << "Choose a ID doctor that you want to take apointment!!!" << endl;
    Hospital::displayStaffs();
    int idStaff;
    cin >> idStaff;
    //this->staff = Hospital::mapStaff[idStaff];
}

void Appointment::removeAppointment()
{
}