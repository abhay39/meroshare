import express from 'express';
import fetch from 'node-fetch';
import https from 'https'
import cors from 'cors';
import { parseString} from 'xml2js'

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
    
  
    // Disable SSL certificate verification
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
  
    try {
      let result = await fetch("https://webbackend.cdsc.com.np/api/meroShare/capital/", {
        agent: agent,
        timeout: 10000,
      });
      result = await result.json();
    //   console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
});
app.post('/login', async (req, res) => {
    
//   console.log(req.body)
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
  
    try {
        let response = await fetch("https://webbackend.cdsc.com.np/api/meroShare/auth/", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body),
        agent: agent,
        timeout: 10000,
      });
        let contentType = response.headers.get("content-type");
        let token = response.headers.get("Authorization");
        let contentType2 = response.headers.get("Set-Cookie");

        let i=contentType2.split(';')
        console.log(i)
       
    
        if (contentType && contentType.includes("application/json")) {
          let data = await response.json();

          res.json({
            data: data,
            token: token,
            cookie:i[0]
          })
          console.log(contentType2)
        } else if (contentType && contentType.includes("application/xml")) {
          let xmlData = await response.text();
          parseString(xmlData, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("From",result);
          });
        } else {
          console.error("Unsupported content type:", contentType);
        }
      } catch (error) {
        console.error(error);
      }
});

app.post("/ownDetails",async(req,res)=>{
  // console.log(req.body)
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    try {
      let result = await fetch("https://webbackend.cdsc.com.np/api/meroShare/ownDetail/", {
        method:"GET",
        agent: agent,
        timeout: 10000,
        headers:{
          "Authorization":req.body.token,
          // "Cookie":`${req.body.Cookie}`
        }
      });
      result = await result.json();
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
})

app.listen(5000, () => {
  console.log('Example app listening at http://localhost:5000');
});