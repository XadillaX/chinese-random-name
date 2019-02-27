BROWSERIFY_PATH=./node_modules/.bin/browserify
UGLIFYJS_PATH=./node_modules/.bin/uglifyjs

install:
	@npm install

build: install
	@$(BROWSERIFY_PATH) random.js -s chineseRandomName > random.min.js && \
		node --stack_size=10000 $(UGLIFYJS_PATH) random.min.js -o random.min.js --reserved "module,exports,chineseRandomName" \
		-c -m --source-map

clean-build:
	@rm -f random.min.js

clean: clean-build
	@rm -rf node_modules

test:
	@node test/test.js

.PHONY: test
