//Add user-User able to register using this function
addUser=()=> {
	debugger;
    let uName = document.getElementById("uname").value; 
    let psw = document.getElementById("psw").value;
    let gender = document.getElementById("gender").value;
    let mobileNo = document.getElementById("mobileNo").value;
    let email = document.getElementById("email").value;
    //let obj = {uname : uName, psw : psw, gender:gender, mobileNo:mobileNo, email:email};
    let obj = {	uName, psw, gender, mobileNo, email };
    console.log(obj);
    let httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
    	httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpReq.onreadystatechange = function() {
        if(this.readyState ===4){ // && this.status === 201
        	if (this.status != 201) {
                reject("User Registration Failed! Status Code: " + this.status)
            } else {
            console.log("response: "+this.response);
            alert("User Register Successfully!!!")
            window.location.assign("index.html");
            }
        }
    }
    httpReq.open('post', 'http://localhost:3000/users', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
    });
}
//User Login: whose register customer can able to login here
userLogin=()=>{
	let uName = document.getElementById("uName").value; 
	let password = document.getElementById("password").value;
	 debugger;
	 let httpReq;
	    if(window.XMLHttpRequest) {
	        httpReq = new XMLHttpRequest();
	    }else{
	    	httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    return new Promise(function (resolve, reject) {//promise open 
	    httpReq.onreadystatechange = function() {
	        //if(this.readyState ===4 && this.status === 200){ 
	        	if(this.readyState ===4){
	        		if (this.status != 200) {
	                    reject("Login Failed! Status Code: " + this.status)
	                } else {
	            let data=JSON.parse(JSON.stringify(this.response));
	            console.log("data: "+data);
	            debugger;
		    	let len=data.length;
		    	console.log("Length: "+len);
		    	if(len>0){
		    		sessionStorage.setItem("uname", uName);
		    		window.location.assign("product.html");
		    	}else{
		    		alert("Login Failed");
		    	}
	           }
	        }
	    }
	    //var obj={uname:uName,psw:password};
	    var obj={uName,password};
	    console.log(obj);
	    //const url='http://localhost:3000/users?uname='+uName+'&psw='+password	
	    
	    const url = `http://localhost:3000/users?uname=${uName}&psw=${password}`;
	    httpReq.open('GET',url , true);
	    httpReq.send();
	    });//promise close
}

//All products: After customer login his able to see the products with help of getProducts()=()=>{} arraw function
 getProducts=()=>{
	let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpRequest.onreadystatechange = function () {
    	if (this.readyState === 4) {
            if (this.status != 200) {
                reject("Product List Not found! Error Response: " + this.status)
            } else {
            let tableEl = document.getElementsByTagName('table');
            if (tableEl[0] !== undefined) {
                tableEl[0].remove()
            }
            let table = document.createElement("table");
            table.setAttribute("id","tab01");
            let tbody = document.createElement("tbody");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let thName1 = document.createTextNode("product Name");
            td1.append(thName1);

            let td2 = document.createElement("td");
            let thMNo = document.createTextNode("Price");
            td2.append(thMNo);

            let td3 = document.createElement("td");
            let thSapId = document.createTextNode("Description");
            td3.append(thSapId);

            let td4 = document.createElement("td");
            let thEmail = document.createTextNode("Rating");
            td4.append(thEmail);

            let td5 = document.createElement("td");
            let thGender = document.createTextNode("Quantity");
            td5.append(thGender);

            let td7 = document.createElement("td");
            let action = document.createTextNode("Action");
            td7.append(action);

            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td7);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);

            let data = JSON.parse(this.response);
            let length = data.length;
            if (length > 0) {
            	let i;
                for (i = 0; i < length; i++) {
                    let tableBody = document.createElement("tr");
                    let td2Body = document.createElement("td");
                    let textNode2 = document.createTextNode(data[i].pname);
                    td2Body.append(textNode2);

                    let td3Body = document.createElement("td");
                    let textNode3 = document.createTextNode(data[i].price);
                    td3Body.append(textNode3);

                    let td4Body = document.createElement("td");
                    let textNode4 = document.createTextNode(data[i].description);
                    td4Body.append(textNode4);

                    let td5Body = document.createElement("td");
                    let textNode5 = document.createTextNode(data[i].rating);
                    td5Body.append(textNode5);

                    let td6Body = document.createElement("td");
                    let textNode6 = document.createTextNode(data[i].quantity);
                    td6Body.append(textNode6);
                    
                    let pidhidden=document.createElement("input");
                    pidhidden.setAttribute("type","hidden");
                    pidhidden.setAttribute("id","pid");
                    pidhidden.setAttribute("value",data[i].id);
                    
                    let td7Body = document.createElement("td");
                    let addCartButton = document.createElement("button");
                    let addCartButtonTextNode = document.createTextNode("Add Cart");
                    addCartButton.setAttribute("class","ubutton");
                    addCartButton.appendChild(addCartButtonTextNode);
                    
                    addCartButton.addEventListener("click", function () {
                        let data = this.parentElement.parentElement.cells;
                        let todayDate = new Date();
                        let dd = String(todayDate.getDate()).padStart(2, '0');
                        let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                        let yyyy = todayDate.getFullYear();
                        todayDate = dd + '-' + mm + '-' + yyyy;
                        let uname=JSON.parse(JSON.stringify(sessionStorage.getItem("uname")));
                        
                        let pname= data[0].innerHTML;
                        let price= data[1].innerHTML;
                        let description= data[2].innerHTML;
                        let rating= data[3].innerHTML;
                        let quantity= data[4].innerHTML;
                        let date=todayDate;
                        //Object Enahance
                       // let obj = {pname: data[0].innerHTML, price: data[1].innerHTML, description: data[2].innerHTML, rating: data[3].innerHTML, quantity: data[4].innerHTML,date:todayDate,uname:uname }
                        let obj = { pname, price, description, rating, quantity,todayDate,uname };
                        var httpRequest;
                        if (window.XMLHttpRequest) {
                            httpRequest = new XMLHttpRequest()
                        } else {
                            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        httpRequest.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 201) {
                                alert("Cart Added successfully");
                                window.location.assign("myCarts.html");
                            }
                        }
                        httpRequest.open("POST", "http://localhost:3000/carts", true);
                        httpRequest.setRequestHeader("Content-type", "application/json");
                        httpRequest.send(JSON.stringify(obj));
                    });
                    let orderButton = document.createElement("button");
                    let orderButtonTextNode = document.createTextNode("Order");
                    orderButton.setAttribute("class","ubutton");
                    orderButton.appendChild(orderButtonTextNode);
                    orderButton.addEventListener("click", function () {
                        let data = this.parentElement.parentElement.cells;
                        let todayDate = new Date();
                        let dd = String(todayDate.getDate()).padStart(2, '0');
                        let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                        let yyyy = todayDate.getFullYear();
                        todayDate = dd + '-' + mm + '-' + yyyy;
                        let uname=JSON.parse(JSON.stringify(sessionStorage.getItem("uname")));
                        
                        //let obj = {pname: data[0].innerHTML, price: data[1].innerHTML, description: data[2].innerHTML, rating: data[3].innerHTML, quantity: data[4].innerHTML,date:todayDate,uname:uname }
                        let pname= data[0].innerHTML;
                        let price= data[1].innerHTML;
                        let description= data[2].innerHTML;
                        let rating= data[3].innerHTML;
                        let quantity= data[4].innerHTML;
                        //Enahanced Object
                        let obj = {pname, price, description, rating, quantity,todayDate,uname };
                        
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
                    tableBody.append(td2Body);
                    tableBody.append(td3Body);
                    tableBody.append(td4Body);
                    tableBody.append(td5Body);
                    tableBody.append(td6Body);
                    tableBody.append(td7Body);
                    tbody.append(tableBody);
                }

            } else {
                let h4data = document.createElement("h4");
                let childNode = document.createTextNode("Prducts Not Available");
                h4data.appendChild(childNode);
                tbody.appendChild(h4data);
            }
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(table);
            }
        }
    }
    const url="http://localhost:3000/products";
    httpRequest.open("GET", url , true);
    httpRequest.send();
    });
 }
 
