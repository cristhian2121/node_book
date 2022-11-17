#!/usr/bin/env node


const fs = require("fs")
const server = require("fastify")()

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

server.get("/recipes/:id", async (req, reply) => {
    const id = Number(req.params.id)
    
    if (!id) {
        reply.statusCode = 404;
        return { error: "not found"}
    }

    return {
        processId: process.pid,
        steps: "something",
        ingredients: [
            {id: 1, name: "Chicken", quantity: "1 lb"},
            {id: 2, name: "Sauce", quantity: "2 lb"}
        ]
    }

})

server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})
