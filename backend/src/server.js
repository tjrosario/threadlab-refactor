var cluster, clusterLogStream, environment, express, fs, i, numCPUs;

express = require("express");

environment = process.env.NODE_ENV;

if (environment === 'production') {
  cluster = require('cluster');
  numCPUs = require('os').cpus().length;
  fs = require('fs');
  clusterLogStream = fs.createWriteStream("./logs/cluster.log", {
    flags: "a"
  });
  clusterLogStream.write("Running cluster with " + numCPUs + " CPUs \n");
  clusterLogStream.end('');
  if (cluster.isMaster) {
    i = 0;
    while (i < numCPUs) {
      cluster.fork();
      i++;
    }
    cluster.on("exit", function(worker, code, signal) {
      var exitString;
      cluster.fork();
      exitString = "Worker " + worker.id + " died. \n";
      clusterLogStream.write(exitString);
      return clusterLogStream.end('');
    });
  } else {
    require('./app');
  }
} else {
  require('./app');
}