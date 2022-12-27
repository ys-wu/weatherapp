build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down --remove-orphans

mocha-tests:
	docker compose run --rm --no-deps --entrypoint=npm backend run test

robot-tests:
	./venv/bin/robot ./robotframework/tests.robot
