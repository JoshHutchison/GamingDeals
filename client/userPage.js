import { setupLogin } from "./script.js";

const dealsBody = document.querySelector('.deals-body')
const userInfo = document.querySelector('.user-info')

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

let loginInfo = ""



const base = 'http://localhost:3001'
// console.log()
const populateMain = async () => {
    setupLogin()
    dealsBody.replaceChildren()
    let user = (await axios.get(`${base}/users/${userId}`)).data
    let deals = user.deal_id
    let userName = user.user_name
    userInfo.innerHTML = `<h2>Username: ${userName}</h2>`
    
    deals.forEach((deal) => {
        let dealCard = `<div class="item-holder" data-deal-id="${deal._id}">
        <div class="image-container">
        <img src="${deal.thumbnail}" alt="" class="deal-pic">
        <span class="close-button">X</span>
        </div>
        
        <h3 class="deal-name">${deal.title}</h3>        
        <p class="price">Price: ${deal.worth}</p>
        <p class="description">Description: ${deal.description}</p>
        </div>`
        dealsBody.innerHTML += dealCard         
        
        
    })
    
    dealsBody.addEventListener('click', async (event) => {    
        if (event.target && event.target.classList.contains("close-button")) {
            const dealElement = event.target.closest('.item-holder')
            if (dealElement) {                
                dealElement.remove()
                const dealId = dealElement.getAttribute('data-deal-id')
                let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
                console.log(loginInfo.user_id, {deal_id:dealId})
                const apiUrl = `${base}/users/${loginInfo.user_id}/wishlist-delete`

                const data = {
                    deal_id: dealId               
                }
                console.log('before delete',apiUrl, data)
                await axios.put(apiUrl, data)
                .then(response => {
                    console.log("Deal added to wishlist successfully:", response.data)
                    
                })
                .catch(error => {
                    console.error("Error adding deal to wishlist:", error)

                })

            }
        } else {           
            const dealElement = event.target.closest('.item-holder')
            if (dealElement) {
                const dealId = dealElement.getAttribute('data-deal-id')
                // console.log(`Deal ${dealId} clicked!`)
                const dealPageUrl = `deal.html?id=${dealId}`                
                window.location.href = dealPageUrl
            }
        }
    });


}

populateMain()