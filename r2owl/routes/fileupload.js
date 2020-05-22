var express = require('express');
var router = express.Router();
const formidable = require('formidable')
var fs = require('fs');
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/viewGraph', function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="viewGraph" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="file"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
})

router.post('/viewGraph', async (req, res, next) => {
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.files.path;
        var fileName = files.files.name;
    
        var newpath = path.join(__dirname, "/../../src/app/data/", fileName);
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
        if (err) console.log(err)
        res.write('File uploaded and moved!');
        res.end();
        });

        res.writeHead(200,
            {Location: 'http://192.168.33.11:8000/#' + fileName.substr(0, fileName.lastIndexOf("."))}
        );
    
    // })
    }); 
}); 

module.exports = router;
