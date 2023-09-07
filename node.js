// const fs= require('fs');
// const http=require('http');
// const requests=require('requests');

// const htmlFile= fs.readFileSync('./home.html','utf-8');


// const replaceval=(tempval,orgval)=>
// {
//     let temperature=tempval.replace('{%tempval%}',orgval.main.temp);
//     temperature=tempval.replace('{%tempmin%}',orgval.main.temp_min);
//     temperature=tempval.replace('{%temp,max%}',orgval.main.temp_max);
//     temperature=tempval.replace('{%city%}',orgval.city);
// }

// const Server=http.createServer((req,res)=>
// {

//    if(req.url=='/')

//    {
//    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=7fc71e8647d5edc2bb75990293b7fab8")
//        .on('data','utf-8',(chunkdata)=>
//        {
//            const objdata=JSON.parse(chunkdata);
//            const arrdata=[objdata]; // array of an object
          
//            console.log(arrdata);
//            const realtimedata=arrdata.map((val)=>
//            {
//                replaceval(htmlFile,val);
//            }).join('');
//            res.write(realtimedata);

//        })

//        .on('error',(err)=>
//        {
//            res.write('error occured !!');
//        })

//        .on('end',()=>
//        {
//            res.end();
//        })
//    }

// })


// Server.listen(8010,'127.0.0.1',()=>
// {
//     console.log('listening to the 8010 port number');
// });

const fs = require('fs');
const http = require('http');
const requests = require('requests');

const htmlFile = fs.readFileSync('./home.html', 'utf-8');

const replaceval = (tempval, orgval) => {

      let temperature = tempval.replace('{%tempval%}', orgval.main.temp);
  temperature = temperature.replace('{%tempmin%}', orgval.main.temp_min);
  temperature = temperature.replace('{%tempmax%}', orgval.main.temp_max); // Corrected variable name
  temperature = temperature.replace('{%city%}', orgval.name); // Use 'name' for city
  return temperature; // Return the updated HTML content
};

const Server = http.createServer((req, res) => {
  if (req.url == '/') {
    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=YOUR_API_KEY") // Replace with your API key
      .on('data', (chunkdata) => {
        const objdata = JSON.parse(chunkdata);
        const updatedHtml = replaceval(htmlFile, objdata);
        res.write(updatedHtml);
      })
      .on('error', (err) => {
        console.error(err);
        res.write('Error occurred !!');
        res.end();
      })
      .on('end', () => {
        res.end();
      });
  }
});

Server.listen(8010, '127.0.0.1', () => {
  console.log('Listening on port 8010');
});
