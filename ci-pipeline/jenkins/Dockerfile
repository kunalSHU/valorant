# Image based off https://stackoverflow.com/questions/47208009/create-docker-image-with-latest-jenkins
FROM jenkins/jenkins:lts

USER root

# Skip setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

COPY scripts/*.groovy /usr/share/jenkins/ref/init.groovy.d/

# # Install plugins
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
