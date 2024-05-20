#include "Date.h"
#include <stdexcept>
#include <iostream>
using namespace std;
Date::Date()
{
    this->min = 0;
    this->hour = 0;
    this->day = 0;
    this->month = 0;
    this->year = 0;
}
// Date(unsigned int, unsigned int, unsigned int, unsigned int, unsigned int);

unsigned int Date::getMin()
{
    return this->min;
}
void Date::setMin(int min)
{

    if (min < 60)
        this->min = min;
    else
        throw invalid_argument("Min is not valid !");
}

unsigned int Date::getHour()
{
    return this->hour;
}
void Date::setHour(int hour)
{

    if (hour < 24)
        this->hour = hour;
    else
        throw invalid_argument("Hour is not valid !");
}

unsigned int Date::getDay()
{
    return this->day;
}
void Date::setDay(int day)
{
    if (day <= 31)
        this->day = day;
    else
        throw invalid_argument("Day is not valid !");
}

unsigned int Date::getMonth()
{
    return this->month;
}
void Date::setMonth(int month)
{

    if (month <= 12)
        this->month = month;
    else
        throw invalid_argument("Month is not valid !");
}

unsigned int Date::getYear()
{
    return this->year;
}
void Date::setYear(int year)
{

    if (year <= 2024)
        this->year = year;
    else
        throw invalid_argument("Year is not valid !");
}

void Date::addFull(Date date)
{
    setMin(date.min);
    setHour(date.hour);
    setDay(date.day);
    setMonth(date.month);
    setYear(date.year);
}
Date Date::addHalf(unsigned int day, unsigned int month, unsigned int year)
{
    this->min = 0;
    this->hour = 0;
    setDay(day);
    setMonth(month);
    setYear(year);
    return *this;
}
