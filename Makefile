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

# Build without TypeScript compilation
.PHONY: gen
gen: 
	@echo "Generating index, adding analytics, and creating sitemap."
	node $(HELPERS_DIR)/gen.js

# Build without TypeScript compilation
.PHONY: build
build: gen

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
	@echo "  watch                  - TypeScript watch mode"
	@echo "  dev                    - Development mode (build with TypeScript + watch)"
	@echo "  help                   - Show this help message" 