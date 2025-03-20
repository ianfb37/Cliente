import React, { useState } from 'react';
import DeleteUser from './DeleteUser'; // Asegúrate de importar el componente

const UserTable = ({ users, updateUser }) => {
    const [editingUser, setEditingUser] = useState(null);

    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(editingUser);
        setEditingUser(null);
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)}>Modificar</button>
                                <DeleteUser userId={user.id} /> {/* Aquí se utiliza el componente DeleteUser */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <form onSubmit={handleSubmit}>
                    <h2>Modificar Usuario</h2>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={editingUser.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="surname"
                            value={editingUser.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={editingUser.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default UserTable;

