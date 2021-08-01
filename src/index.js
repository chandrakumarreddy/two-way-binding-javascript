import "./styles.css";

console.clear();

const createObject = (obj) =>
  new Proxy(obj, {
    set(target, property, value) {
      target[property] = value;
      render();
      return true;
    }
  });

const state = createObject({ name: "", age: "" });

document.querySelectorAll("[data-model]").forEach((element) => {
  const model = element.dataset.model;
  element.addEventListener("keyup", () => {
    state[model] = element.value;
  });
});

function render() {
  Array.from(document.querySelectorAll("[data-binding]"))
    .map((elem) => elem.dataset.binding)
    .forEach((elem) => {
      document.querySelector(`[data-binding=${elem}]`).innerHTML = state[elem];
      document.querySelector(`[data-model=${elem}]`).innerHTML = state[elem];
    });
}
