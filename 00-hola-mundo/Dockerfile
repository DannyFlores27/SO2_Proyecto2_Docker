# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV=development


WORKDIR /usr/src/app

# Copia los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json package-lock.json ./

# Instala todas las dependencias, incluyendo las de desarrollo (como vite)
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Cambia los permisos para evitar errores de acceso
RUN chown -R node:node /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 5173

# Inicia el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]

