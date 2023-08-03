function delete_data(idtodelete){
    if (confirm("Deseja mesmo prosseguir com a ação '" +idtodelete.classList.value+ "'?")==true){
        const hidden_form = document.createElement('form');
        hidden_form.method = 'POST';
        hidden_form.action = '/dbdelete';
        const id_input = document.createElement('input');
        id_input.type = 'hidden';
        id_input.name = 'id';
        id_input.value = idtodelete.parentNode.id;
        hidden_form.appendChild(id_input);
        const table_input = document.createElement('input');
        table_input.type = 'hidden';
        table_input.name = 'table';
        table_input.value = table;
        hidden_form.appendChild(table_input);
        const action_input = document.createElement('input');
        action_input.type = 'hidden';
        action_input.name = 'action';
        action_input.value = idtodelete.classList.value;
        hidden_form.appendChild(action_input);
        document.body.appendChild(hidden_form);
        hidden_form.submit();
    }
    else {
        alert("Cancelado!");
    }
}

function table_att(data){
    var i = 0;
    document.getElementById("db-table").innerHTML = "";
    data.map((column) => {
        i += 1;
        document.getElementById("db-table").innerHTML += "<tr id='"+column[0]+"'></tr>";
        column.map((row) => {
            document.getElementById(column[0]).innerHTML += "<td>"+row+"</td>";
        }
        );
        document.getElementById(column[0]).innerHTML += "<td onclick='delete_data(this)' class='delete' id='delete"+column[0]+"'></td>"
        document.getElementById('delete'+column[0]).innerHTML += "<img src='static/images/SVG/delete.svg'>"
    }
    );
}

function changeform(formtype){
    if(formtype=='rocksession'){
        document.getElementById("divname").style.display = 'none';
        document.getElementById("divdescription").style.display = 'flex';
        document.getElementById("divdate").style.display = 'none';
        document.getElementById("divtag").style.display = 'none';
        document.getElementById("divguest").style.display = 'flex';
        document.getElementById("db-data").style.display = 'flex';
        document.getElementById("divedition").style.display = 'flex';
        get_db_data('/rocksessiondb');
        table = formtype;
    }
    else if(formtype=='events'){
        document.getElementById("divname").style.display = 'flex';
        document.getElementById("divdescription").style.display = 'flex';
        document.getElementById("divdate").style.display = 'flex';
        document.getElementById("divtag").style.display = 'flex';
        document.getElementById("divguest").style.display = 'none';
        document.getElementById("db-data").style.display = 'flex';
        document.getElementById("divedition").style.display = 'none';
        get_db_data('/agendadb/every');
        table = formtype;
    }
    else if(formtype=='news'){
        document.getElementById("divname").style.display = 'flex';
        document.getElementById("divdescription").style.display = 'flex';
        document.getElementById("divdate").style.display = 'none';
        document.getElementById("divtag").style.display = 'none';
        document.getElementById("divguest").style.display = 'none';
        document.getElementById("db-data").style.display = 'flex';
        document.getElementById("divedition").style.display = 'none';
        get_db_data('/news');
        table = formtype;
    }
}

async function get_db_data(url) {
    let response = await fetch(url);
    const data = await response.json();
    table_att(data);
};

table = '';
