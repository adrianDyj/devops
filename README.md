# devops
docker run --name=myredis --network=mymulticont --rm redis:alpine \n
docker run -v "C:/Studia/devops/postgresdata":/var/lib/postgres/data --rm --name=mypostgres --network=mymulticont -e POSTGRES_PASSWORD=1qaz2wsx postgres:alpine \n
docker run --rm --network=mymulticont --name=mybackend -p 8090:8090 adriandyjecinski/mybackend \n
