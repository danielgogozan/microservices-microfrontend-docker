# microservices-microfrontend-docker

Recipes manager app that uses NestJS microservices, Webpack Module Federation microfrontend architecture and Docker to deploy the solution.

Please check the _Recipes_manager_documentation.docx_ file for more.

# C4 Diagrams

![C4-Diagram](https://i.imgur.com/NHWRFMw.png)


# Service Oriented Architecture patterns

-	Decompose by business capability

Microservices were separated based on business capabilities to facilitate high cohesion and low coupling. For e.g., recipe microservice is responsible for handling only recipe related operations.

-	Single service per host

Each microservice is running independently on its own host to protect from dependency versions and facilitate decoupling. For e.g., Auth microservice is running on port 3000 while User microservice is running on port 3010.

-	Access token

Auth microservice is used to provide authentication and authorization. App delivers functionalities using secured REST and using messaging pattern, each request is first filtered by Auth microservice to detect whether permissions to access the resource should be granted.


-	Messaging

Microservices are communicating via message exchanges over channels. For e.g., Auth microservice requests User microservice to validate credentials.

-	Event-driven

Microservices are also communicating via events stream. For e.g., Recipe microservice emits a specific event each time a new recipe has been saved and User microservices listens and properly responds to the event. 

# App
![Login-Screen](https://i.imgur.com/VtsyWIK.png)
![Recipes-Screen](https://i.imgur.com/dDMCgD6.png)
