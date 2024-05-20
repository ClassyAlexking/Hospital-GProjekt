
#include "Person.h"
#include <iostream>
#include <fstream>
#include <stdexcept>
#include <vector>
using namespace std;
Person::Person()
{
    this->age = 0;
}
Person::~Person()
{
}
void Person::setFirstName(std::string firstname)
{

    this->firstName = firstname;
}
std::string Person::getFirstName()
{
    return this->firstName;
}

void Person::setLastName(string lastname)
{

    this->lastName = lastname;
}
std::string Person::getLastName()
{
    return this->lastName;
}

void Person::setAge(int age)
{

    if (age > 0 && age < 100)
        this->age = age;
    else
        throw invalid_argument("\nThe age no valid!!");
}
int Person::getAge()
{
    return this->age;
}

void Person::setIDNumber(string idNumber)
{
    if (idNumber.size() == 10)
        this->IDNumber = idNumber;
    else
        throw invalid_argument("Please enter 10 digits for ID number");
}
std::string Person::getIDNumber()
{
    return this->IDNumber;
}

void Person::setBirthDate(Date date)
{
    this->birthDay.addHalf(date.getDay(), date.getMonth(), date.getYear());
}
Date Person::getBirthDate()
{
    return this->birthDay;
}
void Person::setIDApointments(int id)
{
    cout << "Adding apointments id: " << id << endl;
    this->IDApointments.push_back(id);
}
void Person::getIDApointments()
{
    int coutApointment = 0;
    for (auto apointment : IDApointments)
    {
        cout << "ID apointment " << ++coutApointment << "is: " << apointment << endl;
    }
}
void Person::setRole(std::string &role)
{
    this->role = role;
}
std::string Person::getRole()
{
    return this->role;
}
void Person::addPerson()
{
    User::addUser();
    string firstname;
    cout << "Enter first name: ";
    cin >> firstname;
    setFirstName(firstname);
    string lastname;
    cout << "Enter last name: ";
    cin >> lastname;
    setLastName(lastname);
    int age;
    cout << "Enter age: ";
    cin >> age;
    setAge(age);
    cout << "Set your birth day" << endl;
    unsigned int day;
    cout << "Enter day: ";
    cin >> day;
    unsigned int month;
    cout << "Enter month: ";
    cin >> month;
    unsigned int year;
    cout << "Enter year: ";
    cin >> year;
    setBirthDate(birthDay.addHalf(day, month, year));
    string idNumber;
    cout << "Enter ID number with 10 digits: ";
    cin >> idNumber;
    setIDNumber(idNumber);
}
void Person::removePerson()
{
}
void Person::displayDetail()
{
    cout << "\nThe person is " << firstName << " " << lastName << endl
         << "ID :" << getID() << endl
         << "Age is " << age << endl
         << "Birthday " << birthDay.getDay() << '/' << birthDay.getMonth() << '/' << birthDay.getYear() << endl
         << "ID number is " << IDNumber << endl;
}