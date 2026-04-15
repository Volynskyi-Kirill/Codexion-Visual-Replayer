.PHONY: local local-run

local: local-run

local-run:
	$(MAKE) -C coders
	cp coders/codexion server/codexion
	( cd server && go run cmd/server/main.go ) &
	( cd visual-replayer && npm run dev )
