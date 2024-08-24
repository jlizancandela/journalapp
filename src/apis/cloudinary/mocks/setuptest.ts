import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./server";

// Configura el servidor para que se inicie antes de todas las pruebas
beforeAll(() => server.listen());

// Restablece cualquier manipulador de solicitud que hayamos agregado después de cada prueba
afterEach(() => server.resetHandlers());

// Detén el servidor después de que todas las pruebas hayan terminado
afterAll(() => server.close());
