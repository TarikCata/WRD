$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

var forma = $("#forma");
forma.validate({
    rules:{
        Ime:{
            required:true,
            regex: /^[A-Z][a-zA-Z ]+[A-Z][a-zA-Z]+$/
        },
        BrojIndeksa:{
            required:true,
            regex: /^[0-9]{6,}$/
        },
        Telefon:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        },
        messages:{
            Ime:{
                required:"Ovo polje je obavezno",
            },
            BrojIndeksa:{
                required:"Ovo polje je obavezno",
            },
            Telefon:{
                required:"Ovo polje je obavezno",
            },
        }
    }
});

//1.
var sviPodaci;
makeRedove=(data)=>{
    return `<tr>
    <td>${data.proizvodID}</td>
    <td>${data.naziv}</td>
    <td>${data.cijenaPoKvadratu}</td>
    <td><img src ="${data.slikaUrl}"></img></td>
    <td>${data.likeCounter}</td>
    <td><button id="lajk" onlclick="lajkovi(${data.proizvodID})">LIKE</button></td>
    <td><button id="naruci" onlclick="naruci()">Naruci</button></td>
    </tr>`
}
GetProizvoidAll=()=>{
    let url = "http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";
    fetch(url)
    .then(res =>{
        if (res.status !== 200) {
            console.log("Greska");
        }
        res.json().then(data=>{
            refresh();
            for (const i in data) {
                document.querySelector("#tabelaProizvodi").innerHTML+=makeRedove(data[i]);
                sviPodaci = data;
            }   
        })
    })
    .catch(err=>{
        alert(err);
    })
}
GetProizvoidAll();
//2.
document.getElementById("lajkovi").onclick=()=>{
    var najveci = 100000;
    let naziv;
    for(let i=0;i<sviPodaci.length;i++){
        if (najveci<sviPodaci[i].likeCounter) {
            najveci=sviPodaci[i].likeCounter;
            naziv = sviPodaci[i].naziv;
        }
    }
    alert("Najvise lajkova:" + naziv + " "  + najveci);
}
//3.
document.getElementById("budzet").onclick=()=>{
    var min = sviPodaci[0].cijenaPoKvadratu;
    let naziv;
    for (let i=0;i<sviPodaci.length;i++) {
        if (min>sviPodaci[i].cijenaPoKvadratu) {
            min = sviPodaci[i].cijenaPoKvadratu;
            naziv = sviPodaci[i].naziv;
        }
    }
    alert("Najjeftiniji proizvod:" + naziv + " " + min);
}
refresh=()=>{
    $("#tabelaProizvodi").empty();
}
//4
lajkovi=(id)=>{
    let urlLajkovi = "http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like" + id;
    fetch(urlLajkovi)
    .then(res => res.json())
    .then(data=>{
        data.likeCounter++;
        GetProizvoidAll();
    })
    
}


//5 
//fetch('https://example.com/profile', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
naruci=()=>{
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify()
    })
    
}