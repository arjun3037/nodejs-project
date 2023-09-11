const express = require('express');
const users = require('./MOCK_DATA.json');

const app =  express();

const port = 8000;

app.get('/api/users' , (req,res) => {
    return res.json(users);
})

app.get('/users/' , (req,res) => {
    const html =  `<ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}</ul>`;
    return  res.send(html);
});

app.get('/api/users/:id' , (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
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


app.listen(port , () => console.log("server started !!"));