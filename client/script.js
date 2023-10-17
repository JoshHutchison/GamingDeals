

const dealsBody = document.querySelector('.deals-body')

const base = 'http://localhost:3001'
// console.log()
const populateMain = async () => {
    dealsBody.replaceChildren()
    let deals = (await axios.get(`${base}/deals`)).data
    deals.forEach((deal) => {
        let dealCard = `<div class="item-holder" data-deal-id="${deal._id}">
        <img src="${deal.thumbnail}" alt="" class="deal-pic">
        <h3 class="deal-name">${deal.title}</h3>        
        <p class="price">Price: ${deal.worth}</p>
        <p class="description">Description: ${deal.description}</p>
        </div>`
        dealsBody.innerHTML += dealCard   
        
        
        
    })

    dealsBody.addEventListener('click', (event => {        
        const dealElement = event.target.closest('.item-holder')
        if(dealElement) {
            const dealId = dealElement.getAttribute('data-deal-id');
            
            console.log(`Deal ${dealId} clicked!`);

            const dealPageUrl = `deal.html?id=${dealId}`

            window.location.href = dealPageUrl

        }
    }))


    
}

populateMain()