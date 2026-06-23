
    const inputTxt = document.getElementById("input-el");
    const ulEl = document.getElementById("ul-el")
    const btnEl = document.getElementById("btn-el")
    const btnDl = document.getElementById("btn-del")
    const btntab = document.getElementById("btn-savetab")
    const btnExp = document.getElementById("btn-export")
    let contents = [];
    let valueLocalStorage = JSON.parse(localStorage.getItem("values"))

    if(valueLocalStorage)
    {
        contents = valueLocalStorage;
        renderInputs(contents)
    }
    btnEl.addEventListener("click",()=>{
        const value = inputTxt.value.trim()
        if(value !== "")
        {
            contents.push(value)
            inputTxt.value = ""
            localStorage.setItem("values", JSON.stringify(contents))
            renderInputs(contents)
        }
    })
    function renderInputs(contents)
    {
        let temp = ""
        for(let i = 0; i < contents.length; i++)
            {
                temp+= `<li>${contents[i]}</li>`;
            }
        ulEl.innerHTML = temp;
    }


    btnDl.addEventListener("dblclick", ()=>{
        localStorage.clear()
        contents = [];
        renderInputs(contents)
    })

    btntab.addEventListener("click", ()=>{
        chrome.tabs.query({active : true, lastFocusedWindow: true}, function(tabs)
        {
        let tab = tabs[0]
        console.log(tab)
        if(tab && tab.url)
        {
            contents.push(tab.url)
            localStorage.setItem("values", JSON.stringify(contents))
            renderInputs(contents)
        }
    })

    })


    btnExp.addEventListener("click", ()=>{
        if(contents.length == 0 ) return
        const text = contents.join("\n")
        const blob = new Blob([text], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "noema-captures.txt"
        a.click()

        URL.revokeObjectURL(url)
    })