var str=[];
var minPath;
function FindDistance(book){
 var n1=[];
 var num1=[];
 var list=[];
 var result;
 n1=book.split(","); //선택된 책의 위치 정보(x,y) -> n1의 어레이에 n1[0]=x  n1[1]=y
 for(var i=0; i<n1.length; i++)
 {
   num1[i]=n1[i];
 }

var vertex = function(param){
 var name = '';
 var edge = [];
 var minDistance = 99999;
 var previous = null;
 name = name || param.name;
 edge = edge || param.edge;
 minDistance = minDistance || param.minDistance;
 previous = previous || param.previous;
 return {
   "name" : name,
   "edge" : edge,
   "minDistance" : minDistance,
   "previous" : previous
 };
};
var num=6;
var vertices = [];//우리가 정한 꼭짓점들의 정보들
vertices.push(new vertex({"name" : '15,5'})); 
vertices.push(new vertex({"name" : '13,3'})); 
vertices.push(new vertex({"name" : '16,3'})); 
vertices.push(new vertex({"name" : '13,5'})); 
vertices.push(new vertex({"name" : '16,5'})); 
vertices.push(new vertex({"name" : '13,7'})); 
vertices.push(new vertex({"name" : '16,7'})); 
vertices.push(new vertex({"name" : '13,9'})); 
vertices.push(new vertex({"name" : '16,9'})); 
vertices.push(new vertex({"name" : '13,11'}));
vertices.push(new vertex({"name" : '16,11'}));
vertices.push(new vertex({"name" : '13,13'}));
vertices.push(new vertex({"name" : '16,13'}));
vertices.push(new vertex({"name" : '13,15'}));
vertices.push(new vertex({"name" : '16,15'}));
vertices.push(new vertex({"name" : '13,17'}));
vertices.push(new vertex({"name" : '16,17'}));{
vertices[0].edge = [{
	 "id" : vertices[3],
	 "distance" : 2
   },{
	 "id" : vertices[4],
	 "distance" : 1
   }
  ];
vertices[1].edge = [{
	 "id" : vertices[2],
	 "distance" : 3
   },{
	 "id" : vertices[3],
	 "distance" : 2
   }];
vertices[2].edge = [{
	 "id" : vertices[1],
	 "distance" : 3
   },{
	   "id" : vertices[4],
	   "distance" : 2
	 } ];
vertices[3].edge = [{
	"id" : vertices[0],
	"distance" : 2
  },{
	 "id" : vertices[1],
	 "distance" : 2
   },{
	 "id" : vertices[4],
	 "distance" : 3
   },{
	 "id" : vertices[5],
	 "distance" : 2
   }];
vertices[4].edge = [{
	"id" : vertices[0],
	"distance" : 1
  },{
   "id" : vertices[2],
   "distance" : 2
 },{
   "id" : vertices[3],
   "distance" : 3
 },{
   "id" : vertices[6],
   "distance" : 2
 }];
vertices[5].edge = [{
   "id" : vertices[3],
   "distance" : 2
 },{
   "id" : vertices[6],
   "distance" : 3
 },{
   "id" : vertices[7],
   "distance" : 2
 }];
vertices[6].edge = [{
   "id" : vertices[4],
   "distance" : 2
 },{
   "id" : vertices[5],
   "distance" : 3
 },{
   "id" : vertices[8],
   "distance" : 2
 }];
   vertices[7].edge = [{
	   "id" : vertices[5],
	   "distance" : 2
	 },{
	   "id" : vertices[8],
	   "distance" : 3
	 },{
	   "id" : vertices[9],
	   "distance" : 2
	 }];
	 vertices[8].edge = [{
	   "id" : vertices[6],
	   "distance" : 2
	 },{
	   "id" : vertices[7],
	   "distance" : 3
	 },{
	   "id" : vertices[10],
	   "distance" : 2
	 }];
	 vertices[9].edge =[{
	   "id" : vertices[7],
	   "distance" : 2
	 },{
	   "id" : vertices[10],
	   "distance" : 3
	 },{
	   "id" : vertices[11],
	   "distance" : 2
	 }];
	 vertices[10].edge = [{
	   "id" : vertices[8],
	   "distance" : 2
	 },{
	   "id" : vertices[9],
	   "distance" : 3
	 },{
	   "id" : vertices[12],
	   "distance" : 2
	 }];
	 vertices[11].edge = [{
	   "id" : vertices[9],
	   "distance" : 2
	 },{
	   "id" : vertices[12],
	   "distance" : 3
	 },{
	   "id" : vertices[13],
	   "distance" : 2
	 }
	 ];
	 vertices[12].edge = [{
	   "id" : vertices[10],
	   "distance" : 2
	 },{
	   "id" : vertices[11],
	   "distance" : 3
	 },{
	   "id" : vertices[14],
	   "distance" : 2
	 }];
	 vertices[13].edge = [{
	   "id" : vertices[11],
	   "distance" : 2
	 },{
	   "id" : vertices[14],
	   "distance" : 3
	 },{
	   "id" : vertices[15],
	   "distance" : 2
	 }];
	 vertices[14].edge = [{
	   "id" : vertices[12],
	   "distance" : 2
	 },{
	   "id" : vertices[13],
	   "distance" : 3
	 },{
	   "id" : vertices[16],
	   "distance" : 2
	 }];
	 vertices[15].edge = [{
	   "id" : vertices[13],
	   "distance" : 2
	 },{
	   "id" : vertices[16],
	   "distance" : 3
	 }];
	 vertices[16].edge = [{
	   "id" : vertices[14],
	   "distance" : 2
	 },{
	   "id" : vertices[15],
	   "distance" : 3
	 }];}//꼭짓점들이 연결되어 있는 점들과 그 거리
var computePath=function(vertices, source) {
 source.minDistance = 0;
 var vertexQueue = [source];
 while (vertexQueue.length) {
   var u = vertexQueue.shift(0);
   //console.log('-----');
   //console.log(u.name);
   u.edge.forEach(function(v,k) {
	 var distanceThroughU = u.minDistance + v.distance;
	 //console.log('    ', v.id.name + ':'+distanceThroughU+'<'+v.id.minDistance + 
	   //          (distanceThroughU < v.id.minDistance ? '' : '(out)' ));
	 if(distanceThroughU < v.id.minDistance) {
	   v.id.minDistance = distanceThroughU;
	   v.id.previous = u;
	   vertexQueue.push(v.id);
	 }
   });
 }
};

computePath(vertices, vertices[0]); //해당 책의 같은 y상 최단거리의 꼭짓점까지의 경로
var k=0;
vertices.forEach(function(v) {
 var num =[];
 var num1=[];
 var path = [];
 var current = v.previous;
 while(!!current) {
   path.push(current);
   current = current.previous;
 }  

   num=v.name.split(",");
   for(var i=0; i<num.length; i++)
   {
	 num1[i]=num[i];
   }
   if(num1[1]==n1[1]&&parseInt(n1[0])>parseInt(num1[0]))//마지막 y값의 꼭짓점에서 오른쪽상에 위치해 있는지
   { var dis = Math.abs(n1[0]-num1[0]);
	 minPath=dis+v.minDistance;
		 result = v.name+':'+path.map(function(w) {
   return w.name;
 }).reverse().join('->')+'->'+v.name+'->'+book+'('+ (v.minDistance+dis) +')';

	 if(num1[0]==16) {
	 list[k]=v.name;
	 str[path.length]=v.name;
	 str[path.length+1]=book;
	 for(var i=0; i<path.length; i++){
	   str[path.length-1-i]=path[i].name;
	 }
	  /*   for(var i=0; i<str.length; i++){
	  console.log(str[i]);
	   }
	  console.log(result);*/
	   k++;}
   }
   else if(num1[1]==n1[1]&&parseInt(n1[0])<parseInt(num1[0]))//마지막 y값의 꼭짓점에서 왼쪽상에 위치해 있는지
   {var dis = Math.abs(num1[0]-n1[0]);
	 minPath=dis+v.minDistance;
	 result = v.name+':'+path.map(function(w) {
	 return w.name;
   }).reverse().join('->')+'->'+v.name+'->'+book+'('+ (v.minDistance+dis) +')';
  
	if(num1[0]==13) { 
	 list[k]=v.name;
	 str[path.length]=v.name;
	 str[path.length+1]=book;
	 for(var i=0; i<path.length; i++){
	   str[path.length-1-i]=path[i].name;
	 }
	/*   for(var i=0; i<str.length; i++){
	  console.log(str[i]);
	   }
	  console.log(result);*/
	   k++;
   }
   }
 

});

}
FindDistance("7,17");//test case 우리가 범위 정해서 찾아야함

