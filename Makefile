up:
	@docker-compose up
down:
	@docker-compose down --volumes --remove-orphans
start:
	@docker-compose up -d redis && docker-compose run app yarn start
build:
	@docker-compose run app yarn build
install:
	@docker-compose run app yarn install --frozen-lockfile
lint-fix:
	@docker-compose run app yarn lint-fix