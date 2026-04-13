.PHONY: build run clean

build:
	go build -o server cmd/server/main.go
	cp ../coders/codexion ./codexion

run: build
	./server

clean:
	rm -f server codexion
