const express = require("express");

const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");

const http = require('http');

const routes = (app) => {
  const router = express.Router();

  router.get("/cat", (req, res) => {
    http.get("http://go-backend:3030/api", (resp) => {
      let data = '';
      resp.on('data', (chunk) => data += chunk);
      resp.on('end', () =>
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, data)
      );
      resp.on("error", (err) =>
        serverResponses.sendError(res, messages.BAD_REQUEST, err.message)
      )
    })
  })

  router.post("/todos", (req, res) => {


    const todo = new Todo({
      text: req.body.text,
    });

    http.get("http://go-backend:3030/api", (resp) => {
      let data = '';
      resp.on('data', (chunk) => data += chunk);
      resp.on('end', () => {
        todo.image = data;
        todo
          .save()
          .then((result) => {
            serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
          })
          .catch((e) => {
            serverResponses.sendError(res, messages.BAD_REQUEST, e);
          })
      }
      );
      resp.on("error", (err) =>
        todo
          .save()
          .then((result) => {
            serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
          })
          .catch((e) => {
            serverResponses.sendError(res, messages.BAD_REQUEST, e);
          })
      )
    })

  });

  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api/be", router);
};
module.exports = routes;
