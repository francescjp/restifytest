pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/francescjp/restifytest.git'
		    }        
        }
        stage('Build') {
            steps {
        		nodejs('node8_11_3') {
         		   sh 'npm install' 
        		}
            }
        }
    }
}

