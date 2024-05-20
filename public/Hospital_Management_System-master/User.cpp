#include "User.h"
#include <iostream>
#include <string>
#include "Hospital.h"
#include <map>
#include <fstream>
using namespace std;
User::User()
{
    this->id = -1;
}

User::~User()
{
}
void User::setID(int id)
{

    this->id = id;
}
int User::getID()
{
    return this->id;
}
void User::setUserName(std::string username)
{
    this->userName = username;
}
std::string User::getUserName()
{
    return this->userName;
}
void User::setPassWord(std::string password)
{
    this->passWord = password;
}
std::string User::getPassWord()
{
    return this->passWord;
}
void User::addUser()
{
    std::string rUserName;
    std::string rPassWord1;
    std::string rPassWord2;
    int count = 0;
    std::cout << "Enter your username: ";
    std::cin >> rUserName;
    std::cout << "Enter your password: ";
    std::cin >> rPassWord1;
    do
    {
        std::cout << "Enter your password again: ";
        std::cin >> rPassWord2;
        count++;
    } while (rPassWord2 != rPassWord1 && count < 3);
    if (count == 3)
    {
        // todo: exit program or handle invalid input
        return;
    }
    setUserName(rUserName);
    setPassWord(rPassWord1);

    if (!Hospital::mapUser.empty())
    {
        std::map<std::string, User>::iterator it = Hospital::mapUser.end();
        --it;
        int id = it->second.getID();
        cout << "ID: " << id;
        setID(++id);
    }
    else
    {
        setID(1);
    }
        fstream fileUser;
    fileUser.open("./../data/user.csv", std::ios::app);
    if (fileUser.is_open())
    {
        fileUser << getID() << ',' << rUserName << ',' << getPassWord() << endl;
        fileUser.close();
    }
    else
    {
        std::cerr << "Error opening file." << std::endl;
    }

    Hospital::mapUser[rUserName] = *this;
}
