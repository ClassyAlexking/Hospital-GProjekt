#ifndef ADMIN_H
#define ADMIN_H
#include "Person.h"
// #pragma once

class Admin : public Person
{
public:
    Admin();
    ~Admin();

    void addDoctor();
    void viewDoctocs();
    void removeDoctor();

    void viewPatient();
    void removePatient();
    void viewEquipments();
    void editEquipments();
    void viewAppointments();

    

    virtual void addPerson() override;
    virtual void removePerson() override;
    virtual void displayDetail() override;
    virtual void function() override;

private:
};

#endif