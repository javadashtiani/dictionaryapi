const searchBtn = document.querySelector("#Search");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const audio = document.querySelector("#audio");

searchBtn.addEventListener("click", () => {
  const inputValue = input.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      const content = document.createElement("div");
      container.classList.add("content");
      container.innerHTML = `
      <div class="part-one">
    <div>
      <h2>${data[0].word}</h2>
      <div>
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetic}</p>
      </div>
    </div>
    <div onclick="play()"><i class="bi bi-volume-up volume"></i></div>
  </div>
  <div class="part-two">
    <h4>${data[0].meanings[0].definitions[0].definition}</h4>
  </div>
  <div class="part-three">
    <h2>Word Example</h2>
    <h3 class="exmple">${data[0].meanings[0].definitions[0].example || ""}</h3>
  </div>
      `;
      audio.setAttribute("src", data[0].phonetics[0].audio);
    });
  input.value = "";
  input.focus();
});

function play() {
  audio.play();
}
