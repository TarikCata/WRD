//validacija

// $.validator.addMethod(
//     "regex",
//     function (value, element, regexp) {
//         var check = false;
//         return this.optional(element) || regexp.test(value);
//     },
//     "<br>Please check your input.<br>"
// );
// $("#forma").validate(
//     {
//         rules: {
//             dostavaIme: {
//                 required: true,
//                 regex: /^[A-Z]{1}[A-Za-z]+ [A-Z]{1}[A-Za-z]+$/
//             },
//             dostavaAdresa: {
//                 required: true,
//                 regex: /^[A-Z-a-z ]+$/
//             },
//             dostavaTelefon: {
//                 required: true,
//                 regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
//             },
//             dostavaGrad: {
//                 required: true,
//                 regex: /^[A-Z-a-z ]+$/
//             },
//             idProizvoda: {
//                 required: true,
//                 regex: /^\d+$/
//             },
//             kolicina: {
//                 required: true,
//                 regex: /^[1-9]+$/
//             },
//             opcija: {
//                 required: true
//             }

//         },
//         messages: {
//             dostavaIme: {
//                 required: "Obavezno popuniti",
//                 regex: "Dvije rijeci, prva velika slova u svakoj rijeci"
//             },
//             dostavaAdresa: {
//                 required: "Obavezno popuniti",
//                 regex: "Samo tekstualni podaci"
//             },
//             dostavaTelefon: {
//                 required: "Obavezno popuniti",
//                 regex: "Format: +111-11-111-1111"
//             },
//             dostavaGrad: {
//                 required: "Obavezno popuniti",
//                 regex: "Samo tekstualni podaci"
//             },
//             idProizvoda: {
//                 required: "Obavezno popuniti",
//                 regex: "Samo brojevi"
//             },
//             kolicina: {
//                 required: "Obavezno popuniti",
//                 regex: "Samo brojevi, kolicina mora biti 1 ili veca"
//             }
//         }
//     }
// );

makeRedove = (data) => {
    return `<tr>
    <td>${data.proizvodID}</td>
    <td>${data.likeCounter}</td>
    <td>${data.naziv}</td>
    <td><img src="${data.slikaUrl}"</img></td>
    <td>${data.cijenaPoKvadratu}</td>
    <td><button id="lajk" onclick="lajkovi(${data.proizvodID})">LIKE</button></td>
    <td><button id="odaberi" onclick="odaberi(${data.proizvodID})">Odaberi</button></td>
    </tr>`
}

getProizvodiAll = () => {
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
        .then(res => res.json()).then(data => {
            //refresh();
            console.table(data);
            for (const i in data) {
                document.querySelector("#proizvodi").innerHTML += makeRedove(data[i]);
            }
        })
        .catch(err => console.log(err))
}
getProizvodiAll();

lajkovi = (id) => {
    let urlLajkovi = "http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId=" + id;
    fetch(urlLajkovi)
        .then(res => res.json()).then(data => {
            data.likeCounter++;
            //za prikaz uvecanog broja lajkova bez reload-anja stranice
            //pononovo se mora pozvati funkcija getProizvodiAll 
            //getProizvodiAll();
        })
        .catch(err => console.log(err));
}

//u zadatku kod uvecavanja lajkova,zadano je da se nakon reload-anja
//stranice vidi uvecan broj lajkova,
//funkcija refresh se koristi da se ne mora reload-ti stranica,
//i poziva se u funkciji getProizvodiAll
refresh = () => { $("#proizvodi tbody").empty(); }

odaberi = (id) => {
    {
        fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
            .then(res => res.json()).then(data => {
                for (const i of data) {
                    if (i.proizvodID == id) {
                        document.getElementById("idProizvoda").value = i.proizvodID;
                        document.getElementById("dostavaIme").value = i.naziv;
                    }
                }
            })
            .catch(err => console.log(err))
    }

    {
        fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodOpcije?proizvodId=' + id)
            .then(res => res.json()).then(data => {
                console.log(data)
                document.getElementById("option").innerHTML = data;
            })
            .catch(err => console.log(err))
    }
}


document.getElementById("naruci").onclick = () => {
    const data = {
        dostavaGrad: $("#dostavaGrad").val(),
        dostavaAdresa: $("#dostavaAdresa").val(),
        dostavaIme: $("#dostavaIme").val(),
        dostavaTelefon: $("#dostavaTelefon").val(),
        nazivProizvoda: $("#nazivProizvoda").val(),
        opcija: $("#opcija").val(),
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
                console.log("palo")
                return;
            }
            res.json().then(data => { })
        })
        .catch(err => console.log(err));
}


makePostRedove = (data) => {
    return `<tr>
    <td>${data.proizvodID}</td>
    <td>${data.naziv}</td>
    <td>${data.cijena}</td>
    <td>${data.kolicina}"</td>
    <td>${data.iznos}</td>
    <td>${data.dostavaIme}</td>
    <td>${data.dostavaAdresa}</td>
    <td>${data.datumNarudzbe}</td>
    <td>${data.dostavaTelefon}</td>
    </tr>`
}
ucitajPostMetodu = () => {
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll')
        .then(res => res.json()).then(data => {
            console.table(data);
            for (const i in data) {
                document.querySelector("#narudzbe").innerHTML += makePostRedove(data[i]);
            }
        })
        .catch(err => console.log(err));
}
ucitajPostMetodu();
