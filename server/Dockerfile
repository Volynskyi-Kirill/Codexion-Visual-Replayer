# Stage 1: Build C binary and Go server
FROM golang:alpine AS builder

# Install C build tools
RUN apk add --no-cache build-base

WORKDIR /app

# First, build the C binary from the coders directory
# Note: This assumes the build context is the project root
COPY coders/ ./coders/
RUN cd coders && make re

# Then, build the Go server
COPY server/ ./server/
WORKDIR /app/server
RUN go mod download
RUN go build -o /app/server-bin cmd/server/main.go

# Stage 2: Final minimal image
FROM alpine:3.20

WORKDIR /app

# Install necessary libraries if any (C binary might need libc)
RUN apk add --no-cache libc6-compat

# Copy the built C binary
COPY --from=builder /app/coders/codexion ./codexion

# Copy the Go server
COPY --from=builder /app/server-bin ./server

# Expose port
EXPOSE 3000

# Run the server
CMD ["./server"]
