var express = require("express");
var app = express();

app.listen(port, () => {
    console.log("Server running on port ", port);
})

app.post('/viewGraph', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
            status: false,
            message: 'No file uploaded'
            });
        } else {
            let file = req.graphfile;

            file.mv('./app/data/' + file.name);

            res.send({
                statue: true,
                message: 'File is uploaded',
                data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
                }
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}); 
