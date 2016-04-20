BROWSERIFY_PATH=./node_modules/.bin/browserify
UGLIFYJS_PATH=./node_modules/.bin/uglifyjs

install:
	@npm install

build: install
	@$(BROWSERIFY_PATH) random.js -s chineseRandomName > random.min.js && \
		$(UGLIFYJS_PATH) random.min.js -o random.min.js --reserved "module,exports,chineseRandomName" \
		--source-map random.min.map -c -m sort

clean-build:
	@rm -f random.min.js

clean: clean-build
	@rm -rf node_modules

test:
	@node test/index.js

.PHONY: test
