let node = new Array(20);

// 여기서부터 58번째 줄까지는 각 노드들을 초기화 해주는 코드
for(let x = 0; x < 20; x++) {
    node[x] = new Array(30);
    for(let y = 0; y < 30; y++) {
        node[x][y] = {
            vertices: new Array(),
            check: false,
            book_num_start: 0,
            book_num_end: 0,
            pos: {
                x: x,
                y: y
            }
        };
    }
}
// 길로 사용할 노드만 true로 설정 없어도 되는데 검색 속도 상승용
for(let x = 3; x < 18; x+=2) {
    for(let y = 1; y < 29; y++) {
        node[x][y].check = true;
    }
}
for(let x = 4; x < 18; x+=2) {
    for(let y = 13; y < 17; y++) {
        node[x][y].check = true;
    }
}

// 반복문을 사용해서 이웃 노드에 대한 정보를 리스트 형태로 푸쉬
for(let x = 3; x < 18; x++) {
    for(let y = 1; y < 29; y++) {
        if(node[x-1][y].check == true) {
            node[x][y].vertices.push({x: x-1, y: y, distance: 1});
        }
        if(node[x][y-1].check == true) {
            node[x][y].vertices.push({x: x, y: y-1, distance: 1});
        }
        if(node[x+1][y].check == true) {
            node[x][y].vertices.push({x: x+1, y: y, distance: 1});
        }
        if(node[x][y+1].check == true) {
            node[x][y].vertices.push({x: x, y: y+1, distance: 1});
        }
    }
}

// 활성화된 길 출력하는 임시 코드
// for(let x = 0; x < node.length; x++) {
//     let str = "";
//     for(let y = 0; y < node[x].length; y++) {
//         if(node[x][y].check) {
//             str += "1 ";
//         } else {
//             str += "0 ";
//         }
//     }
//     console.log(str);
// }

node[11][3].book_num_start = 800; // 실험용으로 일단 하나에 책장에만 일단 데이터 넣어봄
node[11][3].book_num_end = 820;

let path_table = new Array(20);
for(let x = 0; x < 20; x++) {
    path_table[x] = new Array(30);
    for(let y = 0; y < 30; y++) {
        path_table[x][y] = {
            total_distance: 9999999,
            visited: false,
            prev: {
                x: -1,
                y: -1
            }
        };
    }
}


function getSmallestDistance(path_table, node) { // 현재까지 출발노드로부터 가장 짧은 노드를 서칭해서 반환
    let min = 9999999;
    let min_pos;
    for(let x = 0; x < path_table.length; x++) {
        for(let y = 0; y < path_table[x].length; y++) {
            if(node[x][y].check == false || path_table[x][y].visited == true) continue;
            if(min > path_table[x][y].total_distance) {
                min = path_table[x][y].total_distance;
                min_pos = node[x][y].pos;
                //console.log(node[x][y].pos);
            }
        }
    }
    //console.log(min_pos);
    return min_pos;
}

function dijkstra(node, finding_path_table, start, destination_book_num) { // 다익스트라 알고리즘
    finding_path_table[start.x][start.y].total_distance = 0; // 첫 출발 노드 설정 현재는 (5,15)
    for(let x = 0; x < 20; x++) {
        for(let y = 0; y < 30; y++) {
            if(node[x][y].check == false) continue;
            let current = getSmallestDistance(finding_path_table, node); // 현재 방문중인 노드
            //console.log(current);
            finding_path_table[current.x][current.y].visited = true; // 방문한 노드로 설정
            //console.log(finding_path_table[current.x][current.y].visited);
            for(let i = 0; i < node[current.x][current.y].vertices.length; i++) { //current의 이웃노드들과의 거리 측정
                let neighbor_pos = {
                    x: node[current.x][current.y].vertices[i].x, 
                    y: node[current.x][current.y].vertices[i].y
                }
                let neighbor_path_data = finding_path_table[neighbor_pos.x][neighbor_pos.y];
                let neighbor = node[neighbor_pos.x][neighbor_pos.y];
                let alt = finding_path_table[current.x][current.y].total_distance + node[current.x][current.y].vertices[i].distance; // 출발지 노드 부터 계산된 current의 이웃노드까지의 거리 + current의 이웃에서 U의 이웃노드까지의 거리
                //console.log(node[current.x][current.y].vertices[i].pos);
                if(alt < neighbor_path_data.total_distance) { // 새로 알아낸 거리가 기존의 거리보다 짧을때 변환
                    neighbor_path_data.total_distance = alt;
                    neighbor_path_data.prev = current; // 경로 추적을 위해 이전 노드에 대한 정보 저장
                    //console.log(neighbor_path_data.prev);
                }

                if(neighbor.book_num_start <= destination_book_num && destination_book_num <= neighbor.book_num_end) {
                    // 목적지를 발견하면 값을 반환하고 함수 종료
                    return neighbor.pos;
                }
            }
        }
    }
}




let dest = dijkstra(node, path_table, {x: 5, y:15}, 813); //start point (5,15)
//console.log(dest);
while(dest.x != -1) { // 목적지부터 출발지까지 최단 경로 출력
    console.log(dest);
    dest = path_table[dest.x][dest.y].prev;
}


var out ;
var i=0;

function test(){//경로 찍어주는 함수
	var flag=0;
   var table1 = document.getElementById("table1");
   var pre=[];
   //console.log(str.length);
   var j=0;
 while(dest.x!=-1)
   { 
   
   var temp=[];
   temp[0]=parseInt(dest.y);  
   temp[1]=parseInt(dest.x);
   
   if(flag==0)
   {
		flag=1;
   }
   else{
		if(pre[0]==temp[0])
		{
			for(var i=0; i<=Math.abs(temp[1]-pre[1]); i++)
			{
				if(temp[1]>pre[1]){
				//console.log(Math.abs(temp[1]-pre[1]));
				table1.rows[(pre[1]+i)].cells[temp[0]].innerHTML ="<img src=C:/Users/idh10/Desktop/testU.png width=\"32px\" height=\"32px\">";
				}
				else{
					//console.log(Math.abs(temp[1]-pre[1]));
					table1.rows[(pre[1]-i)].cells[temp[0]].innerHTML ="<img src=C:/Users/idh10/Desktop/testD.png width=\"32px\" height=\"32px\">";
				}
			}
			
		}
		else
		{
			for(var i=0; i<=Math.abs(temp[0]-pre[0]); i++)
			{
				if(temp[0]>pre[0]){
					//console.log(Math.abs(temp[0]-pre[0]));
				table1.rows[temp[1]].cells[(pre[0]+i)].innerHTML =  "<img src=C:/Users/idh10/Desktop/testL.png width=\"32px\" height=\"32px\">";
				}
				else{
					//console.log(Math.abs(temp[0]-pre[0]));
					table1.rows[temp[1]].cells[(pre[0]-i)].innerHTML ="<img src=C:/Users/idh10/Desktop/testR.png width=\"32px\" height=\"32px\">";
				}
			}
		}
		}
   
   pre[0]=temp[0];
   pre[1]=temp[1];
   j++
   console.log(dest.x, dest.y);
    
   dest = node[dest.x][dest.y].prev;
 }

}
test();