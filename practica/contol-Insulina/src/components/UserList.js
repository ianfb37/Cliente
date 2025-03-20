import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import { UserContext } from '../context/UserContext'; // Asegúrate de importar el contexto

const API_URL = "http://localhost/practica"; // Asegúrate de que la URL sea correcta

const UserList = () => {
    const { deleteUser } = useContext(UserContext); // Obtener la función deleteUser del contexto
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/getusers.php`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Función para modificar un usuario
    const modificarUsuario = (username, nuevosDatos) => {
        axios.put(`http://localhost/practica/modi.php`, {
            username,
            nombre: nuevosDatos.nombre,
            apellido: nuevosDatos.apellido,
            fechaNac: nuevosDatos.fechaNac,
            password: nuevosDatos.password || undefined // No se envía si está vacío
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.data.success) {
                alert("Usuario actualizado correctamente");
                window.location.href = "http://localhost/practica/modi.php"; // Redirigir a modi.php
            } else {
                alert("Error al actualizar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al actualizar usuario:", error);
            alert("No se pudo actualizar el usuario.");
        });
    };
    
    const handleModify = (user) => {
        const nuevosDatos = {
            nombre: prompt("Nuevo nombre:", user.nombre),
            apellido: prompt("Nuevo apellido:", user.apellido),
            fechaNac: prompt("Nueva fecha de nacimiento (YYYY-MM-DD):", user.fechaNac),
            password: prompt("Nueva contraseña (déjalo vacío si no quieres cambiarlo):")
        };
        modificarUsuario(user.username, nuevosDatos);
    };
    
    const handleShowStats = (user) => {
        setSelectedUser(user);
        setShowStats(true);
    };
    
    const handleDelete = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/delete_user.php?id=${userId}`);
            const result = response.data;
    
            if (result.success) {
                // Actualiza la lista de usuarios después de eliminar
                setUsers(users.filter(user => user.idUsuario !== userId));
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };
    

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {users.length === 0 ? (
                <p>No hay usuarios disponibles.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.idUsuario}>
                            {user.username}
                            <button onClick={() => handleModify(user)}>Modificar</button>
                            <button onClick={() => handleShowStats(user)}>Ver Estadísticas</button>
                            <button onClick={() => handleDelete(user.idUsuario)}>Eliminar</button> {/* Botón de eliminar */}
                        </li>
                    ))}
                </ul>
            )}

            {showStats && selectedUser && (
                <div>
                    <h3>Estadísticas de {selectedUser.username}</h3>
                    <Statistics month={new Date().getMonth() + 1} year={new Date().getFullYear()} />
                </div>
            )}
        </div>
    );
};

export default UserList;


