#include <iostream>
#include "Hospital.h"
using namespace std;
int main()
{
    Hospital lms;
    // lms.updateUsers();
    // lms.updateStaffInformation();
    // lms.updateAdmin();
    bool end_program = false;

    while (!end_program)
    {
        cout << "\nWELCOM TO HOSPITAL SYSTEM \n"
             << "[1]: Login" << endl
             << "[2]: register new account:" << endl
             //<< "[3]: Logout" << endl
             << "[4]: Exit" << endl
             << "[5]: Show all off staff" << endl;
        int control;
        cout << "Enter your option: ";
        cin >> control;
        switch (control)
        {
        case 1:
            lms.login();
            break;
        case 2:
            lms.registerAccount();
            break;
        case 3:
            break;
        case 4:
            end_program = true;
            break;
        case 5:
            lms.displayStaffs();
        default:
            break;
        }
    }

    return 0;
}