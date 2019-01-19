
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_usuario`
--

CREATE TABLE `evento_usuario` (
  `fk_eventos` int(11) NOT NULL,
  `fk_usuarios` varchar(200) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
