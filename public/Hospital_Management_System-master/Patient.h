#ifndef PATIENT_H
#define PATIENT_H
#include <iostream>
#include <string>
#include "Person.h"
// #pragma once

class Patient : public Person
{
public:
    Patient();
    ~Patient();
    virtual void function() override;

private:
};

#endif