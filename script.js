"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

//Global VAR
let map;
let mapEvent;

//Geolocation API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapEve) {
        mapEvent = mapEve;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Could not get permission");
    }
  );

form.addEventListener("submit", function (e) {
  //prevent default
  e.preventDefault();

  //clear value
  inputDistance.value =
    inputDuration.value =
    inputElevation.value =
    inputCadence.value =
      "";

  //display workout
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        className: "running-popup",
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});
