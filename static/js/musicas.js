function changeimg(imgpath, elementid)
{
    document.getElementById("music-chosen-img").src = '/static/'+imgpath
    document.getElementById(currentmusic).style.borderColor = '#050a30'
    document.getElementById(currentmusic).style.backgroundColor = 'transparent'
    document.getElementById(elementid).style.borderColor = '#CAE8FF'
    document.getElementById(elementid).style.backgroundColor = '#050a30'
    currentmusic = elementid
}

var currentmusic = "lillithbtn"
