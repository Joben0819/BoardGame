var express  = require('express');
var app = express();

var PORT = 3002;
var cors = require('cors')
const fs = require( "fs");
const crypt = require("crypto");
const url0 = "https://hangzhouchang.oss-cn-hangzhou.aliyuncs.com/error"
const url1 = "https://bceguang.gz.bcebos.com/error"
const url2 = "https://cloudt.oss-cn-quanzhou.kz.cc/error"
const url3 = "http://alb-f4r15f877eejshperb.ap-northeast-1.alb.aliyuncs.com/801/error"
const url4 = "https://dbutdt.s3.ap-northeast-1.amazonaws.com/error"
let axios = require("axios")

app.use(express.json())
require('dotenv').config()
app.use(cors())

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/urls0", (req, res) => {
  axios.get( url0)
  .then(response => {
    const vert = response.data
    function test2(vert){
      let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
      let binary = Buffer.from(vert, "base64");
      let d = crypt.privateDecrypt({key: privateKey,
      padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
      return d
    }
    try{
      if(test2(vert)){
        var value = test2(vert)
        var num = 0
      }
      
    }
    catch(err){
      if (err){
        var value = 'null'
        var num = 1
      } 
    }    
    res.json({ value , num  })
  })
});

app.get("/urls1", (req, res) => {
  axios.get( url1)
  .then(response => {
    const vert = response.data
    function test2(vert){
      let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
      let binary = Buffer.from(vert, "base64");
      let d = crypt.privateDecrypt({key: privateKey,
      padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
      return d
    }
    try{
      if(test2(vert)){
        var value = test2(vert)
        var num = 0
      }
      
    }
    catch(err){
      if (err){
        var value = 'null'
        var num = 1
      } 
      
    }    
    res.json({value , num})
  })
});

app.get("/urls2", (req, res) => {
  axios.get( url2)
  .then(response => {
    const vert = response.data
    function test2(vert){
      let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
      let binary = Buffer.from(vert, "base64");
      let d = crypt.privateDecrypt({key: privateKey,
      padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
      return d
    }
    try{
      if (test2(vert)){
        var value =  test2(vert)
        var num = 0
      }
 
    }
    catch(err){
      if (err){
        var value = 'null'
        var num = 1
      } 
    }    
    res.json({value , num})
  })
});

app.get("/urls3", (req, res) => {
  axios.get( url3)
  .then(response => {
    const vert = response.data
    var value = null
    function test2(vert){
      let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
      let binary = Buffer.from(vert, "base64");
      let d = crypt.privateDecrypt({key: privateKey,
      padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
      return d
    }
    try{
      if(test2(vert)){
        var value = test2(vert)
        var num = 0
      }
    }
    catch(err){
      if (err){
         value = 'null'
         var num = 1
      } 
    }    
    res.send({ value: value , num})
  })
});
  
app.get("/urls4", (req, res) => {
  axios.get( url4)
  .then(response => {
    const vert = response.data
    function test2(vert){
      let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
      let binary = Buffer.from(vert, "base64");
      let d = crypt.privateDecrypt({key: privateKey,
      padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
      return d
    }
    try{
      if(test2(vert)){
        var value = test2(vert)
        var num = 0
      }
      
    }
    catch(err){
      if (err){
        var value = 'null'
        var num = 1
      } 
    }    
    res.json({value , num})
  })
});

// const dtas = 'http://8.210.114.222:43005/live-ns/lotteryActivity/userHistory?page_num = 1?page_size = 10'
// var data2 = {
//   'token' : '80ea6b6650cf41d6a90ddd4b68283fc0HmGbP',
// 'Content-Type' : 'application/json'
// }
// app.get("/url4", cors(), async (req, res) => {
//   axios.post(dtas,data)
//   .then(respond => {
//     console(respond.data)
//   })
    
// });
// app.get("/url2",cors(), async (req, res) => {
//     res.json(data2)
// })
// app.get('/url100', (req, res) => {
//   const zero = 'LVb/7A3veTkEV9jSXi1GCxU1z8BFOvsLYYibPfqxxKIlRMAb64bFZ/Yx5a4+eLl4fTEkNsmBZdlzkVu8uPY3dNcfTSaMiMYcuLRr3VC44Q9R/HYJpM1Id54LYlWahAlpyIIOIa26k6FuuN7kSKmpzV1sGOKZb4SW3hdhVuZZkqWoNTFCUOBbLQTP0RpNBW1i/nb+jYrrV+uVwQUZkCWYZ3mJkcVRkXOvYyhefyy0USOtgvQnZGLM6Gyr5zL7XtzefyZyhtf0IzxtsUBe4/dkNXo2mMn/pjJ56yb6sviat7TO80HAMri1WmLbx1DiDGjSxS9u4brB4jZbwITTD+faY60reDivXmqNRfHgF7eFZNMUeTZn4UZoeR1JxUO5MHZjQeY130s/4SbNOYIWGuBzxI+sMDATqvjKrmua9uz17UzDboOhVmD5w9QhQ2EAWApZafLOJSj4RSxWU3aKWpRJAMYp1JqdrWzH+8khZEv9OsaLHRr3QvyyO/Fto7xd4U90rHy5gHomKPROT9FXKtiHgLbDZVJrbdoRMbjNJFJ+SukbL5D5meJLvqZb+j/PD4Pa0BdWINWJHN3Wyr0SjKvhNyr7k6qiXaPEG3kBmfUL5/da4OlmhokaDACTP0b9EOtMDXe4UI1RYJwjPJ8JYADeCJdZMOMwMG2nDWyLFUtTXvVnCn3PVqrrUozPpg5cEyuPuFwIelVbmB1uzGgE74oZ8lpnQGQmPhy1rgJ7AIIOEBv+vMQ84Fq9bEqeHboX9/t56hDjqLL061bWFuupNc8iN/H6xj0RH0wYoc5LwNS6oiLmoA2FI+NSzCw7eHfIUs9nw2nIEUKcv3LSo9SosOROhBETbFz4oarQ5mf6JktUB/m5vdit+dJUd8j5PNhW2VR3vVkWbgdhODdOPtJEjf1eWj/C70Sn1SkOmTatSe+X52+RcH+jFXAfiMUwBpUmxowlSq7hYc545w1c1qluxdIndovhaWprDc7j4Wngx363N0DMFPSYh1FvrPK9oOPdfpap85XvEBXA6F7fEXnMORi8GUjTUj401t/hIPYR6iG9GPiMHbPTOpbFzbhkAxBNy1K3ISQ+pfTn1g0mec3j1BXerImDPE1t6RsDwhphx2ug/xvv3tVqAzfxNyrcI+BGyl2yIQUHJutB7EHcvKHGzgfqEzjJWbU/CLM6IokWSo/Tqb8S3BMNzVlsgvw/+kG20pIXXjxWE8yTa70QNeNSQ+SB/6MeN7P7J1eeYI448g8/8J6M/hbyC+2q6rZKC3YrxIqLhZ3izQ7l40GDnyOO2ESz7poE5PsZZ+0SQonuvAPw/wfxqWkbFgRyes9+8rQPSvsiZ/VOyMWvhTgDGozDCDsWvw=='
//   const one = 'AYwx+ssBvn4nDGA0wox6ObwsS15j4og1BCGJgSXPvlFq1nwPTi2rvErTGKfwnzGKV+STfgi/ebVcywkpj5woNOJVhKdZGI8M7nnxGpX5Chat4EzU3Q+x4Qmgjlkqkho+O5OpXnrtuMB293/PQJdGMoqLtlq1xkVPx04Au4k3wf5gft/Lk4KW/CEdRE44wmuW4m5LOc3Bl9UoM32egnbRj+zX2tybPNQGgx747V+AlyTgNQTLff0WTdeEURX4ETSbLyaG8qgymVhEnDCFggUvuiq+c53MMX6jjdLfvMrau9NfRDsA/js9HO0K2+N7aUIbbhV9De6ziMSrEFI6KCweSI+k5mUWjPmqn1qp9Wg+QO3KDCeyPHm36EQbRg1KMV5bjj+bI5LTAQb4wQhSkRCBkVL3aWVpTXSUXiO89+z22xnR0rfwEZPjknX3Yajw9O8q+sNfrCZn6UH3Hi2gUw1XPD1NLKr5sJeEZiiN1ZHd6xhjuMjMnSSX0fAhOa9afV6CQAFqXMjZLK8LD4CjXfMStpURgReYwIh496LXICpdldp20Rup53XmvG7Vla5qBDDMwJ0xe0ptmfbOCEulSlUMU9PC19pLOEhAfueLR6uIZvreazDQMIEcGOM/Xh2hgWVN7RzlT/BMpmuTNyu725JHL4Yx0YCr9mTVT66kFeZdfwRM/VpanQpWfrS1XYRcv5FwhJ45n17n1OHPgR5M/66dkuWr1rt5ciobqWOdcsIsqPlAxkff9MIpKafL/9f0VFabOQDFdFattnFDv/57tQB1EVUJ/8PrNlAys5L/qyHXViClzvxuGXulg5qsGOaXZQDb/paLz/EwkawxLz3gqW4XZSzXIRUuvRYGfvZkJcw/beZYmmK+j5F339JO5pTi8k2SHloadVIRRduK2kP685ycPQYRM349/cADJR3GsbxNiTOg8OB3UJZPbFn8o5bh4/7eQulh0gfjM/Axdu2vTuMY5nCBwETrxSRCvr3OCgSAzpTqRXDU6VHjZGbl/lN1qWv1qpSR/tfZwVcytb/Fdm20MVYF/lgn30LtDJDvxnE4OVjw5+V7xBQKOQRfwu9IqRCOFEFWTPXSTK4ow2JpzQfSIfeH2eN1ssOaejM6znn7Qeb8J0bbl+xN741u7Z10YmG09IbEI4kKHjK8/VoIG/IcjwdfUQG/jNdJqow26TpqFB41xW90W5TiGeiqLgKXgorLKDKtHp0KhXgii4r4jfIlGrpNfcY6N3AUHpkG8KX7bggULCEfORcaBOFgKiPhW27Mh/F9XmKqLqy2IQrZtodCf8LD44QjAHnjkhnYzMKy7cmfII6tMscnaDB/H8WFfYbG00CDO7CM8p0cIzIgIjId6w=='
//   const two =  'gH4bUJ0Dt4kNY7pF0lzj9wpm4MvBq/2tqPrCspMb51y7lae1pRwiiPaxs3aRnjh7dzg8yTh6dWjsEdBgPuRK2U51NkQuUJQaz+ZSLmImGmD4opndcF64B7lyESMMUTc97hId21QpQIhxnpx3LVMq7ZLkLSH/bDRkB07O0zI2fml8X53LJrCPte1iS2swN7r56YYXo9r0G95cNc13lkLMNm/LewTt5QzQ0TewU9u0gjFSWXF6IK8gX8EJC4YaP6ASjlM2SwROPYJ9zM7guq/EIzT8y6sGRXT8jlaQT+XuoJl/gQYWnN0dF38PvEWy6U1vbeO5C/c0DLb7In2b8Imbq5MxnZZaWjE7nc9oLvVeqqGaPgKLfb+FTrhwD2Vbpr1nOIxaVqSHgZ30gl7nH4/D5tdGVd2L/gTXnmtlthT7HTsVpRO48xvKSsV5gHrdKdhw3IQcSqj8LfVV1zDsGFgzb+YmAePfwvw0Ij1qfPZG8aTEu04Tl8Slft8I+fjeIWGsMOVucGBEPGRbSVGo4Xi0M10DCKCpSyWG/5bJHdz16HYbbCYYm1OYBPzUQDbVFTlh2PEEI+1+gdXXqgLvWwq2jr6dt+ripAXcp9M0ZdC5fgL5K2NreDEWEWmYXqa860IhOhWfvAwSqcq3bskKYJPdf6Fm3V4LjE51MjKb81pUF5E='
//   const three = 'gH4bUJ0Dt4kNY7pF0lzj9wpm4MvBq/2tqPrCspMb51y7lae1pRwiiPaxs3aRnjh7dzg8yTh6dWjsEdBgPuRK2U51NkQuUJQaz+ZSLmImGmD4opndcF64B7lyESMMUTc97hId21QpQIhxnpx3LVMq7ZLkLSH/bDRkB07O0zI2fml8X53LJrCPte1iS2swN7r56YYXo9r0G95cNc13lkLMNm/LewTt5QzQ0TewU9u0gjFSWXF6IK8gX8EJC4YaP6ASjlM2SwROPYJ9zM7guq/EIzT8y6sGRXT8jlaQT+XuoJl/gQYWnN0dF38PvEWy6U1vbeO5C/c0DLb7In2b8Imbq5MxnZZaWjE7nc9oLvVeqqGaPgKLfb+FTrhwD2Vbpr1nOIxaVqSHgZ30gl7nH4/D5tdGVd2L/gTXnmtlthT7HTsVpRO48xvKSsV5gHrdKdhw3IQcSqj8LfVV1zDsGFgzb+YmAePfwvw0Ij1qfPZG8aTEu04Tl8Slft8I+fjeIWGsMOVucGBEPGRbSVGo4Xi0M10DCKCpSyWG/5bJHdz16HYbbCYYm1OYBPzUQDbVFTlh2PEEI+1+gdXXqgLvWwq2jr6dt+ripAXcp9M0ZdC5fgL5K2NreDEWEWmYXqa860IhOhWfvAwSqcq3bskKYJPdf6Fm3V4LjE51MjKb81pUF5E='
//   const four = 'gH4bUJ0Dt4kNY7pF0lzj9wpm4MvBq/2tqPrCspMb51y7lae1pRwiiPaxs3aRnjh7dzg8yTh6dWjsEdBgPuRK2U51NkQuUJQaz+ZSLmImGmD4opndcF64B7lyESMMUTc97hId21QpQIhxnpx3LVMq7ZLkLSH/bDRkB07O0zI2fml8X53LJrCPte1iS2swN7r56YYXo9r0G95cNc13lkLMNm/LewTt5QzQ0TewU9u0gjFSWXF6IK8gX8EJC4YaP6ASjlM2SwROPYJ9zM7guq/EIzT8y6sGRXT8jlaQT+XuoJl/gQYWnN0dF38PvEWy6U1vbeO5C/c0DLb7In2b8Imbq5MxnZZaWjE7nc9oLvVeqqGaPgKLfb+FTrhwD2Vbpr1nOIxaVqSHgZ30gl7nH4/D5tdGVd2L/gTXnmtlthT7HTsVpRO48xvKSsV5gHrdKdhw3IQcSqj8LfVV1zDsGFgzb+YmAePfwvw0Ij1qfPZG8aTEu04Tl8Slft8I+fjeIWGsMOVucGBEPGRbSVGo4Xi0M10DCKCpSyWG/5bJHdz16HYbbCYYm1OYBPzUQDbVFTlh2PEEI+1+gdXXqgLvWwq2jr6dt+ripAXcp9M0ZdC5fgL5K2NreDEWEWmYXqa860IhOhWfvAwSqcq3bskKYJPdf6Fm3V4LjE51MjKb81pUF5E='

//   function test2(zero){
//     let privateKey = crypt.createPrivateKey(fs.readFileSync("Key1.key"));
//     let binary = Buffer.from(zero, "base64");
//     // let binary1 = Buffer.from(one, "base64");
//     // let binary2 = Buffer.from(two, "base64");
//     // let binary3 = Buffer.from(three, "base64");
//     // let binary4 = Buffer.from(four, "base64");
//     let a = crypt.privateDecrypt({key: privateKey,
//     padding: crypt.constants.RSA_PKCS1_PADDING}, binary).toString();
//     // let b = crypt.privateDecrypt({key: privateKey,
//     // padding: crypt.constants.RSA_PKCS1_PADDING}, binary1).toString();
//     // let c = crypt.privateDecrypt({key: privateKey,
//     // padding: crypt.constants.RSA_PKCS1_PADDING}, binary2).toString();
//     // let d = crypt.privateDecrypt({key: privateKey,
//     // padding: crypt.constants.RSA_PKCS1_PADDING}, binary3).toString();
//     // let e = crypt.privateDecrypt({key: privateKey,
//     // padding: crypt.constants.RSA_PKCS1_PADDING}, binary4).toString();

//     return a 
//   }
//   res.json({test: test2(zero)})
// })

app.listen(PORT, () => {
    console.log(`Connect Server ${PORT}`)
})
