const fetch = require('node-fetch');


function fetchData(url){

    return fetch(url)
    .then((response)=>{
        return response.json()
        .then((results)=>{ 
            return results 
        })
    })
    .catch((err)=>{
        console.log('Error Ocurred : ' + err);
    })
    
};

function main(){

    let getJsonUserData = fetchData('http://localhost:3000/api/v.1/data/latest');


    getJsonUserData.then((result)=>{
        console.log(result)
    })
}

setInterval(function() { 
    main()
}, 1200000);

