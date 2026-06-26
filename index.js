
    const inputTxt = document.getElementById("input-el")
    const ulEl = document.getElementById("ul-el")
    const btnEl = document.getElementById("btn-el")
    const btnDl = document.getElementById("btn-del")
    const btntab = document.getElementById("btn-savetab")
    const btnExp = document.getElementById("btn-export")
    const btnAi = document.getElementById("btn-ai")
    let contents = [];
    let aiContents = [];
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
        // console.log(contents)
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
        if(aiContents.length === 0 ) return
        const date = new Date().toLocaleDateString()
        const text = `# Noema Captures — ${date}\n\n` + aiContents.join("\n\n---\n\n")
    
        const blob = new Blob([text], { type: "text/markdown" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "noema-captures.md"
        a.click()

        URL.revokeObjectURL(url)
    })

    btnAi.addEventListener("click", async ()=>{
            if(contents.length === 0 ) return
            const response = await fetch("http://divine-enthusiasm-production-14b5.up.railway.app/pipline",
                {
                    method:"POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents })
                });

            const data = await response.json();
            console.log(data.response)
            aiContents.push(data.response)
            // renderInputs(aiContents)
    })