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

get4student = async () => {
  try {
    const response = await fetch(
      "https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta"
    );
    const data = await response.json();
    for (const i in data) {
      document.querySelector("#forPicture").innerHTML += makeRedove(data[i]);
    }
  } catch (error) {
    console.log(error);
  }
};
get4student();

UpisiIme = (id) => {
  const urlName =
    "https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta";
  fetch(urlName)
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

postSlanje = (e) => {
  e.preventDefault();
  const postUrl = "https://restapiexample.wrd.app.fit.ba/Ispit20210702/Add";
  const data = {
    imePrezime: $("#primaoc").val(),
    naslov: $("#naslov").val(),
    poruka: $("#poruka").val(),
    telefon: $("#telefon").val(),
  };
  fetch(postUrl, data)
    .then((res) => {
      if (res.status !== 200) {
        console.log("Greska sa serverom");
      }
      alert("Poslano " + data);
    })
    .catch((err) => console.log(err));
};
