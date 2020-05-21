#!groovy

import jenkins.model.JenkinsLocationConfiguration

def url = System.getenv("JENKINS_URL") ?: "http://localhost:8080"

def jenkinsLocationConfiguration = JenkinsLocationConfiguration.get()
jenkinsLocationConfiguration.setUrl(url)
jenkinsLocationConfiguration.save()