let fs = require("fs");
let library_map_node = JSON.parse(fs.readFileSync("./src/library-map-node.json", "utf-8")).map_node;

function getPathTable() { // Initialze path table for storing temporary data when running dijkstra algorithm
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

function getSmallestDistance(path_table, node) { // Search and return the shortest node from the starting node
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

function dijkstra(node, path_table, start, destination_book_num) { // Dijkstra algorithm to find shortest path
    path_table[start.x][start.y].total_distance = 0; // Initialize first node as starting point
    for(let x = 0; x < 20; x++) {
        for(let y = 0; y < 30; y++) {
            if(node[x][y].check == false) continue;
            let current = getSmallestDistance(path_table, node); // Node currently visited
            //console.log(current);
            path_table[current.x][current.y].visited = true; // Setting as visited
            //console.log(path_table[current.x][current.y].visited);
            for(let i = 0; i < node[current.x][current.y].vertices.length; i++) { // Measuring distance from current node to neighboring nodes
                let neighbor_pos = {
                    x: node[current.x][current.y].vertices[i].x, 
                    y: node[current.x][current.y].vertices[i].y
                }
                let neighbor_path_data = path_table[neighbor_pos.x][neighbor_pos.y];
                let neighbor = node[neighbor_pos.x][neighbor_pos.y];
                let alt = path_table[current.x][current.y].total_distance + node[current.x][current.y].vertices[i].distance; // Distance from the current node to the  neighbor node + the distance from the current's neighbor to U's neighbor
                //console.log(node[current.x][current.y].vertices[i].pos);
                if(alt < neighbor_path_data.total_distance) { // Convert when the newly found distance is shorter than the existing distance
                    neighbor_path_data.total_distance = alt;
                    neighbor_path_data.prev = current; // Storing information about previous nodes for path tracing
                    //console.log(neighbor_path_data.prev);
                }

                if(neighbor.book_num_start <= destination_book_num && destination_book_num <= neighbor.book_num_end) {
                    // If the destination is found, return a value and exit the function
                    return neighbor.pos;
                }
            }
        }
    }
}

function getPath(dest, path_table) {
    let path = new Array();
    while(dest.x != -1) { // Shortest route output from destination to start point
        path.push(dest);
        dest = path_table[dest.x][dest.y].prev;
    }
    return path;
}

exports.getBookInfo = function(registration, start_pos, response, db, next) {
    let data = db.query('SELECT BOOK.* FROM book AS BOOK, (SELECT * FROM book WHERE registration_num=? LIMIT 1) AS SEARCH_RESULT WHERE BOOK.book_name=SEARCH_RESULT.book_name and BOOK.author=SEARCH_RESULT.author;', registration, (err, data) => { // Request all duplicate books with the same title and same author
        if(err) {return err;}
        //console.log(data);
        if(data.length == 0 || parseInt(data[0].classification, 10) >= 1000) { // If there is no book information, an error message is displayed.
            response.send('Database Error!!\n No such registration');
        }
        else {
            let path_table = getPathTable();
            let destination = dijkstra(library_map_node, path_table, start_pos, parseInt(data[0].classification, 10));
            let path = getPath(destination, path_table);

            response.render('info', {book_path: path, book_data: data});
        }
    });
}