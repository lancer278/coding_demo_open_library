const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const request = require('request');
const requestp = require('request-promise-native');

let lastSearchResults = []

app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req,res,next){
    const origin = req.get('origin');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
    next()
})

app.get('/api/booklist',function(req, res, next){
    try{
        request.get('https://openlibrary.org/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
            .pipe(res)
    }catch(err){
        console.error(err)
    }
})

app.get('/api/search/title/:title',function(req, res, next){
    try{
        var output = {}
        let options = {
            url: 'http://openlibrary.org/search.json?title='+req.params.title,
            json: true
        }

        const types = ['isbn', 'olid', 'lccn', 'oclc']
        let bibs = ''
        lastSearchResults=[]
        counter = 0

        requestp.get(options)
            .then(function(response){
                response.docs.forEach(function(b){
                    types.forEach(function(type){
                        if(b[type]){
                            b[type].forEach(function(i){ 
                                let newid = type.toUpperCase()+":"+i+',' 
                                lastSearchResults.push(newid)
                                if(counter<5){
                                    bibs=bibs+newid
                                    counter++
                                }
                            })
                        }
                    })
                })
            })
            .then(function(){
                let url = 'https://openlibrary.org/api/books?bibkeys='+bibs+'&jscmd=data&format=json' 
                let options = {
                    url: url,
                    json: true
                }
                requestp.get(options)
                  .then(function(data){
                    res.send(data)
                  })
            })
            .catch(e => {console.error(e)})

    }catch(err){
        console.error(err)
        }

})

app.get('/api/search/next/:start/:limit?',function(req, res, next){

    if(Object.keys(lastSearchResults).length > 0){
        let output = {}
        let str = ''
        lastSearchResults.forEach(function(d,e){
            if( ( e >= ( req.params.start * 1 ) ) && e < ( ( req.params.start * 1 ) + ( ( req.params.limit * 1 ) || 5 ) ) ){
                str=str+d
            }
        })
        let url = 'https://openlibrary.org/api/books?bibkeys='+str+'&jscmd=data&format=json' 
        console.log(url)
        let options = {
            url: url,
            json: true
        }
        requestp.get(options)
            .then(function(data){
                res.send(data)
            })
    }
    else{
        res.send({})
    }
})    



app.get('/api/search/olid/:olid',function(req, res, next){
    try{

        request.get('https://openlibrary.org/api/books?bibkeys=OLID:'+req.params.olid+'&jscmd=data&format=json')
            .pipe(res)


    }catch(err){
        console.error(err)
        }

})


app.get('/*', function(req, res){
    res.status(404).send("Page not found")
})

app.listen(process.env.PORT || 8080);
