.PHONY: analyze
.PHONY: run
.PHONY: assets

analyze:
	NODE_ENV=production ./node_modules/.bin/webpack -p --PRODUCTION --json | webpack-bundle-size-analyzer

run:
	PORT=8080 NODE_ENV=production node server/server.js

assets:
	NODE_ENV=production ./node_modules/.bin/webpack -p --PRODUCTION --watch
