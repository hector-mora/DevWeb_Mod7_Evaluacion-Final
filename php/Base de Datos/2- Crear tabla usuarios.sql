
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `contrasena` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Truncar tablas antes de insertar `usuarios`
--

TRUNCATE TABLE `usuarios`;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `nombre`, `contrasena`, `fecha_nacimiento`) VALUES
('hmora@mail.com', 'Hector Mora Mora', '$2y$10$.QUrdyOEPP5vnXVF9QGJV.MUiwCqZ53hbOkfqrEZjn8vgO4FFdjkq', '1986-08-02'),
('lmora@mail.com', 'Leiber Mora Campos', '$2y$10$HshPLdoJQwtDSbPPuxgobek4oH7LgNvlfL14yJcj/yxoEFpDvAXce', '1956-05-24'),
('xmora@mail.com', 'Xinia Mora Hidalgo', '$2y$10$ejsfx5oUlNnYdCDK2mZXi.hlTRHXT4eeiTKIWotSP6J81/zDC7Yoq', '1960-11-28');
