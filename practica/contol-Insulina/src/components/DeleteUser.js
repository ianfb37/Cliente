import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const DeleteUser = ({ userId }) => {
    const { deleteUser } = useContext(UserContext);

    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            deleteUser(userId);
            // Aquí podrías agregar la lógica para eliminar el usuario de la base de datos si es necesario
            console.log(`Usuario con ID ${userId} eliminado.`);
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Eliminar
        </button>
    );
};

export default DeleteUser;
