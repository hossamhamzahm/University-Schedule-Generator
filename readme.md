# University Schedule Generator API

### Project Idea
This project focuses on building a schedule generator that generates all possible schedules for a prescribed list of courses entered by the user (using backtracking algorithm), then storing this list in a database. The generated schedules should have no conflicts or issues within it.




### Main objectives
    - Registering and saving users.
    - Saving all courses with their different sections, tutorials and labs.
    - Saving the different possible schedules that a user could have.
    - Retrieval of the available schedules to be viewed by the user whenever needed.
    - Ability to update courses’, users’, or professors' information.


### Technologies used in this project:
    - AWS (EC2)
    - Circleci
    - Docker
    - TypeScript
    - Node 
    - Express
    - SQLite


### This project contains:
    - JWT Authentication
    - Build script
    - set_env script
    - Infrastructure description
    - CircleCi pipeline
    - Pipeline process
    - Swagger API documentation

### To be added:
    - Unit Testing
    - Linting/Prettier module


#### [Front-End Application Link](http://fwd-forntend-circleci.s3-website-us-east-1.amazonaws.com/)
#### [Backend API](http://gadwelooh-api.publicvm.com/)
#### [Swagger API Documentation](http://gadwelooh-api.publicvm.com/api-docs)



> Note: These link may stop working after AWS free tier ends for my account


<br>

> Note: No sensitive data in are hardcoded in the code, instead it is passed through the environment variables in both amazon eb and circle ci [screenshots of both are in docs directory](https://github.com/hossamhamzahm/University_Schedule_Generator/tree/main/docs)

> Note: to setup the api locally follow the setting in the  [configure local server.md](https://github.com/hossamhamzahm/University_Schedule_Generator/blob/main/docs/configure%20local%20server.md) in docs directory.

#### You can find database schemas documentation (ERD & Database Relational Model) in this [Lucid Chart link](https://lucid.app/lucidchart/238c4817-e201-4a96-a5cd-69d7dd223c0e/edit?viewport_loc=-128%2C136%2C2220%2C874%2C0_0&invitationId=inv_3bf38dd4-8c05-49e0-a5c8-3e51e1dfa39d)


#### Documentation of the infrastructure is found in the [infrastructure description.md](https://github.com/hossamhamzahm/University_Schedule_Generator/blob/main/docs/Infrastructure%20description.md) file in the docs directory



#### Documentation of all dependencies is found in the [App dependencies.md](https://github.com/hossamhamzahm/University_Schedule_Generator/blob/main/docs/App%20dependencies.md) file in the docs directory


#### A screenshot of the last build is found the [docs directory](https://github.com/hossamhamzahm/University_Schedule_Generator/tree/main/docs) in the Github repository 


#### Documentation of the pipeline is found in the [Pipeline process.md](https://github.com/hossamhamzahm/University_Schedule_Generator/blob/main/docs/Pipeline%20process.md) file in the docs directory


> Click on the status icon to view the pipeline
[![Status Badge](https://circleci.com/gh/hossamhamzahm/fwd-circleci-training.svg?style=svg)](https://app.circleci.com/pipelines/github/hossamhamzahm/University_Schedule_Generator/19/workflows/b108f94f-fdc1-4481-8fba-52e3439ce6ea/jobs/13)


#### Architecture diagram for an overview of the infrastructure and the pipeline
[![architecture diagram](https://raw.githubusercontent.com/hossamhamzahm/University_Schedule_Generator/main/docs/architecture_diagram.png)]() 