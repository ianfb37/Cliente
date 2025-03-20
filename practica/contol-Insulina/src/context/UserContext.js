import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const validationPatterns = {
        username: /^[a-z][a-z0-9]{5,}$/, // Mínimo 6 caracteres, comienza con letra minúscula
        password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, // Mínimo 8 caracteres, al menos una mayúscula y un número
    };

    const addUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    const deleteUser = (userId) => {
        // Filtra los usuarios para eliminar el que coincide con userId
        setUsers(users.filter(user => user.idUsuario !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, deleteUser, validationPatterns }}>
            {children}
        </UserContext.Provider>
    );
};
