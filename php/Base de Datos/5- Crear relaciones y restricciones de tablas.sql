
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `evento_usuario`
--
ALTER TABLE `evento_usuario`
  ADD PRIMARY KEY (`fk_eventos`,`fk_usuarios`),
  ADD KEY `fk_usuarios` (`fk_usuarios`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evento_usuario`
--
ALTER TABLE `evento_usuario`
  ADD CONSTRAINT `evento_usuario_ibfk_1` FOREIGN KEY (`fk_usuarios`) REFERENCES `usuarios` (`usuario`),
  ADD CONSTRAINT `evento_usuario_ibfk_2` FOREIGN KEY (`fk_eventos`) REFERENCES `eventos` (`id`);
