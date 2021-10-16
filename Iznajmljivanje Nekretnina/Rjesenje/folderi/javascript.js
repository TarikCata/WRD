var dugme = document.getElementById("IzbornikDugme");
var nav = document.getElementById("nav");

dugme.onclick = () => {
  if (nav.style.maxHeight == "66px") {
    nav.style.maxHeight = "320px";
  } else {
    nav.style.maxHeight = "66px";
  }
};

const okvir = document.getElementsByClassName("VilaKolonaOkvir");

for (let i = 0; i < okvir.length; i++) {
  okvir[i].onmouseover = hoveruj;
  okvir[i].onmouseout = iskljuci;
}

function hoveruj() {
  this.style.border = "10px solid yellow";
}

function iskljuci() {
  this.style.border = "none";
}

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Unos nije validan!"
);

var forma = $("#forma");

forma.validate({
  rules: {
    dostavaIme: {
      required: true,
      regex: /^[a-zA-Z]+$/,
    },
    dostavaAdresa: {
      required: true,
      regex: /^[a-zA-Z]+$/,
    },
    dostavaPostanskiBroj: {
      required: true,
      regex: /^[0-9]{5,}$/,
    },
    dostavaTelefon: {
      required: true,
      regex: /^[0-9]{5,}$/,
    },
  },
  messges: {
    dostavaIme: {
      required: "Ovo polje je obavezno",
    },
    dostavaAdresa: {
      required: "Ovo polje je obavezno",
    },
    dostavaPostanskiBroj: {
      required: "Ovo polje je obavezno",
      regex: "Minimalno 5 brojeva",
    },
    dostavaTelefon: {
      required: "Ovo polje je obavezno",
      regex: "Treba bit u formatu -> : +111-11-111-1111",
    },
  },
});

makeRedove = (obj) => {
  const {
    narudzbaId,
    datumNarudzbe,
    dostavaAdresa,
    dostavaIme,
    dostavaPostanskiBroj,
    dostavaTelefon,
    napomena,
  } = obj;

  return `<tr>
    <td>${narudzbaId}</td>
    <td>${datumNarudzbe}</td>
    <td>${dostavaIme}</td>
    <td>${dostavaAdresa}</td>
    <td>${dostavaPostanskiBroj}</td>
    <td>${dostavaTelefon}</td>
    <td>${napomena}</td>
    </td>`;
};

const urlAll =
  "http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll";

const urlPost =
  "http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";

getAll = async () => {
  try {
    const response = await fetch(urlAll);
    const data = await response.json();
    for (const i in data) {
      document.querySelector("#tabelaID").innerHTML += makeRedove(data[i]);
    }
  } catch (err) {
    console.log(err);
  }
};
getAll();

postF = (e) => {
  e.preventDefault();
  obj = {
    dostavaAdresa: $("#dostavaAdresa").val(),
    dostavaIme: $("#dostavaIme").val(),
    dostavaPostanskiBroj: $("#dostavaPostanskiBroj").val(),
    dostavaTelefon: $("#dostavaTelefon").val(),
    napomena: $("#napomena").val(),
  };

  fetch(urlPost, {
    method: "post",
    body: JSON.stringify(obj),
  })
    .then((res) => {
      console.log("Poslano " + res);
    })
    .catch((err) => console.log(err));
};
