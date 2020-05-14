//Add user
function addUser() {
	debugger;
    var uName = document.getElementById("uname").value; 
    var psw = document.getElementById("psw").value;
    var gender = document.getElementById("gender").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var email = document.getElementById("email").value;
    var obj = {uname : uName, psw : psw, gender:gender, mobileNo:mobileNo, email:email};
    console.log(obj);
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4 && this.status === 201){ 
            console.log("response: "+this.response);
            alert("User Register Successfully!!!")
            window.location.assign("index.html#login");
        }
    }
    httpReq.open('post', 'http://localhost:3000/users', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}
//User Login
function userLogin(){
	 var uName = document.getElementById("uName").value; 
	 var password = document.getElementById("password").value;
	 debugger;
	 var httpReq;
	    if(window.XMLHttpRequest) {
	        httpReq = new XMLHttpRequest();
	    }else{
	        httpReq = new ActiveXObject("")
	    }
	    httpReq.onreadystatechange = function() {
	    	
	        //if(this.readyState ===4 && this.status === 200){ 
	            //console.log("response: "+this.response);
	            var data=JSON.parse(this.response);
	            console.log("data: "+data+" data.id: "+data.id);
	            debugger;
		    	var len=data.length;
		    	//alert("len: "+len);
		    	console.log("Length: "+len);
		    	if(len>0){
		    		sessionStorage.setItem("uname", uName);
		    		window.location.assign("product.html");
		    	}else{
		    		alert("Login Failed");
		    	}
	            
	        //}
	    }
	    var obj={uname:uName,psw:password};
	    console.log(obj);
	    httpReq.open('GET', 'http://localhost:3000/users?uname='+uName+'&psw='+password, true);
	    httpReq.send();
}

