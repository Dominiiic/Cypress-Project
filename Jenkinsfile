pipeline {
    agent any

    tools { nodejs "nodejs23" }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage("Install Dependencies") {
            steps {
                bat 'npm install'
            }
        }
        stage("Install Cypress") {
            steps {
                bat 'npx cypress install'
            }
        }
        stage("Run Cypress Tests") {
            steps {
                bat 'npm run cy:cloud'
            }
        }
    }
}
