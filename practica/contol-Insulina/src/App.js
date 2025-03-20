import React, { useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import UserList from './components/UserList'; // Asegúrate de importar UserList
import Statistics from './components/Statistics';

const App = () => {
    const month = 3; // Cambia este valor según necesites
    const year = 2025; // Cambia este valor según necesites

    return (
        <UserProvider>
            <h1>Control de Insulina</h1>
            <UserForm />
            <UserContext.Consumer>
                {({ users, deleteUser, addUser }) => (
                    <>
                        <UserTable users={users} deleteUser={deleteUser} />
                        <UserList /> {/* Aquí se muestra la lista de usuarios */}
                    </>
                )}
            </UserContext.Consumer>
            <Statistics month={month} year={year} /> {/* Asegúrate de que Statistics acepte month y year */}
        </UserProvider>
    );
};

export default App;
