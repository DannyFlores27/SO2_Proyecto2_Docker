FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instala dependencias
RUN npm install

# Luego copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que corre tu app (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]

