$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input.<br>"
);

var forma = $("#forma");
forma.validate({
    rules: {
        Ime: {
            required: true,
            regex: /^[A-Z][a-zA-Z ]+[A-Z][a-zA-Z]+$/
        },
        BrojIndeksa: {
            required: true,
            regex: /^[0-9]{6,}$/
        },
        Telefon: {
            required: true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        },
        messages: {
            Ime: {
                required: "Ovo polje je obavezno",
                regex: "Dvije rijeci, prva velika slova u svakoj rijeci"
            },
            BrojIndeksa: {
                required: "Ovo polje je obavezno",
                regex: "Minimalno 6 brojeva"
            },
            Telefon: {
                required: "Ovo polje je obavezno",
                regex: "Format +111-11-111-1111"
            },
        }
    }
});

var allProizvodi;

makeRedove = (data) => {
    return `<tr>
    <td>${data.proizvodID}</td>
    <td>${data.naziv}</td>
    <td>${data.cijenaPoKvadratu}</td>
    <td><img src="${data.slikaUrl}"</td>
    <td>${data.likeCounter}</td>
    <td><button onclick="lajkaj(${data.proizvodID})">LIKE</button></td>
    <td><button onclick="odaberi(${data.proizvodID})">ODABERI</button></td>
    </tr>`
}

GetProizvodiAll = () => {
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
        .then(res =>res.json()).then(data => {
                refresh();
                for (const i in data) {
                    document.querySelector("#tabelaProizvodi").innerHTML += makeRedove(data[i]);
                    allProizvodi = data;
                    console.table(allProizvodi);
                }
            })
        .catch(err => console.log(err))
}

GetProizvodiAll();
refresh = () => { $("#tabelaProizvodi").empty(); }

document.getElementById("lajkovi").onclick = () => {
    var max = allProizvodi[0].likeCounter;
    let naziv = allProizvodi[0].naziv;
    for (let i = 0; i < allProizvodi.lenght; i++) {
        if (max < allProizvodi[i].likeCounter) {
            max = allProizvodi[i].likeCounter;
            naziv = allProizvodi[i].naziv;
        }
    }
    alert("Najvise lajkova: " + naziv + max);
}


document.getElementById("budzet").onclick = () => {
    var min = allProizvodi[0].cijenaPoKvadratu;
    let naziv;
    console.log(min);
    for (let i = 0; i < allProizvodi.length; i++) {
        if (min > allProizvodi[i].cijenaPoKvadratu) {
            min = allProizvodi[i].cijenaPoKvadratu;
            naziv = allProizvodi[i].naziv;
        }
    }
    alert("Najjeftiniji proizvod:" + naziv + " " + min);
}




lajkaj = (id) => {
    let urllajkk = "http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId=" + id;
    fetch(urllajkk)
        .then(res => res.json()).then(data => {
            data.likeCounter++;
            GetProizvodiAll();
        })
        .catch(err => console.log(err))
}


odaberi = () => {
    const data = {
        Grad: $("Grad").val(),
        Adresa: $("Adresa").val(),
        Ime: $("Ime").val(),
        Telefon: $("Telefon").val(),
        proizvodID: allProizvodi.proizvodID,
        Ime: $("Ime").val(),
    }
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Nije proslo")
                return;
            }
            res.json().then(data => { })
        })
        .catch(err => alert(err + " post metoda"))
}