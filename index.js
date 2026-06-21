const inputTxt = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el")
const btnEl = document.getElementById("btn-el")

let contents = [];

btnEl.addEventListener("click",()=>{
    const value = inputTxt.value.trim()
    if(value !== "")
    {
        contents.push(value)
        inputTxt.value = ""
    }
    renderInputs()
    console.log("btn clicked")
})

function renderInputs()
{
    let temp = ""
    for(let i = 0; i < contents.length; i++)
        {
            temp+= `<li>${contents[i]}</li>`;
        }
     
    ulEl.innerHTML = temp;
}
