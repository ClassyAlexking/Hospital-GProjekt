#include "CreatePerson.h"
#include "Staff.h"
#include "Admin.h"
#include "Patient.h"
std::shared_ptr<Person> CreatePerson::createPerson(int type)
{
    switch (type)
    {
    case 1:
        return std::make_shared<Staff>();
    case 2:
        return std::make_shared<Admin>();
    case 3:
        return std::make_shared<Patient>();
    default:
        return nullptr; // Return nullptr for invalid type
    }
}