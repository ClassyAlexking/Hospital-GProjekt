#ifndef DATE_H
#define DATE_H

//#pragma once

class Date
{
public:
    Date();
    // Date(unsigned int, unsigned int, unsigned int, unsigned int, unsigned int);

    unsigned int getMin();
    void setMin(int);

    unsigned int getHour();
    void setHour(int);

    unsigned int getDay();
    void setDay(int);

    unsigned int getMonth();
    void setMonth(int);

    unsigned int getYear();
    void setYear(int);

    void addFull(Date);
    Date addHalf(unsigned int, unsigned int, unsigned int);

private:
    unsigned int min;
    unsigned int hour;
    unsigned int day;
    unsigned int month;
    unsigned int year;
};

#endif