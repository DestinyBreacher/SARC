const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 5000;


app.engine('handlebars',exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res) => res.render('index', {mytodo}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let mytodo = [];
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
app.post('/',(req,res)=>{
    const task = {
        task: req.body.task
    };
    if(!task.task){
        res.sendStatus(403).json({msg:'Please include task'})
    }
    mytodo.push(task);
    res.redirect('/');
})
app.delete('/delete/:index',(req,res)=>{
    const found = mytodo.some(task => mytodo.indexOf(task) === parseInt(req.params.index))

    if(found){
        res.json({
            msg: 'task deleted',
            mytodo: mytodo.filter(task => mytodo.indexOf(task) !== parseInt(req.params.index))})
    }
    else{
        res.sendStatus(400).json({msg: 'Task not found' })
    }
})

