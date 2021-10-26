const gallerySection = document.querySelector('.gallery')
gallerySection.innerHTML =''
//API section
try{
    fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        let allData = data.results;
        //create user profiles (12 in total)
        newPersonCard(allData)
        //event listener function
        showModal(allData)
})
}catch(error){
    throw error
}

function showModal(data){
    //use a for loop to iterate through all profiles
    for (let i =0; i < data.length; i++){
        allCards = document.querySelectorAll('.card')
        //add innerHTML content based on profile index
        allCards[i].addEventListener('click', (e) =>{
                    let index=e.currentTarget.id
                    var dateParts =data[index].dob.date.split('-');
                    var year =dateParts[0]
                    var month =dateParts[1]
                    var date = dateParts[2].split('T')[0]
                    gallerySection.insertAdjacentHTML('beforeend', `
                    <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
                            <p class="modal-text">${data[index].email}</p>
                            <p class="modal-text cap">${data[index].location.city},${data[index].location.state}</p>
                            <hr>
                            <p class="modal-text">${data[index].cell}</p>
                            <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].location.state},${data[index].location.postcode}</p>
                            <p class="modal-text">Birthday: ${month}/${date}/${year}</p>
                        </div>
                    </div>
                    `)
                    //"location":{"street":{"number":4722,"name":"Aleksanterinkatu"},"city":"Sipoo","state":"Northern Savonia","country":"Finland","postcode":76984
                    //eventlistener for clicking the cross button and closing the modal
                    document.querySelector('.modal-close-btn').addEventListener('click',()=>{
                        gallerySection.removeChild(document.querySelector('.modal-container'))
                    })  
            })
            }
    }

function newPersonCard(data){
    //iterate through all 12 profiles
    for (let i =0; i < data.length; i++){
        gallerySection.innerHTML+=`
        <div class="card" id="${i}">
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">
                  ${data[i].name.first} 
                  ${data[i].name.last}
                </h3>
                <p class="card-text">
                  ${data[i].email}
                </p>
                <p class="card-text cap">
                  ${data[i].location.city},
                  ${data[i].location.state}
                </p>
            </div>
        </div>
        `
    }

}
