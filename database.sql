-- ===================================================
-- BASE DE DATOS: yamicomid2.o
-- Archivo: database.sql
-- ===================================================

CREATE DATABASE IF NOT EXISTS yamicomid2_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE yamicomid2_db;

-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(255),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

-- 3. Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT NOT NULL
);

-- 4. Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('Pendiente', 'Preparando', 'En Camino', 'Entregado') DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- 5. Tabla Detalle del Pedido
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- ===================================================
-- INSERCIÓN DE DATOS INICIALES
-- ===================================================

INSERT INTO categorias (id_categoria, nombre) VALUES
(1, 'hamburguesas'),
(2, 'pizzas'),
(3, 'bebidas'),
(4, 'postres');

INSERT INTO productos (id_categoria, nombre, descripcion, precio, imagen_url) VALUES
(1, 'Yami Burger Suprema', 'Doble carne, doble cheddar, tocino crujiente y salsa especial.', 8.50, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'),
(1, 'Chicken Crunch', 'Pechuga empanizada, lechuga fresca, pepinillos y mayonesa de ajo.', 7.20, 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500'),
(2, 'Pizza Pepperoni Blast', 'Salsa de tomate, queso mozzarella abundante y pepperoni.', 11.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500'),
(2, 'Pizza Cuatro Quesos', 'Mozzarella, gorgonzola, parmesano y gouda.', 12.50, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'),
(3, 'Batido Oreo Supreme', 'Helado de mantecado, galletas Oreo y crema chantilly.', 4.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500'),
(3, 'Limonada Menta y Jengibre', 'Limonada natural batida con menta fresca y jengibre.', 2.80, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'),
(4, 'Choco Lava Cake', 'Pastel de chocolate con centro derretido y helado de vainilla.', 5.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500');