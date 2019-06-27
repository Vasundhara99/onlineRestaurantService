  var data=[
  {
    "items":[
    ],
    tot:0
  },
  {
    "items":[
    ],
    tot:0
  },
  {
    "items":[
    ],
    tot:0
  }
]
localStorage.setItem('infoJSON',JSON.stringify(data));
var info=JSON.parse(localStorage.getItem('infoJSON')) || [];
var tableNo;
var item1,price1,Range;
function myTablesSearchFunc()
{
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myTableSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myTables");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++)
   {
    var a = li[i].getElementsByTagName("div")[0];
    var txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1)
    {
    li[i].style.display = "";
    }
    else
    {
      li[i].style.display = "none";
    }
  }
}
function myMenuSearchFunc()
{
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myMenuSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++)
   {
    var txtValue = li[i].id;
    if (txtValue.toUpperCase().indexOf(filter) > -1)
    {
      li[i].style.display = "";
    }
    else
    {
      li[i].style.display = "none";
    }
   }
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("price", ev.target.textContent);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var price=ev.dataTransfer.getData("price");
  price=price.split(" ");
  price=price[price.length-1];
  var id=ev.target.id;
  if(id==="Table1")
  addItems(0,data,price);
  else if(id==="Table2")
  addItems(1,data,price);
  else if(id==="Table3")
  addItems(2,data,price);
}
function addItems(tableno,data,price)
{
  info[tableno].tot=parseInt(info[tableno].tot)+parseInt(price);
  var temp=new Object();
  temp["item"]=data;
  temp["price"]=price;
  var totalItems=0,flag=-1;
  for(var i=0;i<info[tableno].items.length;i++)
  {
    if(info[tableno].items[i].item===data)
    {
    info[tableno].items[i].numberOfItems+=1;
    flag=0;
    }
  }
  if(flag==-1)
  {
  temp["numberOfItems"]=1;
  info[tableno].items.push(temp);
  }
   display(tableno);
}
function display(table)
{
var totalItems=0,total=0;

   for(var i=0;i<info[table].items.length;i++)
    {
      if(info[table].items[i].item!="" && info[table].items[i].price!=0)
      {
      totalItems+=info[table].items[i].numberOfItems;
      total+=info[table].items[i].numberOfItems*info[table].items[i].price;
      }
    }
document.getElementById("p"+table).innerText="Rs:"+total+"  Total items:"+totalItems;

}
function showPopUp(id)
{
  if(id==="Table1")
  tableNo=0;
  else if(id==="Table2")
  tableNo=1;
  else
  tableNo=2;
  var table=document.createElement('table');
  table.border="0";
  var row,cell;
  row=table.insertRow(-1);
  var closePopUp=document.createElement('input')
  closePopUp.id=tableNo;
  closePopUp.type="button";
  closePopUp.setAttribute("onclick","closePopUp(tableNo)");
  closePopUp.value="back";
  closePopUp.name="closePopUp";
  row.appendChild(closePopUp)
  row=table.insertRow(-1);
  cell=row.insertCell(-1);
  cell.innerHTML="Items"
  cell=row.insertCell(-1);
  cell.innerHTML="Price"
  cell=row.insertCell(-1);
  cell.innerHTML="Add"
  for(var i=0;i<info[tableNo].items.length;i++)
  {
    if(info[tableNo].items[i].item!="" && info[tableNo].items[i].price!=0)
    {
      row=table.insertRow(-1);
      cell=row.insertCell(-1);
      cell.innerHTML=info[tableNo].items[i].item;
      item1=info[tableNo].items[i].item;
      row.appendChild(cell);
      cell=row.insertCell(-1);
      cell.innerHTML=info[tableNo].items[i].price;
      price1=info[tableNo].items[i].price;
      row.appendChild(cell);
      Range="Range"
      var inputRange=document.createElement('input');
      inputRange.id="Range";
      inputRange.type="number";
      inputRange.min="1";
      inputRange.max="5";
      inputRange.value=info[tableNo].items[i].numberOfItems;
      inputRange.setAttribute("onChange","addItems(tableNo,item1,price1)")
      row.appendChild(inputRange);
      var deleteItem=document.createElement('input');
      deleteItem.id="Delete";
      deleteItem.type="button";
      deleteItem.value="delete";
      deleteItem.setAttribute("onclick","DeleteItem(tableNo,item1,Delete)")
      row.appendChild(deleteItem);
     }
  }
        var d=document.getElementById("myPopUp");
        var input=document.createElement('input');
        input.id=tableNo;
        input.type="button";
        input.setAttribute("onclick","closeSession(tableNo)");
        input.value="close";
        input.name="close";
        d.innerHTML="";
        d.appendChild(table);
        d.appendChild(input);
        d.style.visibility="visible";
        d.style.display="block";
}
function closeSession(id)
{
    for(var i=0;i<info[id].items.length;i++)
    {
      info[id].items[i].item="";
      info[id].items[i].price=0;
    }
    info[id].tot=0;
    document.getElementById("p"+id).innerText="Rs:0  Total items:0";
    document.getElementById("myPopUp").style.visibility="hidden"
}
function closePopUp(table)
{
 document.getElementById("myPopUp").style.visibility="hidden"
}
function DeleteItem(table,item,id)
{
  for(var i=0;i<info[table].items.length;i++)
    {
      if(info[table].items[i].item===item)
      {
        info[table].items[i].item="";
        info[table].items[i].price=0;
        info[table].items[i].numberOfItems=0;
      }
    }
  display(table);
  table=table+1;
  showPopUp("Table"+table)
}