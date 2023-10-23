import { catsData } from '/data.js'

const emotionsContainerEl = document.querySelector("#emotion-radios")
const getImgButtonEl = document.getElementById("get-image-btn")

const catImgContainer = document.getElementById("meme-modal")
const catImg = document.getElementById("meme-modal-inner")
const closeButton = document.getElementById("meme-modal-close-btn")

emotionsContainerEl.addEventListener("change",highlightRadios)
getImgButtonEl.addEventListener("click",renderImg)
closeButton.addEventListener("click",closeContainer)

function renderRadio(){
    const emotionsArray = []
    for (let cats of catsData){
        for (let i = 0 ; i < cats.emotionTags.length;i++){
            
            if ( !emotionsArray.includes(cats.emotionTags[i])){
            const emotion = cats.emotionTags[i]  
            emotionsArray.push(emotion)

            emotionsContainerEl.innerHTML += `
                                    <div  class="emotions-container">
                                        <label for="${emotion}">${emotion}</label>
                                    
                                        <input 
                                        class="radio-emotion"
                                        name="radio" 
                                        id="${emotion}" 
                                        type="radio"
                                        value="${emotion}">
                                  </div>`  
    }
    }
    } 
}
    
function highlightRadios(event){
    
    const radios = document.getElementsByClassName("bg-color")
    for (let i of radios){
        i.classList.remove("bg-color")
    }
    document.getElementById(event.target.id).parentElement.classList.add("bg-color")

}

function getElements(){
    
    // get the array of img to display later
    if (document.getElementById("gifs-only-option").checked){
       
        const array = catsData.filter(function(element){
        const radioSelected = document.querySelector("input[type='radio']:checked").value
        
            return element.isGif === true && element.emotionTags.includes(radioSelected)
        })
        
        const randomNumber = Math.floor(Math.random() * array.length)
        const exactPath = array[randomNumber].image
        return exactPath
    
    }

   // find the input type radios checked and return all the elements that have the checked emotions in it
   else{
        
        const array = catsData.filter(function(element){
        const SelectedRadio = document.querySelector("input[type='radio']:checked").value
            return element.emotionTags.includes(SelectedRadio)
            
        })
        
        const randomNumber = Math.floor(Math.random() * array.length)
        const exactPath = array[randomNumber].image
        return exactPath
     } 
}
    

function closeContainer(){
    catImgContainer.style.display = "none"
   
}
//render de img 
function renderImg(){
    document.getElementById("meme-modal").style.display = "flex"
    const a = getElements()
    
    catImg.innerHTML = `<img class="cat-img" src="./images/${a}">`

}
renderRadio()