//All products
function getProducts(){
    var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {

            var tableEl = document.getElementsByTagName('table');
            if (tableEl[0] !== undefined) {
                tableEl[0].remove()
            }
            var table = document.createElement("table");

            var tbody = document.createElement("tbody");

            var thead = document.createElement("thead");

            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            var thName1 = document.createTextNode("product Name");
            td1.append(thName1);
            td1.style.border = "5px solid black";
            td1.style.backgroundColor = "1px solid grey";

            var td2 = document.createElement("td");
            var thMNo = document.createTextNode("Price");
            td2.append(thMNo);
            td2.style.border = "5px solid black";
            td2.style.backgroundColor = "1px solid grey";

            var td3 = document.createElement("td");
            var thSapId = document.createTextNode("Description");
            td3.append(thSapId);
            td3.style.border = "5px solid black";

            var td4 = document.createElement("td");
            var thEmail = document.createTextNode("Rating");
            td4.append(thEmail);
            td4.style.border = "5px solid black";


            var td5 = document.createElement("td");
            var thGender = document.createTextNode("Quantity");
            td5.append(thGender);
            td5.style.border = "5px solid black";

            var td7 = document.createElement("td");
            var action = document.createTextNode("Action");
            td7.append(action);
            td7.style.border = "5px solid black";

            /*var td6 = document.createElement("td");
            var thId = document.createTextNode("Id");
            td6.append(thId);
            td6.style.border = "5px solid black";*/

            table.style.border = "5px solid black";
           
            
          
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            //tr.append(td6);
            tr.append(td7);

            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);


            var data = JSON.parse(this.response);
            var length = data.length;
            if (length > 0) {
                for (var i = 0; i < length; i++) {

                    var tableBody = document.createElement("tr");
                   
                   /* var td1Body = document.createElement("td");
                    var textNode1 = document.createTextNode(data[i].id);
                    td1Body.append(textNode1);*/

                    var td2Body = document.createElement("td");
                    var textNode2 = document.createTextNode(data[i].pname);
                    td2Body.append(textNode2);

                    var td3Body = document.createElement("td");
                    var textNode3 = document.createTextNode(data[i].price);
                    td3Body.append(textNode3);

                    var td4Body = document.createElement("td");
                    var textNode4 = document.createTextNode(data[i].description);
                    td4Body.append(textNode4);

                    var td5Body = document.createElement("td");
                    var textNode5 = document.createTextNode(data[i].rating);
                    td5Body.append(textNode5);

                    var td6Body = document.createElement("td");
                    var textNode6 = document.createTextNode(data[i].quantity);
                    td6Body.append(textNode6);


                    var td7Body = document.createElement("td");
                    var addCartButton = document.createElement("button");
                    var addCartButtonTextNode = document.createTextNode("Add Cart");
                    addCartButton.appendChild(addCartButtonTextNode);
                    
                    addCartButton.addEventListener("click", function () {
                        var data = this.parentElement.parentElement.cells;
                        
                        var todayDate = new Date();
                        var dd = String(todayDate.getDate()).padStart(2, '0');
                        var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = todayDate.getFullYear();
                        todayDate = dd + '-' + mm + '-' + yyyy;
                        //Localstorage username
                        var uname=JSON.parse(JSON.stringify(sessionStorage.getItem("uname")));
                       
                        var obj = {pname: data[0].innerHTML, price: data[1].innerHTML, description: data[2].innerHTML, rating: data[3].innerHTML, quantity: data[4].innerHTML,date:todayDate,uname:uname }
                        var httpRequest;
                        if (window.XMLHttpRequest) {
                            httpRequest = new XMLHttpRequest()
                        } else {
                            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        httpRequest.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 201) {
                                alert("Cart Added successfully");
                            }
                        }
                        httpRequest.open("POST", "http://localhost:3000/carts", true);
                        httpRequest.setRequestHeader("Content-type", "application/json");
                        //httpRequest.send(obj);
                        httpRequest.send(JSON.stringify(obj));
                        
                    });
                    var orderButton = document.createElement("button");
                    var orderButtonTextNode = document.createTextNode("Order");
                    orderButton.appendChild(orderButtonTextNode);
                    orderButton.addEventListener("click", function () {
                        var data = this.parentElement.parentElement.cells;
                        //Localstorage username
                        var todayDate = new Date();
                        var dd = String(todayDate.getDate()).padStart(2, '0');
                        var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = todayDate.getFullYear();
                        todayDate = dd + '-' + mm + '-' + yyyy;
                        //Localstorage username
                        var uname=JSON.parse(JSON.stringify(sessionStorage.getItem("uname")));
                        var obj = {pname: data[0].innerHTML, price: data[1].innerHTML, description: data[2].innerHTML, rating: data[3].innerHTML, quantity: data[4].innerHTML,date:todayDate,uname:uname }
                        var httpRequest;
                        if (window.XMLHttpRequest) {
                            httpRequest = new XMLHttpRequest()
                        } else {
                            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        httpRequest.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 201) {
                                alert("Order Placed Successfully");
                            }
                        }
                        httpRequest.open("post", "http://localhost:3000/orders", true);
                        httpRequest.setRequestHeader("Content-type", "application/json");
                        httpRequest.send(JSON.stringify(obj));
                    })
                    td7Body.append(addCartButton);
                    td7Body.append(orderButton);

                    //td1Body.style.border = "1px solid black";
                    td2Body.style.border = "1px solid black";
                    td3Body.style.border = "1px solid black";
                    td4Body.style.border = "1px solid black";
                    td5Body.style.border = "1px solid black";
                    td6Body.style.border = "1px solid black";

                   // tableBody.append(td1Body);
                    tableBody.append(td2Body);
                    tableBody.append(td3Body);
                    tableBody.append(td4Body);
                    tableBody.append(td5Body);
                    tableBody.append(td6Body);
                    tableBody.append(td7Body);
                    tbody.append(tableBody);

                }

            } else {
                var h4data = document.createElement("h4");
                var childNode = document.createTextNode("No Data Available in Data base");
                h4data.appendChild(childNode);
                tbody.appendChild(h4data);
            }

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(table);


        }
    }

    httpRequest.open("get", "http://localhost:3000/products", true);
    httpRequest.send();
}

