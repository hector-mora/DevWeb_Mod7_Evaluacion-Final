
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `hora_inicio` varchar(8) COLLATE latin1_spanish_ci DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_fin` varchar(8) COLLATE latin1_spanish_ci DEFAULT NULL,
  `dia_completo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
