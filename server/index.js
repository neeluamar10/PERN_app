const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//create a todo list
//INSERT INTO todo (description) VALUES ($1) -- display all the inserted values from the database 

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1)", [description]);
        res.json(newTodo);
    } catch (error) {
        console.log(error);
    }
})

//get all todos

app.get('/todos', async(req, res) => {
    try {
        const AllTodos = await pool.query("SELECT * FROM todo");
        res.json(AllTodos.rows);
    } catch (error) {
        console.log(error)
    }
})

//get a single todo

app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(getTodo);
    }catch(error){
        console.log(error);
    }
})

//update a todo

app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } =req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json('Todo updated!');
    } catch (error) {
        console.log(error);
    }
})

//delete a todo

app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } =req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json('Todo deleted');
    } catch (error) {
        console.log(error)
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Hello');
})