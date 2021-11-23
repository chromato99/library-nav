let node = new Array(20);

for(var x = 0; x < 20; x++) {
    node[x] = new Array(30);
    for(var y = 0; y < 30; y++) {
        node[x][y] = {
            edge: new Array(),
            check: false,
            book_num_start: 0,
            book_num_end: 0
        }
    }
}
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
for(var x = 3; x < 18; x++) {
    for(var y = 1; y < 29; y++) {
        if(node[x-1][y].check) {
            node[x][y].edge.push(node[x-1][y]);
        } else if(node[x][y-1].check) {
            node[x][y].edge.push(node[x][y-1]);
        } else if(node[x+1][y].check) {
            node[x][y].edge.push(node[x+1][y]);
        } else if(node[x][y+1].check) {
            node[x][y].edge.push(node[x][y+1]);
        }
    }
}


for(var x = 0; x < 20; x++) {
    var str = "";
    for(var y = 0; y < 30; y++) {
        if(node[x][y].check) {
            str += "1 ";
        } else {
            str += "0 ";
        }
    }
    console.log(str);
}






for(var x = 0; x < 20; x++) {
    for(var y = 0; y < 30; y++) {
        
    }
}

var dijkstra = function() {

}