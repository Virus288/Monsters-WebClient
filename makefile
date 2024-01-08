include .prod.env

buildDocker:
	docker build
	--build-arg REACT_APP_BACKEND=${REACT_APP_BACKEND}
	--build-arg REACT_APP_WS_BACKEND=${REACT_APP_WS_BACKEND}
	--build-arg REACT_APP_REDIRECT_URL=${REACT_APP_REDIRECT_URL}
	--build-arg REACT_APP_CLIENT_SECRET=${REACT_APP_CLIENT_SECRET}
	--build-arg REACT_APP_CLIENT_ID=${REACT_APP_CLIENT_ID}
	-t monsters/monsters-client .
