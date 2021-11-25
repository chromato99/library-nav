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

node[11][3].book_num_start = 800; // 실험용으로 일단 하나에 책장에만 일단 데이터 넣어봄
node[11][3].book_num_end = 820;

module.exports = node;