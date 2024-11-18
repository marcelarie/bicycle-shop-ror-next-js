# Just command runner installation:
# https://github.com/casey/just?tab=readme-ov-file#installation

install: 
    echo "Installing dependencies..."
    just be_install
    just fe_install

be_install:
    echo "Installing backend dependencies..."
    cd backend && bundle install

fe_install:
    echo "Installing frontend dependencies..."
    cd frontend && pnpm install

run:
    echo "Running Rails backend on localhost:3000"
    just be_run &
    echo "Running Next.js frontend on localhost:4000"
    just fe_run &
    wait

be_run:
    echo "Starting Rails backend..."
    cd backend && rails server

fe_run:
    echo "Starting Next.js frontend..."
    cd frontend && pnpm dev --port 4000

c:
    cd backend && rails c

rebuild-db:
    cd backend && rails db:drop db:create db:migrate db:seed

