var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000 ));

app.post('/getRecord', function(req, res) {

  MongoClient.connect(dbUrl, function(dbErr, gbhDb) {
      if (dbErr) {
          console.log("DB cortladı :( ");
      } else {
        var collection = gbhDb.collection('records');
          if (req.body.key != undefined) {
            collection.find({"key": req.body.key}).toArray(function(arrErr, arrRes) {
                if (arrErr) {
                  console.error("Error in key search" + arrErr);
                  res.send("Error : " + arrErr);
                } else if (arrRes != 0) {
                  arrRes.push("Beyler hoşgeldiniz. Adım Nedim, mekanın sahibiyim.","https://youtu.be/d6ml7ch5vqk?t=11s");
                  console.log(arrRes);
                  res.status(200).send(arrRes);
                } else {
                  arrRes.push("Data not found")
                  res.status(404).send(arrRes);
                  console.error("Key value not found");
                }
            });
          } else if (req.body.value != undefined) {
            collection.find({"value": req.body.value}).toArray(function(arrErr, arrRes) {
                if (arrErr) {
                  console.error("Error in value search" + arrErr);
                  res.send("Error : " + arrErr);
                } else if (arrRes) {
                  arrRes.push("O kadar sıcak değil mi? bu adam sabah uyandığında beyazdı ","https://youtu.be/mLO4ljDTXcw?t=8s");
                  console.log(arrRes);
                  res.status(200).send(arrRes);
                } else {
                  arrRes.push("Data not found")
                  res.status(404).send(arrRes);
                  console.error("Value not found");
                }
            });
          } else if (req.body.createdAt != undefined) {
            collection.find({"createdAt": new Date(req.body.createdAt)}).toArray(function(arrErr, arrRes) {
                if (arrErr) {
                  console.error("Error in createdAt search" + arrErr);
                  res.send("Error : " + arrErr);
                } else if (arrRes) {
                  arrRes.push("Şimdi İstanbul hapı yuttu", "https://youtu.be/wR9zmjJSD1I?t=7s")
                  console.log(arrRes);
                  res.status(200).send(arrRes);
                } else {
                  arrRes.push("Data not found")
                  res.status(404).send(arrRes);
                  console.error("createdAt value not found");
                }
            });
          } else if (req.body._id !=undefined) {
            var o_id = new mongodb.ObjectId(req.body._id);
            collection.find({"_id": o_id}).toArray(function(arrErr, arrRes) {
                if (arrErr) {
                  console.error("Error in _id search" + arrErr);
                  res.send("Error : " + arrErr);
                } else if (arrRes) {
                  "Beyler iyi akşamlar, insan mıyız? ","https://youtu.be/u2WgXirRIV0?t=1m11s"
                  console.log(arrRes);
                  res.status(200).send(arrRes);
                } else {
                  arrRes.push("Data not found")
                  res.status(404).send(arrRes);
                  console.error("_id value not found");
                }
            });
          } else {
            arrRes.push("Bad value");
            res.status(400).send(arrRes);
          }
      }
  });

});
app.listen(app.get('port'), function() {
  console.log('Listen', app.get('port'));
});