//Mycarts
function mycarts(){
	var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {

            var tableEl = document.getElementsByTagName('table');
            if (tableEl[0] !== undefined) {
                tableEl[0].remove()
            }
            var table = document.createElement("table");

            var tbody = document.createElement("tbody");

            var thead = document.createElement("thead");

            var tr = document.createElement("tr");

            var td2 = document.createElement("td");
            var thMNo = document.createTextNode("Product Name");
            td2.append(thMNo);
            td2.style.border = "5px solid black";
            td2.style.backgroundColor = "1px solid grey";

            var td3 = document.createElement("td");
            var thSapId = document.createTextNode("Price");
            td3.append(thSapId);
            td3.style.border = "5px solid black";

            var td4 = document.createElement("td");
            var thEmail = document.createTextNode("Description");
            td4.append(thEmail);
            td4.style.border = "5px solid black";


            var td5 = document.createElement("td");
            var thGender = document.createTextNode("Rating");
            td5.append(thGender);
            td5.style.border = "5px solid black";

            var td6 = document.createElement("td");
            var thId = document.createTextNode("PId");
            td6.append(thId);
            td6.style.border = "5px solid black";

            var td7 = document.createElement("td");
            var thQuantity = document.createTextNode("Quantity");
            td7.append(thQuantity);
            td7.style.border = "5px solid black";

            var td8 = document.createElement("td");
            var thAction= document.createTextNode("Action");
            td8.append(thAction);
            td8.style.border = "5px solid black";

            table.style.border = "5px solid black";
           
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
            tr.append(td7);
            tr.append(td8);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);


            var data = JSON.parse(this.response);
            var length = data.length;
            if (length > 0) {
                for (var i = 0; i < length; i++) {

                    var tableBody = document.createElement("tr");
                   
                    var td2Body = document.createElement("td");
                    var textNode2 = document.createTextNode(data[i].pname);
                    td2Body.append(textNode2);

                    var td3Body = document.createElement("td");
                    var textNode3 = document.createTextNode(data[i].price);
                    td3Body.append(textNode3);

                    var td4Body = document.createElement("td");
                    var textNode4 = document.createTextNode(data[i].description);
                    td4Body.append(textNode4);

                    var td5Body = document.createElement("td");
                    var textNode5 = document.createTextNode(data[i].rating);
                    td5Body.append(textNode5);

                    var td6Body = document.createElement("td");
                    var textNode6 = document.createTextNode(data[i].pid);
                    td6Body.append(textNode6);

                    var td7Body = document.createElement("td");
                    var textNode7 = document.createTextNode(data[i].quantity);
                    td7Body.append(textNode7);
                    

                    var td8Body = document.createElement("td");
                    var orderButton = document.createElement("button");
                    var orderTextNode = document.createTextNode("Order Item");
                    orderButton.appendChild(orderTextNode);
                    orderButton.addEventListener("click", function () {
                        var data = this.parentElement.parentElement.cells;
                        var obj = { pid: data[0].innerHTML, pname: data[1].innerHTML, price: data[2].innerHTML, description: data[3].innerHTML, rating: data[4].innerHTML, quantity: data[5].innerHTML ,date: data[5].innerHTML,uname: data[5].innerHTML}
                        localStorage.setItem("orderItem", JSON.stringify(obj));
                        myOrders();
                        //deleteCart();
                        myOrderList();
                        //window.location.assign("orderitemcartlist.html");

                        
                    });
                   // orderButton.appendChild(orderButtonTextNode);
                   td8Body.append(orderButton);

                   // td1Body.style.border = "1px solid black";
                    td2Body.style.border = "1px solid black";
                    td3Body.style.border = "1px solid black";
                    td4Body.style.border = "1px solid black";
                    td5Body.style.border = "1px solid black";
                    td6Body.style.border = "1px solid black";
                    td7Body.style.border = "1px solid black";
                    td8Body.style.border = "1px solid black";

                   // tableBody.append(td1Body);
                    tableBody.append(td2Body);
                    tableBody.append(td3Body);
                    tableBody.append(td4Body);
                    tableBody.append(td5Body);
                    tableBody.append(td6Body);
                    tableBody.append(td7Body);
                    tableBody.append(td8Body);
                    tbody.append(tableBody);

                }

            } else {
                var h4data = document.createElement("h4");
                var childNode = document.createTextNode("No Data Available in Data base");
                h4data.appendChild(childNode);
                tbody.appendChild(h4data);
            }

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(table);


        }

    }
    var uname= sessionStorage.getItem("uname");
    var url="http://localhost:3000/carts?uname="+uname;
    console.log(url);
    //httpRequest.open("get", "http://localhost:3000/cart", true);
    httpRequest.open("get", url, true);
    httpRequest.send();

	
}

