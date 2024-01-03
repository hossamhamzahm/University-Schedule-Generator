## Pipeline Process Documentation:

#### Documentation of the pipeline:
    - Circleci is triggered once a new commit is pushed to Github and starts the pipeline process
    - Spin up the environment and setup environment variables
    - Install node, NPM
    - Install Server Dependencies
    - Run Builds
    - Deploy backend:
        - Deploy backend to ec2 using ssh
        - run deploy.sh
    - Set All backend environment variables
