#ifndef APPOINTMENT_H
#define APPOINTMENT_H

#include "Staff.h"
#include "Date.h"
#include "Patient.h"
//#pragma once

class Appointment
{
public:
    Appointment();

    void setPatient(Patient&);
    Patient getPatient();

    void setStaff(Staff &);
    Staff getStaff();

    void setStatus(int);
    int getStatus();

    void setDateSchedule(Date&);
    Date getDateSchedule();
    void addAppointment();
    void removeAppointment();

private:
    int id;
    Patient patient;
    Staff staff;
    Date dateSchedule;
    int status;
};

#endif