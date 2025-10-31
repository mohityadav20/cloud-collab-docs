.PHONY: help install setup amplify-init amplify-push amplify-delete dev build test test-coverage clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

setup: ## Run full setup (install + Amplify init + push)
	npm install
	@echo "⚠️  You need to run Amplify commands interactively:"
	@echo "   amplify init"
	@echo "   amplify add auth"
	@echo "   amplify add api"
	@echo "   amplify add storage"
	@echo "   amplify add function"
	@echo "   amplify push"

amplify-init: ## Initialize Amplify project
	amplify init

amplify-push: ## Push Amplify resources to AWS
	amplify push

amplify-status: ## Check Amplify resource status
	amplify status

amplify-pull: ## Pull Amplify resources from AWS
	amplify pull

amplify-delete: ## Delete Amplify resources from AWS
	amplify delete

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

test: ## Run tests
	npm run test

test-coverage: ## Run tests with coverage
	npm run test:coverage

clean: ## Clean build artifacts
	rm -rf dist node_modules/.vite

