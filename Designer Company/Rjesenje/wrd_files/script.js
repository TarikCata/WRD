var nav = document.getElementById("nav");

document.getElementById("IzbornikDugme").onclick = () => {
  if (nav.style.maxHeight == "60px") {
    nav.style.maxHeight = "390px";
  } else {
    nav.style.maxHeight = "60px";
  }
};

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    var check = false;
    return this.optional(element) || regexp.test(value);
  },
  "Molim vas provjerite vaš unos!"
);

var forma = $("#forma");
forma.validate({
  rules: {
    naslov: {
      required: true,
      regex: /^[A-Z]{1}[a-zA-Z ]+[a-zA-Z]+$/,
    },
    telefon: {
      required: true,
      regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/,
    },
    messages: {
      naslov: {
        required: "Ovo polje je obavezno",
        regex: "Prva dva slova moraju biti velika slova",
      },
      telefon: {
        required: "Ovo polje je obavezno",
        regex: "Treba biti u formatu:+111-11-111-1111",
      },
    },
  },
});

var allStudents;
//1
makeRedove = (data) => {
  const { slikaPutanja, imePrezime, opis, id } = data;
  return `<div id="wrapperZaSliku">
<img id="zaPng" src="${slikaPutanja}" />
<div id="zaTxt">
<h3>${imePrezime}</h3>
<p>${opis}</p>
<button class="buttonSend" onclick="UpisiIme(${id})">Piši poruku</button>
</div>
</div>`;
};

get4student = () => {
  fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta")
    .then((res) => res.json())
    .then((data) => {
      console.table(data);
      for (const i in data) {
        document.querySelector("#forPicture").innerHTML += makeRedove(data[i]);
        allStudents = data;
      }
    })
    .catch((err) => console.log(err));
};
get4student();

//2
UpisiIme = (id) => {
  fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta")
    .then((res) => res.json())
    .then((data) => {
      for (const i of data) {
        if (i.id == id) {
          document.getElementById("primaoc").value = i.imePrezime;
        }
      }
    })
    .catch((err) => console.log(err));
};

//3
postSlanje = (e) => {
  e.preventDefault();
  const data = {
    id: allStudents.id,
    imePrezime: $("#primaoc").val(),
    naslov: $("#naslov").val(),
    poruka: $("#poruka").val(),
    datumVrijeme: allStudents.datumVrijeme,
    telefon: $("#telefon").val(),
  };
  fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      console.log("palo");
    }
  });
  res
    .json()
    .then((data) => {
      console.log(data);
    })

    .catch((err) => console.log(err));
};

//za provjeru da li je dodano preko post metode
provjeri = () => {
  fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};
provjeri();