for(var i=0; i<str.length; i++)
{
 console.log(str[i]);
}

function test(){//경로 찍어주는 함수
	var flag=0;
   var table1 = document.getElementById("table1");
   var pre=[];
   //console.log(str.length);
 for(var j=0; j<str.length; j++){ 
   var temp=str[j].split(",");
   temp[0]=parseInt(temp[0]);  
   temp[1]=parseInt(temp[1]);
   
   if(flag==0)
   {
		
		table1.rows[temp[1]].cells[temp[0]].innerHTML ="<img src=C:/Users/idh10/Desktop/test.png width=\"32px\" height=\"32px\">";
		flag=1;
   }
   else{
		if(pre[0]==temp[0])
		{
			for(var i=0; i<=Math.abs(temp[1]-pre[1]); i++)
			{
				if(temp[1]>pre[1]){
				//console.log(Math.abs(temp[1]-pre[1]));
				table1.rows[(pre[1]+i)].cells[temp[0]].innerHTML ="<img src=C:/Users/idh10/Desktop/testD.png width=\"32px\" height=\"32px\">";
				}
				else{
					//console.log(Math.abs(temp[1]-pre[1]));
					table1.rows[(pre[1]-i)].cells[temp[0]].innerHTML ="<img src=C:/Users/idh10/Desktop/testU.png width=\"32px\" height=\"32px\">";
				}
			}
			
		}
		else
		{
			for(var i=0; i<=Math.abs(temp[0]-pre[0]); i++)
			{
				if(temp[0]>pre[0]){
					//console.log(Math.abs(temp[0]-pre[0]));
				table1.rows[temp[1]].cells[(pre[0]+i)].innerHTML =  "<img src=C:/Users/idh10/Desktop/testR.png width=\"32px\" height=\"32px\">";
				}
				else{
					//console.log(Math.abs(temp[0]-pre[0]));
					table1.rows[temp[1]].cells[(pre[0]-i)].innerHTML ="<img src=C:/Users/idh10/Desktop/testL.png width=\"32px\" height=\"32px\">";
				}
			}
		}
		}
   
   pre[0]=temp[0];
   pre[1]=temp[1];
 }

}
test();