//My Order List

function myOrderList(){
	 var httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4 && this.status == 200) {

	            var tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] !== undefined) {
	                tableEl[0].remove()
	            }
	            var table = document.createElement("table");

	            var tbody = document.createElement("tbody");

	            var thead = document.createElement("thead");

	            var tr = document.createElement("tr");

	           /* var td1 = document.createElement("td");
	            var thName1 = document.createTextNode("Id");
	            td1.append(thName1);
	            td1.style.border = "5px solid black";
	            td1.style.backgroundColor = "1px solid grey";*/

	            

	            var td2 = document.createElement("td");
	            var thMNo = document.createTextNode("Product Name");
	            td2.append(thMNo);
	            td2.style.border = "5px solid black";
	            td2.style.backgroundColor = "1px solid grey";

	            var td3 = document.createElement("td");
	            var thSapId = document.createTextNode("Price");
	            td3.append(thSapId);
	            td3.style.border = "5px solid black";

	            var td4 = document.createElement("td");
	            var thEmail = document.createTextNode("Description");
	            td4.append(thEmail);
	            td4.style.border = "5px solid black";


	            var td5 = document.createElement("td");
	            var thGender = document.createTextNode("Rating");
	            td5.append(thGender);
	            td5.style.border = "5px solid black";

	            var td6 = document.createElement("td");
	            var thId = document.createTextNode("PId");
	            td6.append(thId);
	            td6.style.border = "5px solid black";

	            var td7 = document.createElement("td");
	            var thQuantity = document.createTextNode("Quantity");
	            td7.append(thQuantity);
	            td7.style.border = "5px solid black";

	            var td8 = document.createElement("td");
	            var thAmount = document.createTextNode("Amount");
	            td8.append(thAmount);
	            td8.style.border = "5px solid black";

	            table.style.border = "5px solid black";
	           
	            
	          
	           // tr.append(td1);
	            tr.append(td2);
	            tr.append(td3);
	            tr.append(td4);
	            tr.append(td5);
	            tr.append(td6);
	            tr.append(td7);
	            tr.append(td8);

	            thead.appendChild(tr);
	            table.appendChild(thead);
	            table.appendChild(tbody);

	            var data = JSON.parse(this.response);
	            var length = data.length;
	            if (length > 0) {
	                for (var i = 0; i < length; i++) {

	                    var tableBody = document.createElement("tr");
	                   
	                    var td1Body = document.createElement("td");
	                    var textNode1 = document.createTextNode(data[i].id);
	                    td1Body.append(textNode1);

	                    var td2Body = document.createElement("td");
	                    var textNode2 = document.createTextNode(data[i].pname);
	                    td2Body.append(textNode2);

	                    var td3Body = document.createElement("td");
	                    var textNode3 = document.createTextNode(data[i].price);
	                    td3Body.append(textNode3);

	                    var td4Body = document.createElement("td");
	                    var textNode4 = document.createTextNode(data[i].description);
	                    td4Body.append(textNode4);

	                    var td5Body = document.createElement("td");
	                    var textNode5 = document.createTextNode(data[i].rating);
	                    td5Body.append(textNode5);

	                    var td6Body = document.createElement("td");
	                    var textNode6 = document.createTextNode(data[i].pid);
	                    td6Body.append(textNode6);

	                    var td7Body = document.createElement("td");
	                    var textNode7 = document.createTextNode(data[i].quantity);
	                    td7Body.append(textNode7);

	                    var td8Body = document.createElement("td");
	                    var textNode8 = document.createTextNode(data[i].amount);
	                    td8Body.append(textNode8);


	                   
	                   // orderButton.appendChild(orderButtonTextNode);
	                    

	                    td1Body.style.border = "1px solid black";
	                    td2Body.style.border = "1px solid black";
	                    td3Body.style.border = "1px solid black";
	                    td4Body.style.border = "1px solid black";
	                    td5Body.style.border = "1px solid black";
	                    td6Body.style.border = "1px solid black";
	                    td7Body.style.border = "1px solid black";
	                    td8Body.style.border = "1px solid black";

	                    tableBody.append(td1Body);
	                    tableBody.append(td2Body);
	                    tableBody.append(td3Body);
	                    tableBody.append(td4Body);
	                    tableBody.append(td5Body);
	                    tableBody.append(td6Body);
	                    tableBody.append(td7Body);
	                    tableBody.append(td8Body);
	                    tbody.append(tableBody);

	                }

	            } else {
	                var h4data = document.createElement("h4");
	                var childNode = document.createTextNode("No Data Available in Data base");
	                h4data.appendChild(childNode);
	                tbody.appendChild(h4data);
	            }

	            var body = document.getElementsByTagName('body')[0];
	            body.appendChild(table);


	        }

	    }
	   var uname= sessionStorage.getItem("email");
	   var url="http://localhost:3000/orders?uname="+uname;
	   console.log(url);
	   // httpRequest.open("get", "http://localhost:3000/orders", true);
	   httpRequest.open("get", url, true);
	    httpRequest.send();
}




