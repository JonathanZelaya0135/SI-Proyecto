# RawSource - Sistema de Gestión de Materias Primas

## Usuarios de prueba

### ADMIN
Email: `john@mail.com`  
Password: `123456`

### PROVIDER
Email: `diana@mail.com`  
Password: `123456`

### BUYER
Email: `pedro@mail.com`  
Password: `123456`

## Descripción del Proyecto

RawSource es una aplicación web desarrollada en React que proporciona un sistema completo de gestión de materias primas. La aplicación está diseñada para facilitar la interacción entre compradores y proveedores, permitiendo una gestión eficiente del inventario y pedidos.

## Características Principales

### Gestión de Usuarios
- **Administradores**: Control total del sistema, gestión de usuarios y productos
- **Compradores**: Visualización de inventario y gestión de pedidos
- **Proveedores**: Gestión de pedidos y productos

### Gestión de Productos
- Catálogo completo de materias primas
- Sistema de inventario en tiempo real
- Gestión de productos por parte de administradores

### Sistema de Pedidos
- Creación y seguimiento de pedidos
- Gestión de estados de pedidos
- Historial de transacciones

### Autenticación y Autorización
- Sistema de login seguro con JWT
- Control de acceso basado en roles
- Gestión de sesiones

### Tecnologías Utilizadas

- **Frontend**: React 19.1.0
- **Routing**: React Router DOM 7.6.2
- **HTTP Client**: Axios 1.10.0
- **Autenticación**: JWT Decode 4.0.0
- **Testing**: React Testing Library
- **Build Tool**: Create React App

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/PNC-012025/pnc-proyecto-final-frontend-grupo-08-s01.git
   cd rawsource
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - La aplicación está configurada para conectarse a la API 
   - El proxy está configurado en `package.json`

4. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`

## Uso de la Aplicación

### Inicio de Sesión
1. Accede a la aplicación en `/login`
2. Ingresa tus credenciales
3. El sistema te redirigirá automáticamente según tu rol

### Panel de Administrador
- **Gestión de Usuarios** (`/admin/users`): Crear, editar y eliminar usuarios
- **Gestión de Productos** (`/admin/products`): Administrar el catálogo de productos
- **Dashboard** (`/admin`): Vista general del sistema

### Panel de Comprador
- **Inventario** (`/buyer/inventory`): Ver productos disponibles
- **Pedidos** (`/buyer/orders`): Gestionar pedidos realizados
- **Dashboard** (`/buyer`): Resumen de actividades

### Panel de Proveedor
- **Pedidos** (`/provider/orders`): Ver y gestionar pedidos recibidos
- **Dashboard** (`/provider`): Resumen de actividades

### Perfil de Usuario
- **Perfil** (`/profile`): Ver y editar información personal
