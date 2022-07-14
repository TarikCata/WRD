$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Molim vas provjerite vaš unos!"
);

var forma = $("#contact-form");
var validacija = forma.validate({
  rules: {
    ime: {
      required: true,
      regex: /^[A-Z][a-z]+$/,
    },
    lastName: {
      required: true,
      regex: /^[A-Z][a-z]+$/,
    },
    email: {
      required: true,
      regex: /^[A-Za-z]+\.?[A-Za-z]+@(edu.fit.ba|hotmail.com|gmail.com)$/,
    },
    phone: {
      required: true,
      regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}$/,
    },
  },
});
var svi = [];
idZaPoslat = "";
makeRedove = (obj) => {
  return `<article class="offer">
    <img src=${obj.slikaUrl} alt="offer" />
    <div class="offer-details">
    <div class="cijena-naziv">
    <h4 class="offer-destination">${obj.drzava}</h4>
    <h3 class="offer-price">$${obj.cijena}</h3>
    </div>
    </div>
    <div class="ponudaa"><button onclick="upisiDestinaciju(${obj.id})" class="ponuda-dugme">Odaberi ponudu</button></div>
    </article>`;
};
console.log(validacija);
getPonude = async () => {
  const url = "https://restapiexample.wrd.app.fit.ba/Ispit20220625/Get6Ponuda";
  const response = await fetch(url);
  const obj = await response.json();
  svi = obj;
  for (i = 0; i < obj.length; i++) {
    document.getElementById("destinacije").innerHTML += makeRedove(obj[i]);
  }
};

upisiDestinaciju = (id) => {
  for (const i of svi) {
    if (i.id === id) {
      idZaPoslat = id.toString();
      document.getElementById("destinacija").value = i.drzava;
    }
  }
};

provjera = () => {
  var vrijednosti = [
    document.getElementById("first-name").value,
    document.getElementById("email").value,
    document.getElementById("last-name").value,
    document.getElementById("phone").value,
  ];
  if (idZaPoslat === "") {
    alert("Morate odabrati destinaciju");
    return false;
  }
  for (const i of vrijednosti) {
    if (i === "") {
      console.log("prazno");
      return false;
    }
  }
  return true;
};
posalji = () => {
  if (!provjera()) {
    return;
  }
  if (validacija.errorList.length === 0) {
    const urlPost = "https://restapiexample.wrd.app.fit.ba/Ispit20220625/Add";
    const zaPoslat = {
      destinacijaID: idZaPoslat,
      ime: $("#first-name").val(),
      prezime: $("#last-name").val(),
      poruka: $("#poruka").val(),
      email: $("#email").val(),
      telefon: $("#phone").val(),
    };
    fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zaPoslat),
    })
      .then((res) => res.json())
      .then((obj) => {
        alert(
          "Poruka:" +
            obj.poruka +
            "\nBroj Rezervacija:" +
            obj.brojRezervacije +
            "\nVrijeme:" +
            obj.vrijeme
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
