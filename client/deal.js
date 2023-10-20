import { setupLogin } from "./script.js";


const urlParams = new URLSearchParams(window.location.search);
const dealId = urlParams.get('id');
console.log(`Deal ID from URL: ${dealId}`);

const dealsBody = document.querySelector('.deals-body')

const base = 'http://localhost:3001'
// console.log()
const populateMain = async () => {
    setupLogin()
    
    dealsBody.replaceChildren()
    let dealData = (await axios.get(`${base}/deals/${dealId}`)).data
    
    // let comments = []
    // let comment_ids = dealData.comment_id
    // for (let i = 0; i < comment_ids.length; i++) {
    //     (await axios.get(`${base}/comments/${comments_ids[i]}`)).data
        
    // }       ${comments.map(comment => `<li>${comment.text}</li>`).join('')}

    let comments = ""
    console.log(dealData.comment_id)
    if (dealData.comment_id) {
        dealData.comment_id.forEach((comment) => {
            comments += `
                <div class="comment">
                    <p class="comment-text">${comment.comment_text}</p>
                    <p class="comment-info">
                        <span>Username: ${comment.user_id.user_name}</span> |
                        <span>Rating: ${comment.comment_rating}</span>
                    </p>
                </div>`
        })
    }
    
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    // console.log(JSON.parse(localStorage.getItem('loginInfo')))
    let wishlist = ""
    if (loginInfo.username != '') {
        comments += `<div class="comment-box">
                <textarea id="comment" rows="4" placeholder="Write your comment here..."></textarea>
                <span>Rating: 
                    <select class="rating-input">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </span>
                <button id="submit">Submit</button>
                </div>`
        wishlist = `<button class="wishlist-button">Wishlist +</button>`
        
    
    } else (
        wishlist = `<button class="wishlist-button hidden">Wishlist +</button>`
    )
    
    
                // <li>User: ${comment.user_id.user_name}, 
                // Comment Rating: ${comment.comment_rating},
                // Comment: ${comment.comment_text}
                // </li>

    let dealCard = `<div class="deal-card" data-deal-id="${dealData._id}">
        <img src="${dealData.image}" alt="" class="deal-pic">
        ${wishlist}        
        <h3 class="deal-name">${dealData.title}</h3>
        <p class="price">Price: ${dealData.worth}</p>
        <p class="giveaway-url">Giveaway URL: </p><a href="${dealData.giveaway_url}">${dealData.giveaway_url}</a>
        <p class="description">Description: ${dealData.description}</p>
        <p class="instructions">Instructions: ${dealData.instructions}</p>
        <p class="status">Status: ${dealData.status}</p> 
        <p class="published-date">Published Date: ${dealData.published_date}</p>
        <p class="end-date">End Date: ${dealData.end_date}</p>
        <p class="type">Type: ${dealData.type}</p>
        <p class="platforms">Platforms: ${dealData.platforms}</p>
        <p class="users">Users: ${dealData.users}</p>
        <div class="comments-list">
        ${comments}
        </div>
        </div>`

    dealsBody.innerHTML += dealCard
    
    if (loginInfo.username != '') {
        document.getElementById("submit").addEventListener("click", async function() {
            loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
            const commentText = document.getElementById("comment").value
            const selectedRating = document.querySelector(".rating-input").value
            const apiUrl = `${base}/comments/`

            const data = {
                comment_text: commentText,
                comment_rating: selectedRating,
                deal_id: dealId, 
                user_id: loginInfo.user_id
            }

            await axios.post(apiUrl, data)
                .then(response => {
                    console.log("Comment submitted successfully:", response.data)
                    // You can add further actions here, like displaying a success message or updating the comment list.
                })
                .catch(error => {
                    console.error("Error submitting comment:", error)
                    // Handle errors, e.g., display an error message to the user.
                })
            location.reload()
        })

        document.querySelector(".wishlist-button").addEventListener("click", async function() {
            loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
            const apiUrl = `${base}/users/${loginInfo.user_id}/wishlist-add`

            const data = {
                deal_id: dealId               
            }

            await axios.put(apiUrl, data)
                .then(response => {
                    console.log("Deal added to wishlist successfully:", response.data)
                    
                })
                .catch(error => {
                    console.error("Error adding deal to wishlist:", error)

                })
            const wishlistbutton = document.querySelector('.wishlist-button')
            wishlistbutton.classList.add("hidden")
        })


    }    


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