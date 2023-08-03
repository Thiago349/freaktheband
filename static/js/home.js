async function get_recent_news() {
    let response = await fetch("/news");
    const data = await response.json();
    set_recent_news(data);
};

function set_recent_news(data) {
    data.map((news) => {
        document.getElementById("recent-news").innerHTML += '<div id="'+news[0]+'" class="news-item"></div>';
        document.getElementById(news[0]).innerHTML += '<h3>' + news[1] + '</h3>';
        document.getElementById(news[0]).innerHTML += '<p>' + news[2] + '</p>';
    }
    );
}