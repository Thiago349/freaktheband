class RS_Event {
    constructor(event_about_text, guest_band_image, guest_band_text, guest_band_insta, guest_appearance_image, guest_appearance_text, guest_appearance_insta) {
        this.event_about_text = event_about_text
        this.guest_band_text = guest_band_text
        this.guest_band_image = guest_band_image
        this.guest_band_insta = guest_band_insta
        this.guest_appearance_text = guest_appearance_text
        this.guest_appearance_image = guest_appearance_image
        this.guest_appearance_insta = guest_appearance_insta
    }
}

function save_data_rocksession(data) {
    i=1;
    data.map((event) => {
        rs_events[i] = new RS_Event(event[1], event[2], event[3], event[4], event[5], event[6], event[7]);
        i+=1;
    }
    );
}

async function get_data_rocksession(url) {
    let response = await fetch(url);
    const data = await response.json();
    save_data_rocksession(data);
};

function changepageStyle(rs_number) {
    document.getElementById("RSinfos").style.backgroundColor = rs_colors[rs_number][0];
    elements_to_iterate = document.querySelectorAll('h2');
    for (let i = 0; i < elements_to_iterate.length; i+=1){
        elements_to_iterate[i].style.color = rs_colors[rs_number][1];
    }
}

function changeevent(elementid){
    rs_number = Number(elementid[3]);
    if (currentevent != "none"){
        document.getElementById(currentevent).style.borderColor = '#050a30';
    }
    document.getElementById(elementid).style.borderColor = '#e2e8f0';
    currentevent = elementid;

    document.getElementById('event-about-text').innerHTML = rs_events[rs_number].event_about_text;
    document.getElementById('guest-band-text').innerHTML = rs_events[rs_number].guest_band_text;
    document.getElementById('guest-band-image').src = "/static/images/" + String(rs_events[rs_number].guest_band_image) + ".png";
    document.getElementById('guest-band-insta').href = 'https://www.instagram.com/' + String(rs_events[rs_number].guest_band_insta);
    document.getElementById('guest-band-insta').style.display = 'inline';
    document.getElementById('guest-appearance-text').innerHTML = rs_events[rs_number].guest_appearance_text;
    document.getElementById('guest-appearance-image').src = "/static/images/" + String(rs_events[rs_number].guest_appearance_image) + ".png";
    document.getElementById('guest-appearance-insta').href = 'https://www.instagram.com/' + String(rs_events[rs_number].guest_appearance_insta);
    document.getElementById('guest-appearance-insta').style.display = 'inline';
    document.getElementById('rs-logo').src = "/static/images/SVG/RS0"+String(rs_number)+".svg";
    changepageStyle(rs_number);
}

rs_events = {}
rs_colors = {1: ['#F9E4BD', '#AB160B'], 2: ['#613285', '#25E781'], 3: ['#3C0A0A', '#FF1616']}
url = '/rocksessiondb';
currentevent = "none";
get_data_rocksession('/rocksessiondb');

