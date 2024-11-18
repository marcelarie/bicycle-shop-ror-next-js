.PHONY: run be_run fe_run c rebuild-db

install:
	@echo "Installing backend dependencies..." && \
	cd backend && bundle install && \
	echo "Installing frontend dependencies..." && \
	cd ../frontend && pnpm install

# Default target
run:
	@echo "Running Rails backend on localhost:3000" && \
	cd backend && rails server & \
	echo "Running Next.js frontend on localhost:4000" && \
	cd frontend && pnpm dev --port 4000 & \
	wait

be_run:
	@echo "Starting Rails backend..."
	@cd backend && rails server

fe_run:
	@echo "Starting Next.js frontend..."
	@cd frontend && pnpm dev --port 4000

c:
	@cd backend && rails c

rebuild-db:
	@cd backend && rails db:drop db:create db:migrate db:seed

