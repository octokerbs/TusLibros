# Stage 1: Build the application
FROM golang:1.23-alpine AS builder

# Set environment variables for Go
ENV GO111MODULE=on \
        CGO_ENABLED=0 \
        GOOS=linux \
        GOARCH=amd64

# Set working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files first (to leverage caching)
COPY go.mod go.sum ./

# Download Go module dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application binary
RUN go build -o /app/build/tus-libros ./cmd/tus-libros

# Stage 2: Create a lightweight runtime image
FROM alpine:latest

# Install necessary dependencies (optional, e.g., ca-certificates for HTTPS)
RUN apk --no-cache add ca-certificates

# Set working directory inside the runtime image
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/build/tus-libros ./tus-libros

# Expose the port your application will run on (if any, adjust as needed)
EXPOSE 8080

# Command to run the application
CMD ["./tus-libros"]
