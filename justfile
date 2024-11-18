# Just command runner installation:
# https://github.com/casey/just?tab=readme-ov-file#installation

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

