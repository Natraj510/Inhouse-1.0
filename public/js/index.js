const list = [
    {
      id: 1,
      title: "Choco strawbery",
      category: "under",
      discription: "400",
      img: "img/card1.jpg"
    },
    {
      id: 2,
      title: "Choco Milkshake",
      category: "under",
      discription: "80",
      img: "img/card2.png"
    },
    {
      id: 3,
      title: "Choco Caramel",
      category: "under",
      discription: "100",
      img: "img/card3.jpg"
    },
    {
      id: 4,
      title: "Marble vanila cake",
      category: "post",
      discription: "654",
      img: "img/card1.jpg"
    },
    {
        id: 5,
        title: "Marble vanila cake",
        category: "post",
        discription: "454",
        img: "img/card2.png"
    },
    {
        id: 6,
        title: "Marble vanila cake",
        category: "post",
        discription: "65446",
        img: "img/card3.jpg"
    }
];
const list1 = [
    {
      id: 1,
      title: "Choco strawbery",
      category: "under",
      discription: 400,
      img: "/img/card1.jpg",
    },
    {
      id: 2,
      title: "Choco Milkshake",
      category: "under",
      discription: 80,
      img: "img/card2.png",
    },
    {
      id: 3,
      title: "Choco Caramel",
      category: "under",
      discription: 100,
      img: "img/card3.jpg",
    }
];

const btns = document.querySelectorAll(".btn-filter")
const cards = document.querySelector(".items")
const navbar = document.getElementById("nav")
const apply = document.getElementById("apply")


window.addEventListener("DOMContentLoaded",function(){
    displayContent(list1);
})


window.addEventListener("scroll", function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    console.log(scrollHeight)
    console.log(navHeight)
    if(scrollHeight > navHeight){
        console.log("hi");
        apply.classList.remove('apply');
    }
    else{
        apply.classList.add('apply');
    }
    
})

btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        const cardId = e.currentTarget.dataset.id
        console.log(cardId);
        const cardContent = list.filter(function(filt){
            if(filt.category === cardId){
                return filt
            }
        })
        console.log(cardContent);

        if(cardId === 'under'){
            displayContent(cardContent)
        }else{
            displayContent(cardContent)
        }
    })
})

function displayContent(contents){
    let displayContent = contents.map(function(cont){
        return `<div class="col">
        <div class="card">
            <img src="${cont.img}" class="card-img" alt="dummy" >
            <div class="container">
                <h4><b>${cont.title}</b></h4>
                <p>${cont.discription}</p>
                <button class="button btn card-details" >Details</button>
                <button class="button btn card-apply">Apply</button>
            </div>
        </div>
    </div>`
    })
    console.log(displayContent);
    displayContent = displayContent.join('')
    cards.innerHTML= displayContent
}
