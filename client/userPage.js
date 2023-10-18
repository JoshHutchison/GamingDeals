const dealsBody = document.querySelector('.deals-body')
const userInfo = document.querySelector('.user-info')

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');



const base = 'http://localhost:3001'
// console.log()
const populateMain = async () => {
    dealsBody.replaceChildren()
    let user = (await axios.get(`${base}/users/${userId}`)).data
    let deals = user.deal_id
    let userName = user.user_name
    userInfo.innerHTML = `<h2>Username: ${userName}</h2>`
    
    deals.forEach((deal) => {
        let dealCard = `<div class="item-holder" data-deal-id="${deal._id}">
        <div class="image-container">
        <img src="${deal.thumbnail}" alt="" class="deal-pic">
        </div>
        <h3 class="deal-name">${deal.title}</h3>        
        <p class="price">Price: ${deal.worth}</p>
        <p class="description">Description: ${deal.description}</p>
        </div>`
        dealsBody.innerHTML += dealCard   
        
        
        
    })

}

populateMain()