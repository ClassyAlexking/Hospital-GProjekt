#ifndef HOSPITAL_H
#define HOSPITAL_H
#include <map>

#include "Appointment.h"
#include "Patient.h"
#include "Admin.h"
#include "User.h"

// #pragma once

class Hospital
{
public:
    Hospital();
    ~Hospital();
    static void updateStaffInformation();
    static void updatePatientInformation();
    static void updateApointments();
    static void updateAdmin();
    static void updateUsers();

    static void displayStaffs();
    static void displayPatient();
    static void displayAppointment();

    static void login();
    static void logout();
    static void registerAccount();


private:
    friend class Appointment;
    friend class Staff;
    friend class Admin;
    friend class User;


    // key: ID ---> value: Staff
    static std::map<int, Staff> mapStaff;
    static std::map<int, Patient> mapPatient;
    static std::map<int, Appointment> mapAppointment;
    static std::map<int, Admin> mapAdmin;
    static std::map<std::string, User> mapUser;
    static bool loggedIn;
};

#endif