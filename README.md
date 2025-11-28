# 🚀 SyncUp-Frontend | Interfaz de Usuario para Streaming Musical (Angular)

 Finalizado (Proyecto Académico - 2025) con opcion de escalabilidad 

**Módulo Cliente (SPA)** desarrollado en **Angular**. El objetivo fue construir una interfaz fluida, segura y reactiva que tradujera la complejidad de los **algoritmos de recomendación** en una experiencia de usuario intuitiva.

---

## 🎯 Enfoque y Logros Clave (FRONTEND)

Mi contribución se centró en la usabilidad y la seguridad del lado del cliente, permitiendo el despliegue de las funciones complejas del Backend:

**Experiencia de Usuario (UX):** Implementación del **flujo de Onboarding** para nuevos usuarios, resolviendo el problema del "Arranque en Frío" (Cold Start) al alimentar los grafos de recomendación desde el primer acceso.
* **Seguridad Cliente-Servidor:** Implementación de **Auth Interceptors** en Angular para inyectar automáticamente el **Token JWT** en todas las peticiones salientes.
**Protección de Rutas:** Desarrollo de **`AuthGuards`** (`auth.guard.ts` y `admin-auth.guard.ts`) para proteger rutas privadas y restringir el acceso del Administrador, decodificando el rol desde el token.
**Reproducción Continua:** Uso del patrón **Singleton** (`player.service.ts`) para mantener la canción reproduciéndose sin interrupción al navegar entre diferentes rutas de la aplicación.

## 🛠️ Stack Tecnológico

### Frontend & Interfaz
- **Framework:** **Angular** 
- **Lenguaje:** **TypeScript** 
- **Arquitectura:** SPA (Single Page Application)

### Backend (Módulo Integrado)
- **Framework:** **Spring Boot 3.5.6**.
- **Lenguaje:** **Java 21**.
- **Datos Clave:** Implementación de **Grafos** y **Árboles Trie** para búsquedas instantáneas y **algoritmos de recomendación** (Dijkstra y BFS).

---

## ✨ Módulos de Interfaz Desarrollados (Contribución Específica)

**Registro por Pasos (`registro-wizard.ts`):** Orquestación del proceso de registro guiado para mejorar la experiencia de usuario.
**Búsqueda en Tiempo Real:** Interfaz reactiva (`search.ts`) que consume el servicio del **Trie** para el **autocompletado instantáneo** de canciones.
**Gestión de Perfil:** Desarrollo de la interfaz para la interacción social (**Seguir/Dejar de seguir**), validando la relación actual con el **Grafo Social** del Backend.

## ⚙️ Instrucciones para Ejecutar (Setup)

*(Mantén las instrucciones de ejecución del `ng serve` que ya tenías, ya que son cruciales para un Dev Server)*

1.  Asegúrate de tener **Node.js** y **Angular CLI** instalados.
2.  Clonar el repositorio.
3.  Instalar dependencias: `npm install`
4.  Ejecutar el servidor localmente: `ng serve`

---

## 🔗 Colaboración y Repositorios Relacionados

* **Autores/Colaboradores:** @MAngel4311, @DanielCifuentes1997
* **Informe Técnico Completo:** Documentación técnica disponible a solicitud.
