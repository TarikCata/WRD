var dugme = document.getElementById("IzbornikDugme");
var nav = document.getElementById("nav");

dugme.onclick=()=>{
    if(nav.style.maxHeight == '66px'){
        nav.style.maxHeight = '320px';
    }
    else{
        nav.style.maxHeight = '66px';
    }
}

var okvir = document.getElementsByClassName("VilaKolonaOkvir");

for(let i=0;i<okvir.length;i++){
    okvir[i].onmouseover = hoveruj;
    okvir[i].onmouseout = iskljuci;

}

function hoveruj() {
    this.style.border = '10px solid yellow';
}

function iskljuci() {
    this.style.border = 'none';
}


$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);

var forma = $("#forma");

forma.validate({
    rules:{
        dostavaIme:{
            required:true,
            regex:/^[a-zA-Z]+$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[a-zA-Z]+$/
        },
        dostavaPostanskiBroj:{
            required:true,
            regex:/^[0-9]{5,}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^[0-9]{5,}$/
        }
        
    },
    messges:{
        dostavaIme:{
            required:"Ovo polje je obavezno",
            
        },
        dostavaAdresa:{
            required:"Ovo polje je obavezno",
            
        },
        dostavaPostanskiBroj:{
            required:"Ovo polje je obavezno",
            regex:"Minimalno 5 brojeva"
        },
        dostavaTelefon:{
            required:"Ovo polje je obavezno",
            regex:"Treba bit u formatu -> : +111-11-111-1111"
        }
    }
    
});
makeRedpve=(obj)=>{
    return `<tr>
    <td>${obj.narudzbaId}</td>
    <td>${obj.datumNarudzbe}</td>
    <td>${obj.dostavaIme}</td>
    <td>${obj.dostavaAdresa}</td>
    <td>${obj.dostavaPostanskiBroj}</td>
    <td>${obj.dostavaTelefon}</td>
    <td>${obj.napomena}</td>
    </td>`;
}
getAll=()=>{
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll')
    .then(res => res.json())
    .then(data=>{
        for (const i in data) {
            document.querySelector("#tabelaID").innerHTML+=makeRedpve(data[i]);
        }
    })
    .catch(err =>{
        console.log("err");
    })
}
getAll();

document.getElementById("dodaj").onclick=(event)=>{
    event.preventDefault();
   
    obj={
        dostavaAdresa:$("#dostavaAdresa").val(),
        dostavaIme:$("#dostavaIme").val(),
        dostavaPostanskiBroj:$("#dostavaPostanskiBroj").val(),
        dostavaTelefon:$("#dostavaTelefon").val(),
        napomena:$("#napomena").val(),
    }

    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj',{
        method:'post',
        body:JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        getAll();
    })
    .catch( err =>{
        console.log("err");
    })
}