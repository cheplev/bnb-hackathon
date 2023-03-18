.PHONY: test
test:
	npx hardhat test

.PHONY: node
node:
	npx hardhat node

.PHONY: deps
deps:
	npm init --yes
	npm install --safe-dev hardhat