//Mycarts->Authorized customer only see his carts if added carts with help of myCarts=()=>{} function
mycarts=()=>{
	let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) { //promise opened here
    httpRequest.onreadystatechange = function () {
    	if (this.readyState === 4) {
            if (this.status != 200) {
                reject("My Carts Not Found! Error Response Code: " + this.status)
            } else {
            let tableEl = document.getElementsByTagName('table');
            if (tableEl[0] !== undefined) {
                tableEl[0].remove()
            }
            let table = document.createElement("table");
            table.setAttribute("id", "tab01");
            let tbody = document.createElement("tbody");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");
            let td2 = document.createElement("td");
            let thMNo = document.createTextNode("Product Name");
            td2.append(thMNo);
            let td3 = document.createElement("td");
            let thSapId = document.createTextNode("Price");
            td3.append(thSapId);
            let td4 = document.createElement("td");
            let thEmail = document.createTextNode("Description");
            td4.append(thEmail);
            let td5 = document.createElement("td");
            let thGender = document.createTextNode("Rating");
            td5.append(thGender);
            let td7 = document.createElement("td");
            let thQuantity = document.createTextNode("Quantity");
            td7.append(thQuantity);
            let td8 = document.createElement("td");
            let thAction= document.createTextNode("Action");
            td8.append(thAction);

            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td7);
            tr.append(td8);
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);

            let data = JSON.parse(this.response);
            let length = data.length;
            if (length > 0) {
            	let i;
                for (i = 0; i < length; i++) {
                    let tableBody = document.createElement("tr");
                    let td2Body = document.createElement("td");
                    let textNode2 = document.createTextNode(data[i].pname);
                    td2Body.append(textNode2);

                    let td3Body = document.createElement("td");
                    let textNode3 = document.createTextNode(data[i].price);
                    td3Body.append(textNode3);

                    let td4Body = document.createElement("td");
                    let textNode4 = document.createTextNode(data[i].description);
                    td4Body.append(textNode4);

                    let td5Body = document.createElement("td");
                    let textNode5 = document.createTextNode(data[i].rating);
                    td5Body.append(textNode5);

                    let td7Body = document.createElement("td");
                    let textNode7 = document.createTextNode(data[i].quantity);
                    td7Body.append(textNode7);

                    let td8Body = document.createElement("td");
                    let orderButton = document.createElement("button");
                    let orderTextNode = document.createTextNode("Order Item");
                    orderButton.appendChild(orderTextNode);
                    orderButton.addEventListener("click", function () {
                        let data = this.parentElement.parentElement.cells; //changes required here
                        //let obj = { pid: data[0].innerHTML, pname: data[1].innerHTML, price: data[2].innerHTML, description: data[3].innerHTML, rating: data[4].innerHTML, quantity: data[5].innerHTML ,date: data[5].innerHTML,uname: data[5].innerHTML}-
                        let pid= data[0].innerHTML;
                        let pname= data[1].innerHTML;
                        let price= data[2].innerHTML;
                        let description= data[3].innerHTML;
                        let rating= data[4].innerHTML;
                        let quantity= data[5].innerHTML;
                        let date= data[5].innerHTML;
                        let uname= data[5].innerHTML;                       

                        //Enahanced Object
                        let obj = { pid, pname, price, description, rating, quantity,date,uname};
                        console.log("obj: "+obj);
                        localStorage.setItem("orderItem", JSON.stringify(obj));
                        cartToOrder();
                        deleteCart();
                        window.location.assign("myOrders.html");
                    });
                   
                    td8Body.append(orderButton);
                    tableBody.append(td2Body);
                    tableBody.append(td3Body);
                    tableBody.append(td4Body);
                    tableBody.append(td5Body);
                    tableBody.append(td7Body);
                    tableBody.append(td8Body);
                    tbody.append(tableBody);
                }

            } else {
                let h4data = document.createElement("h4");
                let childNode = document.createTextNode("My Carts Not Available");
                h4data.appendChild(childNode);
                tbody.appendChild(h4data);
            }

            let body = document.getElementsByTagName('body')[0];
            body.appendChild(table);

            }
        }

    }
    const uname= sessionStorage.getItem("uname");
    const url=`http://localhost:3000/carts?uname=${uname}`;
    console.log(url);
    httpRequest.open("GET", url, true);
    httpRequest.send();
    });
 }
