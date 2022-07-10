let clic = 0;
const clicResult = document.querySelector(".clic-result");
const catPlusUn = document.querySelector(".catPlusUn");
const clicEffectPlusUn = document.querySelector(".clicEffectPlusUn")

function clicPlusUn() {
    clic++;
    clicResult.textContent = `${clic}`;
  }
  
  catPlusUn.addEventListener("click", () => {
    clicPlusUn();
    animPlusUn();
  });

  function animPlusUn() {
    clicEffectPlusUn.classList.add("clicAnimPlusUn");
      // Alors ajoute le style "jump"
      setTimeout(function () {
        clicEffectPlusUn.classList.remove("clicAnimPlusUn");
        // Enlève le style "jump"
      }, 150);
  }