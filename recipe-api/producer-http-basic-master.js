#!/usr/bin/env node

const cluster = require("cluster")
console.log(`master pid=${process.pid}`);

cluster.setupMaster({
    exec: __dirname+"/producer-http-basic.js"
})

// fork() is called every time that a worker needs to be created, this code produces two workers
cluster.fork()
cluster.fork()

// Events emit
cluster
    .on("disconnect", worker => {
        console.log("disconnect", worker.id);
    })
    .on("exit", (worker, code, signal) => {
        // avoid that the process to be created again
        console.log({worker, code, signal});
        // cluster.fork()
    })
    .on("listening", (worker, {address, port}) => {
        console.log(`Listening`, worker.id, `${address}:${port}`);
    })
    .on("message", () => {
        console.log("**");
    })