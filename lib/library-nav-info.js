const library_map_node = require('./library-map-node.js');
const db = require('./db.js');

function getPathTable() {
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
    return path_table;
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

function dijkstra(node, path_table, start, destination_book_num) { // 다익스트라 알고리즘
    path_table[start.x][start.y].total_distance = 0; // 첫 출발 노드 설정 현재는 (5,15)
    for(let x = 0; x < 20; x++) {
        for(let y = 0; y < 30; y++) {
            if(node[x][y].check == false) continue;
            let current = getSmallestDistance(path_table, node); // 현재 방문중인 노드
            //console.log(current);
            path_table[current.x][current.y].visited = true; // 방문한 노드로 설정
            //console.log(path_table[current.x][current.y].visited);
            for(let i = 0; i < node[current.x][current.y].vertices.length; i++) { //current의 이웃노드들과의 거리 측정
                let neighbor_pos = {
                    x: node[current.x][current.y].vertices[i].x, 
                    y: node[current.x][current.y].vertices[i].y
                }
                let neighbor_path_data = path_table[neighbor_pos.x][neighbor_pos.y];
                let neighbor = node[neighbor_pos.x][neighbor_pos.y];
                let alt = path_table[current.x][current.y].total_distance + node[current.x][current.y].vertices[i].distance; // 출발지 노드 부터 계산된 current의 이웃노드까지의 거리 + current의 이웃에서 U의 이웃노드까지의 거리
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

function getPath(dest, path_table) {
    let path = new Array();
    while(dest.x != -1) { // 목적지부터 출발지까지 최단 경로 출력
        path.push(dest);
        dest = path_table[dest.x][dest.y].prev;
    }
    return path;
}

exports.getBookInfo = function(registration, start_pos, response, next) {
    let data = db.query('SELECT * FROM book WHERE book_name=(SELECT book_name FROM book WHERE registration_num=?) and author=(SELECT author FROM book WHERE registration_num=?)', [registration, registration], (err, data) => { // 같은 책제목과 같은 글쓴이인 중복된 책까지 전부 요청
        if(err) {return err;}
        if(data.length == 0) { // 책 정보가 없으면 에러 메세지 출력
            response.send('No data!!\n Wrong Access');
        }
        else {
            let path_table = getPathTable();
            let destination = dijkstra(library_map_node, path_table, start_pos, data[0].classification);
            let path = getPath(destination, path_table);

            response.render('info', {book_path: path, book_data: data});
        }
    });
}