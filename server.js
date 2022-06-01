const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.use(express.static('js'));
app.use(express.static('styles'));



app.listen(port, () => console.log(`App listening on port ${port}!`))