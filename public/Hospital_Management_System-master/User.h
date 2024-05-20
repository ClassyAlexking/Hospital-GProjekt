#ifndef USER_H
#define USER_H
#include "string"
// #pragma once

class User
{
public:
    User();
    ~User();

    std::string getUserName();
    void setUserName(std::string);

    void setPassWord(std::string);
    std::string getPassWord();
    void setID(int);
    int getID();

    void addUser();

private:                                                                            
    std::string userName;
    std::string passWord;   
    int id;
};  
    
#endif