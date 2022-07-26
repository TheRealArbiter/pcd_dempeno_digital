/**
 * Reunión y exportación de todas las rutas disponibles
 */
import express from 'express';
import bienesController from './bienes.routes'

const routes = express.Router();

routes.post('/actualiza/bienes/', bienesController.getBienes);
// routes.patch('/v1/actualiza/bienes/', bienesController.getBienes);|

export = routes;