# rename docker image

docker tag postgres:latest localhost-postgres:latest
docker tag <old_name> <new_name>

# remove the old docker image

docker rmi postgres:latest

# rename docker container

docker rename my-postgres localhost-postgres
docker rename <old_name> <new_name>
