outputDiv = document.querySelector('#output'); 
form = document.querySelector('#zipForm');
icoRmv = document.querySelector('.icon-remove');
icoChk = document.querySelector('.icon-check');
body = document.querySelector('body');
zip = document.querySelector('.zip');
form.addEventListener('submit', getLocInfo);
body.addEventListener('click', dltLoc);

function getLocInfo(e) {
    e.preventDefault();

    fetch(`http://api.zippopotam.us/NZ/${zip.value}`)
        .then(response => {
            if(response.status != 200) {
                showIco('.icon-remove');
                outputDiv.innerHTML = `
                <article class="message is-small is-danger">
                    <div class="message-header">
                        <p>Invalid Zipcode</p>
                        <button class="delete"></button>
                    </div>
                    <div class="message-body">Only New Zealand zipcodes are valid, please try again</div>
                </article>`
                throw Error(response.statusText);
            } else {
                showIco('.icon-check');
                return response.json();
            }
        })
        .then(data => {
            let output = '';
            data.places.forEach(place => {
                output += `<article class="message is-link">
                                <div class="message-header">
                                    <p>Location Info</p>
                                    <button class="delete" id="success"></button>
                                </div>
                                <div class="message-body">
                                    <ul>
                                        <li><strong>Area: </strong>${place['place name']}</li>
                                        <li><strong>latitude: </strong>${place['latitude']}</li>
                                        <li><strong>longitude: </strong>${place['longitude']}</li>
                                    </ul>
                                </div>
                            </article>`;
            });

            outputDiv.innerHTML = output;
        })
        .catch(er => console.log(er));
}

function showIco(ico) {
    icoChk.style.display = "none";
    icoRmv.style.display = "none";
    document.querySelector(ico).style.display = "inline-flex";
}

function dltLoc(e) {
    msg = document.querySelector('.message');

    if(e.target.className === 'delete') {
        zip.value = '';
        msg.remove();
        e.target.id == 'success' ? icoChk.style.display = "none" : icoRmv.style.display = "none";
    }
}
