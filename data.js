const myInput = document.getElementById("table-search");
const sheet = '1kIv3hL0onY_0gXjZfDFG7ug-zYj7nqH-xSQgo6fdBnM';
const base = `https://docs.google.com/spreadsheets/d/${sheet}/gviz/tq?`;
const sheetName = 'Sheet1'
let query;  
let search = '';

// const url = `${base}&sheet=${sheetName}&tq=${query}`;

const data = [];

const allData = () => {
    query = encodeURIComponent('SELECT * WHERE A <= 50');
    fetch(`${base}&sheet=${sheetName}&tq=${query}`)
    .then(res => res.text())
    .then(rep => {
        const jsdata = JSON.parse(rep.substring(47).slice(0,-2));
        const cols = [];

        jsdata.table.cols.forEach(element => {
            if(element.label){
                const title = element.label.toLowerCase();
                cols.push(title);
            }
        });
        jsdata.table.rows.forEach(element => {
            // console.log(element);
            const row = {};
            cols.forEach((e, i) => {
                //row[e] = properti
                //element.c = value
                row[e] = (element.c[i].v != null) ? element.c[i].v : '';
            })
            data.push(row);
        })
        renderTable(data);
    })

    const renderTable = (data) => {
        let table = '';
        data.forEach(item =>{
            table += `<tr id="row" class="bg-white lg:border-b border-b-2">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${item.no}
            </th>
            <td class="px-6 py-4 text-start">
                ${item.name}
            </td>
            <td class="px-6 py-4 text-center">
                ${item.points}
            </td>
        </tr>`
        })
        document.getElementById('table').innerHTML = table;
    }
}

const searchData = (search) => {
    let toUpper = search.toUpperCase();
    query = encodeURIComponent(`SELECT * WHERE UPPER(B) contains "${toUpper}"`);
    fetch(`${base}&sheet=${sheetName}&tq=${query}`)
    .then(res => res.text())
    .then(rep => {
        const jsdata = JSON.parse(rep.substring(47).slice(0,-2));
        const cols = [];

        jsdata.table.cols.forEach(element => {
            if(element.label){
                const title = element.label.toLowerCase();
                cols.push(title);
            }
        });
        jsdata.table.rows.forEach(element => {
            // console.log(element);
            const row = {};
            cols.forEach((e, i) => {
                //row[e] = properti
                //element.c = value
                row[e] = (element.c[i].v != null) ? element.c[i].v : '';
            })
            data.push(row);
        })
        renderTable(data);
    })
    const renderTable = (data) => {
        let table = '';
        data.forEach(item =>{
            table += `<tr id="row" class="bg-white row1 lg:border-b border-b-2">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${item.no}
            </th>
            <td class="px-6 py-4 text-start">
                ${item.name}
            </td>
            <td class="px-6 py-4 text-center">
                ${item.points}
            </td>
            </tr>`
        })
        document.getElementById('table').innerHTML = table;
    }
}

allData();

searchData();
function myFunction() {
    search = document.getElementById("table-search").value;
    if(!(search == null || search == '')){
        data.splice(0,data.length);
        searchData(search);
    } else{
        data.splice(0,data.length);
        allData();
    }
}
