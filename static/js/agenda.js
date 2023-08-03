function buttbackcolor(element)
{
    if (!document.getElementById(element).classList.contains('notcurrent')){
        if (selectedday != ""){
            if (selectedday==element){
                document.getElementById(selectedday).style.border = '';
                selectedday = "";
                document.getElementById("cdtitle").innerHTML = 'Selecione um dia';
                document.getElementById("eventname").style.display = "none"
                document.getElementById("eventdescription").style.display = "none"
            }
            else {
                document.getElementById(selectedday).style.border = '';
                selectedday = element;
                document.getElementById(element).style.border = 'solid' + '#0000ff';
                dayselected(element, '#0000ff');
            }
            
        }
        else{
            selectedday = element;
            document.getElementById(selectedday).style.border = '';
            dayselected(element, '#0000ff');
        }
    }
}

function dayselected(element, color){
    daynumber = document.getElementById(element).innerHTML;
    document.getElementById(element).style.border = 'solid' + color;
    document.getElementById("cdtitle").innerHTML = "Dia " + daynumber
    if (document.getElementById(element).classList.contains('current') == false){
        document.getElementById("eventname").innerHTML = datamonth[daynumber][0];
        document.getElementById("eventname").style.display = "inline"
        document.getElementById("eventdescription").innerHTML = datamonth[daynumber][1];
        document.getElementById("eventdescription").style.display = "inline"
    }
    else{
        document.getElementById("eventname").innerHTML = "Data disponível";
        document.getElementById("eventname").style.display = "inline"
        document.getElementById("eventdescription").innerHTML = "Contacte a banda caso tenha interesse em nos contratar.";
        document.getElementById("eventdescription").style.display = "inline"
    }
}

function changemonth(element){
    current_year = Number(document.getElementById("calendaryear").innerHTML);
    document.getElementById("eventname").style.display = "none";
    document.getElementById("eventdescription").style.display = "none";
    if(element != "currmonth"){
        if (selectedday != ""){
            document.getElementById(selectedday).style.border = '';
            selectedday = "";
        }
        if (element == "prevmonth"){
            if (document.getElementById("calendartitle").innerHTML != months[current_year][0][0]) {
                for(itens in months[current_year]){
                    if(document.getElementById("calendartitle").innerHTML == months[current_year][itens][0]){
                        document.getElementById("calendartitle").innerHTML = months[current_year][itens-1][0];
                        break;
                    }
                }
            }
            else {
                if (current_year - 1 in months){
                    current_year = current_year - 1;
                    document.getElementById("calendaryear").innerHTML = current_year;
                    document.getElementById("calendartitle").innerHTML = months[current_year][11][0];
                }
                else {
                    return;
                }
            }
        }
        else if (element == "nextmonth"){
            if (document.getElementById("calendartitle").innerHTML != months[current_year][11][0]) {
                for(itens in months[current_year]){
                    if(document.getElementById("calendartitle").innerHTML == months[current_year][itens][0]){
                        document.getElementById("calendartitle").innerHTML = months[current_year][parseInt(itens)+1][0];
                        selectedday = "";
                        break;
                    }
                }
            }
            else {
                if (current_year + 1 in months){
                    current_year = current_year + 1;
                    document.getElementById("calendaryear").innerHTML = current_year;
                    document.getElementById("calendartitle").innerHTML = months[current_year][0][0];
                }
                else {
                    return;
                }
            }
        }
        else if (element == "prevyear"){
            if (current_year - 1 in months){
                current_year = current_year - 1;
                document.getElementById("calendaryear").innerHTML = current_year;
            }
            else {
                return;
            }    
        }
        else if (element == "nextyear"){
            if (current_year + 1 in months){
                current_year = current_year + 1;
                document.getElementById("calendaryear").innerHTML = current_year;
            }
            else {
                return;
            }
        }
    }
    att();
    datamonth = {};
    get_data_month('/agendadb/'+document.getElementById("calendartitle").innerHTML+'&'+current_year);
}

function att(){
    var idday = '';
    var htmlday = '';
    for(itens in months[2023]){
        if(document.getElementById("calendartitle").innerHTML == months[2023][itens][0]){
            for(var i=1; i < 43; i+=1){
                idday = String(i)+"day";
                document.getElementById("cdtitle").innerHTML = 'Selecione um dia';
                if(i<months[2023][itens][2]){
                    if(itens==0){
                        htmlday = months[2023][11][1];
                    }
                    else{
                        htmlday = months[2023][itens-1][1];
                    }
                    document.getElementById(idday).classList = '';
                    document.getElementById(idday).classList.add('notcurrent');
                    htmlday = htmlday - months[2023][itens][2] + i + 1;
                    document.getElementById(idday).innerHTML = htmlday;
                }
                else if(i<(months[2023][itens][1]+months[2023][itens][2])){
                    document.getElementById(idday).classList = '';
                    document.getElementById(idday).classList.add('current');
                    htmlday = i-months[2023][itens][2]+1;
                    document.getElementById(idday).innerHTML = htmlday;
                }
                else{
                    htmlday = i-months[2023][itens][2]-months[2023][itens][1]+1;
                    document.getElementById(idday).classList = '';
                    document.getElementById(idday).classList.add('notcurrent');
                    document.getElementById(idday).innerHTML = htmlday;
                }
            }
            break;
        }
    }
}

function set_dayclasses(data) {

    data.map((event) => {
        datamonth[event[5]] = [event[1], event[3]];
        calendarmonth = document.getElementById("calendartitle").innerHTML
        if (event[6]==calendarmonth){
            eventday = event[5]
            for(var i = 0; i < 12; i++){
                if (calendarmonth==months[2023][i][0]){
                    idday = String(months[2023][i][2] - 1 + eventday) + "day"
                    break;
                }
            }
            calendarday = document.getElementById(idday).innerHTML;
            if (calendarday==event[5] && document.getElementById(idday).classList.contains("notcurrent") != true){
                document.getElementById(idday).classList = '';
                document.getElementById(idday).classList.add(String(event[2]));
            }
        }
    }
    );
}

async function get_data_month(url) {
    let response = await fetch(url);
    const data = await response.json();
    set_dayclasses(data);
};

var months = {2023: [["Janeiro", 31, 2], ["Fevereiro", 28, 4], ["Março", 31, 4], ["Abril", 30, 7], ["Maio", 31, 2], ["Junho", 30, 5], ["Julho", 31, 7], ["Agosto", 31, 3], ["Setembro", 30, 6], ["Outubro", 31, 1], ["Novembro", 30, 4], ["Dezembro", 31, 6]],
            2024: [["Janeiro", 31, 1], ["Fevereiro", 29, 5], ["Março", 31, 6], ["Abril", 30, 2], ["Maio", 31, 4], ["Junho", 30, 7], ["Julho", 31, 2], ["Agosto", 31, 5], ["Setembro", 30, 1], ["Outubro", 31, 3], ["Novembro", 30, 6], ["Dezembro", 31, 1]]};


var current_year = "";
var selectedday = "";
var selectedday_bg_color = "";
var datamonth = {};
