# TusLibros

This is an online shopping system designed for the fictional publisher **TusLibros**. It originated as an assignment for the **Software Engineering I** course, initially implemented in Smalltalk with Test-Driven Development.


https://github.com/user-attachments/assets/815dd157-3df2-4af1-b347-974d7e11fa65


## Table of Contents

1. [Technologies](#technologies)
2. [Sources](#sources)
3. [Structure](#structure)
4. [Dependencies](#dependencies)
5. [Run Locally](#run-locally)
6. [Requirements](#requirements)

## Technologies

- **Dockerized**: Both the backend and frontend are containerized for easy setup and deployment.
- **Frontend**: Built with Next.js, using Material UI for components and TypeScript for type safety and scalability.
- **Backend**: Developed with Go, applying TDD to ensure robust functionality.
- **Design Patterns**: Incorporates patterns like the System Facade to simplify complex interactions and improve maintainability.
- **Use Cases**: Four distinct customer types are implemented to demonstrate different usage scenarios effectively.

## Sources

- Course: [Ingeniería de Software I, Facultad de Ciencias Exactas y Naturales, Universidad de Buenos Aires](https://www.isw2.com.ar/)
- Professor: [Hernán Wilkinson](https://x.com/HernanWilkinson)

## Structure

![Arquitectura](assets/Architecture.png)

## Dependencies

1. **Docker**
2. **Docker-Compose** (comes bundled with Docker Desktop)

## Run locally

**1. Clone the Repository**

```bash
git clone https://github.com/KerbsOD/TusLibros.git
cd TusLibros
```

**2. Build the Containers**

```bash
docker-compose build
```

**3. Start the Containers**

```bash
docker-compose up
```

**4. Access the application**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

**5. Exit the application**

To stop the containers, press ctrl+c or run:

```bash
docker-compose down
```

## Requirements

![Enunciado1](assets/Enunciado1.jpg)
![Enunciado2](assets/Enunciado2.jpg)
