const express = require("express");
const app = express();
let port = 3000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.listen(port, (req, res) => { console.log("port started with port number:", port) });
const path = require("path");
app.set("view engine ", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: uuidv4(),
        username: "KismatSapkota",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "ParSapkota",
        content: "I love traveling"
    },
    {
        id: uuidv4(),
        username: "PrabinSapkota",
        content: "I love playing football"
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts")

})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })

})
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id)
    post.content = newcontent;
    res.redirect("/posts")

})
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id)
    res.render("edit.ejs", { post })

})
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts= posts.filter((p) => id !== p.id);
    res.redirect("/posts"); 
}) 