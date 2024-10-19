pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                bat "npm run cy:cloud"
            }
        }
    }
}
