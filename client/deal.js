const urlParams = new URLSearchParams(window.location.search);
const dealId = urlParams.get('id');
console.log(`Deal ID from URL: ${dealId}`);

const dealsBody = document.querySelector('.deals-body')

const base = 'http://localhost:3001'
// console.log()
const populateMain = async () => {
    dealsBody.replaceChildren()
    let dealData = (await axios.get(`${base}/deals/${dealId}`)).data
    
    // let comments = []
    // let comment_ids = dealData.comment_id
    // for (let i = 0; i < comment_ids.length; i++) {
    //     (await axios.get(`${base}/comments/${comments_ids[i]}`)).data
        
    // }

    let dealCard = `<div class="item-holder" data-deal-id="${dealData._id}">
        <img src="${dealData.image}" alt="" class="deal-pic">
        <h3 class="deal-name">${dealData.title}</h3>
        <p class="price">Price: ${dealData.worth}</p>
        <p class="description">Description: ${dealData.description}</p>
        <p class="instructions">Instructions: ${dealData.instructions}</p>
        <p class="giveaway-url">Giveaway URL: ${dealData.giveaway_url}</p>
        <p class="published-date">Published Date: ${dealData.published_date}</p>
        <p class="type">Type: ${dealData.type}</p>
        <p class="platforms">Platforms: ${dealData.platforms}</p>
        <p class="end-date">End Date: ${dealData.end_date}</p>
        <p class="users">Users: ${dealData.users}</p>
        <p class="status">Status: ${dealData.status}</p>
        <p class="site-url">Site URL: ${dealData.site_url}</p>
        <p class="createdAt">Created At: ${dealData.createdAt}</p>
        <p class="updatedAt">Updated At: ${dealData.updatedAt}</p>
        <ul class="comments-list">
            ${comments.map(comment => `<li>${comment.text}</li>`).join('')}
        </ul>
        </div>` 
    dealsBody.innerHTML += dealCard   
        
        
        


    // dealsBody.addEventListener('click', (event => {        
    //     const dealElement = event.target.closest('.item-holder')
    //     if(dealElement) {
    //         const dealId = dealElement.getAttribute('data-deal-id');
            
    //         console.log(`Deal ${dealId} clicked!`);

    //         const dealPageUrl = `deal.html?id=${dealId}`

    //         window.location.href = dealPageUrl

    //     }
    // }))


    
}

populateMain()