//myOrders
function myOrders(){
	var data = JSON.parse(localStorage.getItem("orderItem"));
    document.getElementById("pname").value = data.pname;
    document.getElementById("price").value = data.price;
    document.getElementById("description").value = data.description;
    document.getElementById("rating").value = data.rating;
    document.getElementById("quantity").value = data.quantity;
    document.getElementById("uname").value = data.uname;
	
	//var pid = document.getElementById("pid").value;
    var pname = document.getElementById("pname").value;
    var price = document.getElementById("price").value;;
    var description = document.getElementById("description").value;
    var rating = document.getElementById("rating").value;
    var quantity = document.getElementById("quantity").value;
    var date = document.getElementById("date").value;
    var amount= price*quantity;
    var uname = document.getElementById("uname").value;
    var obj = {pname: pname, price: amount, description: description, rating: rating, quantity: quantity ,date: date,uname: uname};
	
	var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert("Order Item successfully");
            history.back();
            //getData();

        }
    }
    httpRequest.open("post", "http://localhost:3000/orders", true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(obj));
	
	
	
	
}


function deleteCart(){
	var data=this.parentElement.parentElement.cells;
	var xmlhttp;
	if(window.XMLHttpRequest){
	xmlhttp=new XMLHttpRequest();
	}
	xmlhttp.onreadystatechange= function(){
		if(this.status === 200 && this.readyState===4){
			alert(" Cart Deleted Successfully");
			getData();
			
		}
	}
	xmlhttp.open("DELETE", "http://localhost:3000/carts/"+data[0].innerHTML, true);
	xmlhttp.setRequestHeader('Content-type','application/json');
	xmlhttp.send(null);
}








