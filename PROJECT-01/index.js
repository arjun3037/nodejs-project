const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app =  express();
const port = 8000;
// middleware
app.use(express.urlencoded({extended:false}))


app.use((req,res,next) => {
    console.log('HEllo from middleware 1');
    return res.json('Hello from middleware');
})

app.get('/api/users' , (req,res) => {
    return res.json(users);
})

app.get('/users/' , (req,res) => {
    const html =  `<ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}</ul>`;
    return  res.send(html);
});


app.get('/users/:id' , (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    const html = 
        `<table><tr>
            <th>${user.id}</th>
            <th>${user.first_name}</th>
            <th>${user.last_name}</th>
            <th>${user.email}</th>
            <th>${user.gender}</th>
            <th>${user.job_title}</th>
         </tr></table>`;

    return res.send(html);

});

app.post("/api/users" , (req,res) => {
    const body = req.body;
    users.push({...body , id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err,data) => {
        return res.json({status:'Success' , id: users.length});
    });
      
});

app.route('/api/users/:id')
    .get((req,res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req,res) => {
        return res.json({status:'Pendingg'});
    })
    .delete((req,res) => {
        return res.json({status:'Pendingg'});
    })


app.listen(port , () => console.log("server started !!"));