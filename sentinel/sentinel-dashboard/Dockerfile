FROM openjdk:8u102-jre
WORKDIR /
ADD ./sentinel-dashboard-1.8.0.jar  /
CMD ["/usr/bin/java","-Dserver.port=8080","-Dcsp.sentinel.dashboard.server=0.0.0.0:8080","-Dproject.name=sentinel-dashboard","-jar","/sentinel-dashboard-1.8.0.jar"]
EXPOSE 8080