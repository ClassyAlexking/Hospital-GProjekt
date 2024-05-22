import { User, Doctor } from './class.js';

export let currentUser = null;

export function updateUser(user) {
    currentUser = new User(
        user.email,
        user.password,
        user.username,
        user.phoneNumber,
        user.sex,
        user.birthdate,
        user.role,
        user.historyVer
    );
}

export function updateDoc(user) {
    currentUser = new Doctor(
        user.email,
        user.password,
        user.username,
        user.phoneNumber,
        user.sex,
        user.birthdate,
        user.role,
        user.historyVer,
        user.specialty,
        user.yearOfExp
    );
}