//Authorized customer only able to see his order list
//if customer order any product(s) then only see his order list or else empty set! 
myOrderList=()=>{
	 let httpRequest;
	    if (window.XMLHttpRequest) {
	        httpRequest = new XMLHttpRequest()
	    } else {
	        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    //promise using here
	    return new Promise(function (resolve, reject) {
	    httpRequest.onreadystatechange = function () {
	        if (this.readyState === 4) { 
	        	if (this.status != 200) {
                    reject("Order List Not Found ! Response Code: " + this.status)
                } else {
	            let tableEl = document.getElementsByTagName('table');
	            if (tableEl[0] !== undefined) {
	                tableEl[0].remove()
	            }
	            let table = document.createElement("table");
	            table.setAttribute("id", "tab01");
	            let tbody = document.createElement("tbody");
                let thead = document.createElement("thead");
	            let tr = document.createElement("tr");
	            let td2 = document.createElement("td");
	            let thMNo = document.createTextNode("Product Name");
	            td2.append(thMNo);
	            let td3 = document.createElement("td");
	            let thSapId = document.createTextNode("Price");
	            td3.append(thSapId);
	            let td4 = document.createElement("td");
	            let thEmail = document.createTextNode("Description");
	            td4.append(thEmail);
	            let td5 = document.createElement("td");
	            let thGender = document.createTextNode("Rating");
	            td5.append(thGender);
	            let td6 = document.createElement("td");
	            let thId = document.createTextNode("Order Date");
	            td6.append(thId);
	            let td7 = document.createElement("td");
	            let thQuantity = document.createTextNode("Quantity");
	            td7.append(thQuantity);
	            let td8 = document.createElement("td");
	            let thAmount = document.createTextNode("Customer Name");
	            td8.append(thAmount);

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

	            let data = JSON.parse(this.response);
	            let length = data.length;
	            if (length > 0) {
	            	let i;
	                for (i = 0; i < length; i++) {

	                    let tableBody = document.createElement("tr");
	                    let td2Body = document.createElement("td");
	                    let textNode2 = document.createTextNode(data[i].pname);
	                    td2Body.append(textNode2);

	                    let td3Body = document.createElement("td");
	                    let textNode3 = document.createTextNode(data[i].price);
	                    td3Body.append(textNode3);

	                    let td4Body = document.createElement("td");
	                    let textNode4 = document.createTextNode(data[i].description);
	                    td4Body.append(textNode4);

	                    let td5Body = document.createElement("td");
	                    let textNode5 = document.createTextNode(data[i].rating);
	                    td5Body.append(textNode5);

	                    let td6Body = document.createElement("td");
	                    let textNode6 = document.createTextNode(data[i].date);
	                    td6Body.append(textNode6);

	                    let td7Body = document.createElement("td");
	                    let textNode7 = document.createTextNode(data[i].quantity);
	                    td7Body.append(textNode7);

	                    let td8Body = document.createElement("td");
	                    let textNode8 = document.createTextNode(data[i].uname);
	                    td8Body.append(textNode8);
	                   
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
	                let h4data = document.createElement("h4");
	                var childNode = document.createTextNode("No Orders Found");
	                h4data.appendChild(childNode);
	                tbody.appendChild(h4data);
	            }
	            var body = document.getElementsByTagName('body')[0];
	            body.appendChild(table);
                }
	        }

	    }
	   var uname= sessionStorage.getItem("uname");
	  // const url="http://localhost:3000/orders?uname="+uname;
	   
	   const url= `http://localhost:3000/orders?uname=${uname}`;
	   console.log(url);
	   httpRequest.open("GET", url, true);
	   httpRequest.send();
	});
}

//myOrder: Action taken by the customer click order button.
//customer click order buuton then call this function and place an order (store in order).
myOrders=()=>{
    let pname = document.getElementById("pname").value;
    let price = document.getElementById("price").value;;
    let description = document.getElementById("description").value;
    let rating = document.getElementById("rating").value;
    let quantity = document.getElementById("quantity").value;
    let date = document.getElementById("date").value;
    let amount= price*quantity;
    let uname = document.getElementById("uname").value;
    
   // let obj = {pname: pname, price: amount, description: description, rating: rating, quantity: quantity ,date: date,uname: uname};
	let obj = {pname, amount, description, rating, quantity , date, uname};
	let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 ) { //if (this.readyState === 4 && this.status === 201)
        	 if (this.status != 200 || this.status !=201) {
                 reject("Error, status code = " + this.status)
             } else {
             alert("Order Item successfully");
             window.location.assign("myOrders.html");
           }
        }
    }
    const url="http://localhost:3000/orders";
    httpRequest.open("POST",url , true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(obj));
    }); 
    
}

