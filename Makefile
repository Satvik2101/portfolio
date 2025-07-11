# Portfolio Build Makefile

# Variables
TS_CONFIG = ./tsconfig.json
WEB_DIR = ./web
HELPERS_DIR = ./helpers

# Default target
.PHONY: all
all: build-full

# TypeScript compilation
.PHONY: typescript
typescript:
	@echo "Compiling TypeScript..."
	tsc --project $(TS_CONFIG)


# Update sitemap timestamp
.PHONY: update-sitemap-timestamp
update-sitemap-timestamp:
	@echo "Updating sitemap timestamp..."
	@isodate=$$(date -Is) && \
	echo $$isodate && \
	sed -i "s/<lastmod>.*<\/lastmod>/<lastmod>$$isodate<\/lastmod>/g" $(WEB_DIR)/sitemap.xml

# Build without TypeScript compilation
.PHONY: gen
gen: 
	@echo "Generating index, adding analytics, and creating sitemap."
	node $(HELPERS_DIR)/gen.js

# Build without TypeScript compilation
.PHONY: build
build: gen update-sitemap-timestamp

# Build with TypeScript compilation
.PHONY: build-full
build-full: typescript build

# Watch mode using TypeScript's built-in watch
.PHONY: watch
watch:
	@echo "Starting TypeScript watch mode..."
	tsc --project $(TS_CONFIG) --watch --onSuccess "make build"

# Development mode (build with TypeScript and watch)
.PHONY: dev
dev: build-full
	@echo "Starting development mode..."
	@while true; do \
		make build-full; \
		sleep 2; \
	done

# Sync to AWS (equivalent to sync.sh)
.PHONY: sync
sync:
	@echo "Syncing to AWS..."
	@if [ -f sync.sh ]; then \
		bash sync.sh; \
	else \
		echo "sync.sh not found"; \
	fi

manifest: 
	node helpers/manifest.js

deploy: manifest 
	node helpers/upload.js
# Help target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all                    - Build everything with TypeScript (default)"
	@echo "  build                  - Build without TypeScript compilation"
	@echo "  build-full             - Build with TypeScript compilation"
	@echo "  typescript             - Compile TypeScript only"
	@echo "  index                  - Generate index only"
	@echo "  analytics              - Add analytics only"
	@echo "  sitemap                - Generate sitemap only"
	@echo "  update-sitemap-timestamp - Update sitemap timestamp only"
	@echo "  watch                  - TypeScript watch mode"
	@echo "  dev                    - Development mode (build with TypeScript + watch)"
	@echo "  sync                   - Sync to AWS"
	@echo "  help                   - Show this help message" 