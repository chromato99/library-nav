function test(){

	var table1 = document.getElementById("table1");

	table1.rows[0].cells[0].innerHTML = "hello";

	table1.rows[0].cells[1].innerHTML = "world";

	table1.rows[1].cells[0].innerHTML = "hey";

	table1.rows[1].cells[1].innerHTML = "man";

}
test()