//Customer supposed to order his added cart.
//Customer order his added cart order
cartToOrder=()=>{
    const data = JSON.parse(localStorage.getItem("orderItem"));
    //let obj = {pname: data.pname, price: data.price, description: data.description, rating: data.rating, quantity: data.quantity ,date: data.date,uname: data.uname};
    let pname= data.pname;
    let price= data.price;
    let description= data.description;
    let rating= data.rating;
    let quantity= data.quantity;
    let date= data.date;
    let uname= data.uname;
    
    let obj = {pname, price, description, rating, quantity,date,uname};
	let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 ) { //if (this.readyState === 4 && this.status === 201)
        	 if (this.status != 201 ) {
                 reject("Error, status code = " + this.status)
             } else {
             alert("Order Item successfully");
             window.location.assign("myOrders.html");
           }
        }
    }
    const url="http://localhost:3000/orders";
    httpRequest.open("POST",url , true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(obj));
    }); 
}

//Delete cart once order placed
deleteCart=()=>{
	const data = JSON.parse(localStorage.getItem("orderItem"));
	let xmlhttp;
	if(window.XMLHttpRequest){
	xmlhttp=new XMLHttpRequest();
	}
	return new Promise(function (resolve, reject) {
	xmlhttp.onreadystatechange= function(){
		if(this.readyState===4){
			if (this.status != 200) {
                reject("Error, status code = " + this.status)
            } else {
			alert("Cart Deleted Successfully");
            }
		}
	}
	
	let pname=data.pname;
	const url = `http://localhost:3000/shoppingusers?pname=${pname}`;
	xmlhttp.open("DELETE", url, true);
	xmlhttp.setRequestHeader('Content-type','application/json');
	xmlhttp.send(null);
	});
}

//Logout:  Customer logout and session expired !
//when customer click logout button then call this method clear session and redirected to welcome page and ask him to login again
logout=()=>{
	localStorage.clear();
	alert("Your Successfully Logout");
	window.location.assign("index.html");
}