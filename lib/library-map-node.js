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

for(let i = 0; i < 4; i++) {
    node[3][1+i].book_num_start = 0 + (i * 25);
    node[3][1+i].book_num_end = 24 + (i * 25);
}

for(let i = 0; i < 8; i++) {
    node[3][5+i].book_num_start = 100 + (i * 12.5);
    node[3][5+i].book_num_end = 111.5 + (i * 12.5);
}

for(let i = 0; i < 4; i++) {
    node[3][17+i].book_num_start = 200 + (i * 25);
    node[3][17+i].book_num_end = 224 + (i * 25);
}
for(let i = 0; i < 8; i++) {
    node[3][21+i].book_num_start = 300 + (i * 6.25);
    node[3][21+i].book_num_end = 305.25 + (i * 6.25);
}

for(let i = 0; i < 8; i++) {
    node[5][28-i].book_num_start = 350 + (i * 6.25);
    node[5][28-i].book_num_end = 355.25 + (i * 6.25);
}

for(let i = 0; i < 12; i++) {
    node[5][12-i].book_num_start = 400 + (i * 8);
    node[5][12-i].book_num_end = 415 + (i * 8);
}

for(let i = 0; i < 12; i++) {
    node[7][1+i].book_num_start = 500 + (i * 8);
    node[7][1+i].book_num_end = 515 + (i * 8);
}

for(let i = 0; i < 8; i++) {
    node[7][17+i].book_num_start = 600 + (i * 12.5);
    node[7][17+i].book_num_end = 611.5 + (i * 12.5);
}

for(let i = 0; i < 4; i++) {
    node[7][25+i].book_num_start = 700 + (i * 25);
    node[7][25+i].book_num_end = 724 + (i * 25);
}

for(let i = 0; i < 12; i++) {
    node[9][28-i].book_num_start = 800 + i;
    node[9][28-i].book_num_end = 801 + i;
}

for(let i = 0; i < 12; i++) {
    node[9][12-i].book_num_start = 811 + i;
    node[9][12-i].book_num_end = 812 + i;
}

for(let i = 0; i < 12; i++) {
    node[11][1+i].book_num_start = 823 + i;
    node[11][1+i].book_num_end = 824 + i;
}

for(let i = 0; i < 12; i++) {
    node[11][17+i].book_num_start = 835 + i;
    node[11][17+i].book_num_end = 836 + i;
}

for(let i = 0; i < 12; i++) {
    node[13][28-i].book_num_start = 847 + i;
    node[13][28-i].book_num_end = 848 + i;
}

for(let i = 0; i < 12; i++) {
    node[13][12-i].book_num_start = 859 + i;
    node[13][12-i].book_num_end = 860 + i;
}

for(let i = 0; i < 12; i++) {
    node[15][1+i].book_num_start = 871 + i;
    node[15][1+i].book_num_end = 872 + i;
}

for(let i = 0; i < 12; i++) {
    node[15][17+i].book_num_start = 883 + i;
    node[15][17+i].book_num_end = 884 + i;
}

for(let i = 0; i < 4; i++) {
    node[17][1+i].book_num_start = 895 + i;
    node[17][1+i].book_num_end = 896 + i;
}

for(let i = 0; i < 12; i++) {
    node[17][17+i].book_num_start = 900 + (i*8);
    node[17][17+i].book_num_end = 915 + (i*8);
}

module.exports = node;