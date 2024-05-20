#ifndef CREATEPERSON_H
#define CREATEPERSON_H
#include "Person.h"
#include <memory>
#pragma once

class CreatePerson
{
public:
    static std::shared_ptr<Person> createPerson(int);

private:
};

#endif