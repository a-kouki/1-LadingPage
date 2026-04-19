async function testeLimit(){
    for(let i=0 ; i < 30; i++){
        const res = await fetch("http://localhost:3000/");
        console.log(i, res.status)
    }
}

testeLimit()
