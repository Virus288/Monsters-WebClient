include .env

buildDocker:
	sudo docker build --build-arg REACT_APP_BACKEND=${REACT_APP_BACKEND} -t monsters/monsters-client .
