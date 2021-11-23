let node = new Array(20);

// 여기서부터 58번째 줄까지는 각 노드들을 초기화 해주는 코드
for(var x = 0; x < 20; x++) {
    node[x] = new Array(30);
    for(var y = 0; y < 30; y++) {
        node[x][y] = {
            edge: new Array(),
            edge_distance: new Array(),
            total_distance: 9999999,
            check: false,
            visited: false,
            pos: {
                x: x,
                y: y
            },
            prev: {
                x: -1,
                y: -1
            },
            book_num_start: 0,
            book_num_end: 0
        }
    }
}
// 길로 사용할 노드만 true로 설정 없어도 되는데 검색 속도 상승용
for(var x = 3; x < 18; x+=2) {
    for(var y = 1; y < 29; y++) {
        node[x][y].check = true;
    }
}
for(var x = 4; x < 18; x+=2) {
    for(var y = 13; y < 17; y++) {
        node[x][y].check = true;
    }
}

// 반복문을 사용해서 이웃 노드에 대한 정보를 리스트 형태로 푸쉬
for(var x = 3; x < 18; x++) {
    for(var y = 1; y < 29; y++) {
        if(node[x-1][y].check == true) {
            node[x][y].edge.push(node[x-1][y]);
            node[x][y].edge_distance.push(1);
        }
        if(node[x][y-1].check == true) {
            node[x][y].edge.push(node[x][y-1]);
            node[x][y].edge_distance.push(1);
        }
        if(node[x+1][y].check == true) {
            node[x][y].edge.push(node[x+1][y]);
            node[x][y].edge_distance.push(1);
        }
        if(node[x][y+1].check == true) {
            node[x][y].edge.push(node[x][y+1]);
            node[x][y].edge_distance.push(1);
        }
    }
}

// 활성화된 길 출력하는 임시 코드
// for(var x = 0; x < node.length; x++) {
//     var str = "";
//     for(var y = 0; y < node[x].length; y++) {
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




function getSmallestDistance(node) { // 현재까지 출발노드로부터 가장 짧은 노드를 서칭해서 반환
    var min = 9999999
    var min_pos;
    for(var x = 0; x < node.length; x++) {
        for(var y = 0; y < node[x].length; y++) {
            if(node[x][y].check == false || node[x][y].visited == true) continue;
            if(min > node[x][y].total_distance) {
                min = node[x][y].total_distance;
                min_pos = node[x][y].pos;
            }
        }
    }
    return min_pos;
}

function dijkstra(node, start, destination_book_num) { // 다익스트라 알고리즘
    node[start.x][start.y].total_distance = 0; // 첫 출발 노드 설정 현재는 (5,15)
    for(var x = 0; x < 20; x++) {
        for(var y = 0; y < 30; y++) {
            if(node[x][y].check == false) continue;
            current = getSmallestDistance(node); // 현재 방문중인 노드
            node[current.x][current.y].visited = true; // 방문한 노드로 설정

            for(var i = 0; i < node[current.x][current.y].edge.length; i++) { //current의 이웃노드들과의 거리 측정
                var alt = node[current.x][current.y].total_distance + node[current.x][current.y].edge_distance[i]; // 출발지 노드 부터 계산된 current의 이웃노드까지의 거리 + current의 이웃에서 U의 이웃노드까지의 거리
                //console.log(node[current.x][current.y].edge[i].pos);
                if(alt < node[current.x][current.y].edge[i].total_distance) { // 새로 알아낸 거리가 기존의 거리보다 짧을때 변환
                    node[current.x][current.y].edge[i].total_distance = alt;
                    node[current.x][current.y].edge[i].prev = current; // 경로 추적을 위해 이전 노드에 대한 정보 저장
                }

                if(node[current.x][current.y].edge[i].book_num_start <= destination_book_num && destination_book_num <= node[current.x][current.y].edge[i].book_num_end) {
                    // 목적지를 발견하면 값을 반환하고 함수 종료
                    return node[current.x][current.y].edge[i].pos;
                }
            }
        }
    }
}

var dest = dijkstra(node, {x: 5, y:15}, 813); //start point (5,15)

while(dest.x != -1) { // 목적지부터 출발지까지 최단 경로 출력
    console.log(dest);
    dest = node[dest.x][dest.y].prev;
}