const search = document.getElementById('search');
const matchList  = document.getElementById('match-list');
const matchListAlbum  = document.getElementById('match-list-album');


const url = 'http://localhost:3000/';

let data = [];

const getData  = async url => {

    const res = await fetch (url);

    data = await res.json();

    search.disabled = false;

    albumPage();
}


getData(url)

const searchMusic =  searchText => {

    const musics = Object.entries(data.cueData);
    
    const albums = Object.entries(data.alben);

    const regex = new RegExp(`^${searchText}`,'gi');


    let albumMatches = albums.filter(cueData => {
        return cueData[1].albumName.match(regex);
    });
    
    let matches = musics.filter(cueData => {
        return cueData[1].cueName.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        albumMatches = [];
    }
    
    outPutHtml (matches);
    outPutHtmlAlbum(albumMatches);
}

const outPutHtml = matches => {
    if(matches.length > 0){
        const html = matches.map (
            match => `
            <div class="row">
            <div class="column">
            <div class="card">
                <h4 style="color:white;">Song: ${match[1].cueName} &nbsp  &nbsp Album: ${match[1].albumName} &nbsp &nbsp Instruments: ${match[1].cueInstruments} </h4>
                <audio id="audio-${match[1].cueID}">
                            <source src="${match[1].cuePreviewURL}" type="audio/mpeg">
                        </audio>
                        <button onclick="audioButton('audio-${match[1].cueID}')"
                    type="button" class="button-audio">Play Audio</button>
            </div>
            </div>
            </div>
                `).join('');
            matchList.innerHTML = html;
    }
    if(matches.length == 0){
        matchList.innerHTML = '';
    }
};

const outPutHtmlAlbum = albumMatches => {
    if(albumMatches.length > 0 ){
        const albumHtml = albumMatches.map (
            albumMatch => `
            <div class="row">
            <div class="column">
            <div class="card">
                <h4 style="color:white;">Album: ${albumMatch[1].albumName} </h4>
            </div>
            </div>
            </div>
            `
        ).join('');
        matchListAlbum.innerHTML = albumHtml;
    }
    if(albumMatches.length == 0){
        matchListAlbum.innerHTML = '';
    }
}


const playAudio = audio => {
    let allAudio = document.getElementsByTagName('audio');

    Array.prototype.forEach.call(allAudio, item => {
        if(!item.paused) item.pause();
    });
    
    audio.play();
}

const audioButton = audioElemen => {
    let audio = document.getElementById(audioElemen);

    if(audio.paused) {
        playAudio(audio);
    } else {
        audio.pause();
    }
}


search.addEventListener('input',() => searchMusic(search.value))

function albumPage() {

    for (let i = 0; i <= 24; i++) {

        let object = Object.values(data.alben)
        let cue =  Object.values(data.cueData)
        
        console.log(cue)
        
        var div = document.createElement("div");
        var img = document.createElement("img");

        div.setAttribute('class','diviko');
        img.src = object[i].albumCoverSmall;
        var src = document.getElementById("box");

        img.setAttribute('id',"img")

        img.setAttribute('class',"img");

        div.appendChild(img)

        src.appendChild(div);

    }
}

