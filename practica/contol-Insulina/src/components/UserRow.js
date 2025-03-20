import React, { useState } from 'react';

const UserRow = ({ user, deleteUser, updateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        updateUser(editedUser); // Llama a la función para actualizar el usuario
        setIsEditing(false); // Cierra el formulario de edición
    };

    return (
        <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="surname"
                        value={editedUser.surname}
                        onChange={handleChange}
                    />
                ) : (
                    user.surname
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        name="birthDate"
                        value={editedUser.birthDate}
                        onChange={handleChange}
                    />
                ) : (
                    user.birthDate
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Modificar</button>
                        <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default UserRow;
