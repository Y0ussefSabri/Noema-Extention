const inputTxt = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el")
const btnEl = document.getElementById("btn-el")
const btnDl = document.getElementById("btn-del")
let contents = [];
let valueLocalStorage = JSON.parse(localStorage.getItem("values"))

if(valueLocalStorage)
{
    contents = valueLocalStorage;
    renderInputs()
}
btnEl.addEventListener("click",()=>{
    const value = inputTxt.value.trim()
    if(value !== "")
    {
        contents.push(value)
        inputTxt.value = ""
        localStorage.setItem("values", JSON.stringify(contents))
        renderInputs()
    }
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


btnDl.addEventListener("click", ()=>{
    localStorage.clear()
    contents = [];
    renderInputs()
})