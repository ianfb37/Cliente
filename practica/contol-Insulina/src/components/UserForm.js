import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserForm = () => {
    const { addUser, validationPatterns } = useContext(UserContext);
    const [user, setUser] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        birthDate: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const validateUsername = (username) => {
        return validationPatterns.username.test(username);
    };

    const validatePassword = (password) => {
        return validationPatterns.password.test(password);
    };

    const validateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        return age > 18 || (age === 18 && monthDiff >= 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar error

        console.log('User state before validation:', user); // Para depuración

        // Validaciones
        if (!validateUsername(user.username)) {
            setError('El nombre de usuario debe tener al menos 6 caracteres, comenzar por una letra y no contener caracteres especiales.');
            return;
        }

        if (!validatePassword(user.password)) {
            setError('La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula y un número.');
            return;
        }

        if (!validateAge(user.birthDate)) {
            setError('Debes ser mayor de edad (18 años o más).');
            return;
        }

        try {
            // Enviar el usuario al servidor PHP
            const response = await axios.post('http://localhost/practica/api.php', user);
            addUser(response.data); // Agregar usuario al contexto
            setUser({ username: '', password: '', name: '', surname: '', birthDate: '' }); // Reiniciar formulario
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
            <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="surname" placeholder="Apellidos" onChange={handleChange} required />
            <input type="date" name="birthDate" onChange={handleChange} required />
            <button type="submit">Agregar Usuario</button>
        </form>
    );
};

export default UserForm;
