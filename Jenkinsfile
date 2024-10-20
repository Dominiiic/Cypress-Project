pipeline {
    agent any

    tools { nodejs "nodejs23" }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage("Building"){
            steps{
                echo "Building the application"
            }
        }
        stage("Testing") {
            steps {
                ansiColor('xterm') {
                    bat 'npm install'
                    bat 'npx cypress install'
                    bat 'npm run cy:cloud'
                }
            }
        }
        stage("Deploying"){
            steps{
                echo "Deploying the application"
            }
        }
    }
}
