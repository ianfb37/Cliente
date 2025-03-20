-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2025 a las 17:10:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controldiabetes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidas`
--

CREATE TABLE `comidas` (
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `glucosa1` int(11) DEFAULT NULL,
  `glucosa2` int(11) DEFAULT NULL,
  `racion` int(11) DEFAULT NULL,
  `insulina` int(11) DEFAULT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `controlglucosa`
--

CREATE TABLE `controlglucosa` (
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `lenta` tinyint(1) DEFAULT NULL,
  `deporte` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `controlglucosa`
--

INSERT INTO `controlglucosa` (`idUsuario`, `fecha`, `lenta`, `deporte`) VALUES
(4, '2025-03-19', 20, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hiper`
--

CREATE TABLE `hiper` (
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena') NOT NULL,
  `hora` time DEFAULT NULL,
  `glucosa` int(11) DEFAULT NULL,
  `correccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hipo`
--

CREATE TABLE `hipo` (
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena') NOT NULL,
  `hora` time DEFAULT NULL,
  `glucosa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(15) DEFAULT NULL,
  `apellido` varchar(15) DEFAULT NULL,
  `fechaNac` date DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `fechaNac`, `username`, `password`) VALUES
(4, 'valverde', 'jimenez', '2005-12-12', 'fedeico', '$2y$10$7EfqsRjZpF8o/lqHCLdnnOzYpQl.BG.ef7MQJus6N2oN02JzzcI.G'),
(5, 'as', 'as', '2004-07-17', 'alejandro', '$2y$10$HDEqWbmOKW0IMq62ouOncuDQmLykQIhEMiirQ4VcLsuK0EeUj.zcu'),
(6, 'jdddddddddd', 'jdddddddddddddd', '2003-12-17', 'nuclear', '$2y$10$SOGRXeJCxNw2Spb/2xx18.p/rw3cdvmh.7R/SXVmg8QQo2aBvm8XC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `controlglucosa`
--
ALTER TABLE `controlglucosa`
  ADD PRIMARY KEY (`idUsuario`,`fecha`);

--
-- Indices de la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD CONSTRAINT `comidas_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`) REFERENCES `controlglucosa` (`idUsuario`, `fecha`);

--
-- Filtros para la tabla `controlglucosa`
--
ALTER TABLE `controlglucosa`
  ADD CONSTRAINT `controlglucosa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD CONSTRAINT `hiper_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`,`tipoComida`) REFERENCES `comidas` (`idUsuario`, `fecha`, `tipoComida`);

--
-- Filtros para la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD CONSTRAINT `hipo_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`,`tipoComida`) REFERENCES `comidas` (`idUsuario`, `fecha`, `tipoComida`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
