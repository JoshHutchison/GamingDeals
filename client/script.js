const dealsBody = document.querySelector('.deals-body')
const loginDialog = document.querySelector('.dialog-login')
const dialog = document.querySelector('.dialog')
const modal = document.getElementById('login');
const closeBtn = document.querySelector('.close')
const cancelBtn = document.querySelector('.cancelbtn')
const loginForm = document.querySelector('.modal-content')
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const invalidLogin = document.querySelector('.invalid-login')
const wishlistNav = document.querySelector('.login-link')
const addNewUser = document.querySelector('.psw')


let loginInfo = ""

const base = 'http://localhost:3001'

const clickHandler = (event) => {
    dialog.showModal()
  }

  closeBtn.addEventListener('click', () => {
    username.value = ""
    password.value = ""
    invalidLogin.innerText = ''
    dialog.close()
})

cancelBtn.addEventListener('click', () => {
    username.value = ""
    password.value = ""
    invalidLogin.innerText = ''
    dialog.close()
})

addNewUser.addEventListener('click', async (e) => {
    e.preventDefault();
    // await axios.get(`${base}/deals`)
    let users = (await axios.get(`${base}/users`)).data
    let userName = ""
    let userID = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_name == username.value) {
            userName = users[i].user_name
            userID = users[i]._id
            break
        }
    }
    if (userName == "" ) {
        let newUser = (await axios.post(`${base}/users`, {user_name: username.value})).data
        console.log(newUser)
        localStorage.setItem('loginInfo',JSON.stringify({username:newUser.user_name,user_id:newUser._id}))
        console.log({username:newUser.user_name,user_id:newUser._id})
        loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        console.log(loginInfo)
        loginDialog.innerText = `${loginInfo.username} Logout` 
        wishlistNav.innerText = 'Wishlist'           
        loginDialog.removeEventListener('click', clickHandler)
        wishlistNav.href = `./userPage.html?id=${loginInfo.user_id}`
        loginDialog.addEventListener('click', logout)
        // console.log(document.cookie)
        username.value = ""
        password.value = ""
        invalidLogin.innerText = ''
        if (window.location.pathname.includes('deal.html')) {
            const wishlistbutton = document.querySelector('.wishlist-button')
            wishlistbutton.classList.remove("hidden")
            const commentBox = document.querySelector('.comment-box')
            if (commentBox) {
                commentBox.classList.remove("hidden")
            }
            

        }
        dialog.close()
        
    }
})

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // await axios.get(`${base}/deals`)
    let users = (await axios.get(`${base}/users`)).data
    let userName = ""
    let userID = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_name == username.value) {
            userName = users[i].user_name
            userID = users[i]._id
            break
        }
    }
    if (userName != "" ) {
        localStorage.setItem('loginInfo',JSON.stringify({username:userName,user_id:userID}))
        loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        console.log(loginInfo.username, loginInfo.user_id)
        loginDialog.innerText = `${userName} Logout` 
        wishlistNav.innerText = 'Wishlist'           
        loginDialog.removeEventListener('click', clickHandler)
        wishlistNav.href = `./userPage.html?id=${loginInfo.user_id}`
        loginDialog.addEventListener('click', logout)
        // console.log(document.cookie)
        username.value = ""
        password.value = ""
        invalidLogin.innerText = ''
        if (window.location.pathname.includes('deal.html')) {
            const wishlistbutton = document.querySelector('.wishlist-button')
            wishlistbutton.classList.remove("hidden")
            const commentBox = document.querySelector('.comment-box')
            if (commentBox) {
                commentBox.classList.remove("hidden")
            }
            

        }
        dialog.close()
    } else {
        invalidLogin.innerText = 'Invalid Login'
    } 
    console.log("login button pushed")
    
  })



export function setupLogin() {
    loginDialog.addEventListener('click', clickHandler)
    wishlistNav.innerText = ''    
    loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    console.log('loginInfo', loginInfo)
    console.log(loginInfo.username)

    if (loginInfo.username != '') {
        wishlistNav.innerText = 'Wishlist'
        loginDialog.innerText = `${loginInfo.username} Logout`
        console.log('removed EL')
        loginDialog.removeEventListener('click', clickHandler)
        wishlistNav.href = `./userPage.html?id=${loginInfo.user_id}`
        loginDialog.addEventListener('click', logout)

    }
}



// function login() {

// }

export function logout() {
    localStorage.setItem('loginInfo',JSON.stringify({username:'',user_id:''}))
    loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    console.log(loginInfo.username, loginInfo.user_id)
    loginDialog.innerText = `Login`
    wishlistNav.innerText = ''
    loginDialog.addEventListener('click', clickHandler)
    if (window.location.pathname.includes('userPage.html')) {
        window.location.href = 'index.html'
    } else if (window.location.pathname.includes('deal.html')) {
        const wishlistbutton = document.querySelector('.wishlist-button')
        wishlistbutton.classList.add("hidden")
        const commentBox = document.querySelector('.comment-box')
        if (commentBox) {
            commentBox.classList.add("hidden")
        }
        

    }


}

// console.log()
const populateMain = async () => {
    // localStorage.setItem('loginInfo',JSON.stringify({username:'',user_id:''}))
    setupLogin()
    
    // localStorage.setItem('loginInfo',{username:'',user_id:''})
    dealsBody.replaceChildren()
    let deals = []
    while (true){
        try {
            deals = (await axios.get(`${base}/deals`)).data            
            break; 
        } catch (error) {
            console.log(`Retrying in 1 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
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

    dealsBody.addEventListener('click', (event) => {        
        const dealElement = event.target.closest('.item-holder')
        if(dealElement) {
            const dealId = dealElement.getAttribute('data-deal-id');
            
            console.log(`Deal ${dealId} clicked!`);

            const dealPageUrl = `deal.html?id=${dealId}`

            window.location.href = dealPageUrl

        }
    })

    // loginDialog.addEventListener('click', clickHandler)
}
      


if (window.location.pathname.includes('index.html')) {
    populateMain()
}



