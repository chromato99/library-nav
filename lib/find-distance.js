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

var vertices = new Array();
vertices.push(new vertex({"name" : '15,5'})); // Baltimore,Allentown
vertices.push(new vertex({"name" : '13,3'})); // Harrisburg
vertices.push(new vertex({"name" : '16,3'})); // Baltimore
vertices.push(new vertex({"name" : '13,5'})); // Baltimore,Allentown,New York
vertices.push(new vertex({"name" : '16,5'})); // Allentown
vertices.push(new vertex({"name" : '13,7'})); // Harrisburg,Philadelphia,Binghamton,New York
vertices.push(new vertex({"name" : '16,7'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13,9'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16,9'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13,11'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16,11'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13,13'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16,13'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13,15'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16,15'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13,17'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16,17'})); // Philadelphia,Allentown
vertices[0].edge = [{
    "id" : vertices[3],
    "distance" : 3
},{
    "id" : vertices[4],
    "distance" : 1
}];
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
}];
vertices[3].edge = [{
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
}];

var str=[];
var minPath;

var computePath = (vertices, source) => {
    source.minDistance = 0;
    var vertexQueue = [source];
    while (vertexQueue.length) {
        var u = vertexQueue.shift(0);
        //console.log('-----');
        //console.log(u.name);
        u.edge.forEach((v,k) => {
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

function FindDistance(book){
    var n1=[];
    var num1=[];
    var list=[];
    var result;
    n1=book.split(",");
    for(var i=0; i<n1.length; i++) {
        num1[i]=n1[i];
    }
    var num=6;
    
    computePath(vertices, vertices[0]);
    var k=0;


    vertices.forEach((v) => {
        var num =[];
        var num1=[];
        var path = [];
        var current = v.previous;
        while(current) {
            path.push(current);
            current = current.previous;
        }
        num=v.name.split(",");
        for(var i=0; i<num.length; i++) {
            num1[i]=num[i];
        }
        if(num1[1]==n1[1]&&n1[0]>num1[0]) { 
            var dis = Math.abs(n1[0]-num1[0]);
            minPath=dis+v.minDistance;
            result = v.name + ':' + path.map(function(w) {
                return w.name;
            }).reverse().join('->')+'->'+v.name+'->'+book+'('+ (v.minDistance+dis) +')';

            if(num1[0]==16) {
                list[k]=v.name;
                str[path.length]=v.name;
                str[path.length+1]=book;
                for(var i=0; i<path.length; i++){
                    str[path.length-1-i]=path[i].name;
                }
                for(var i=0; i<str.length; i++){
                    //console.log(str[i]);
                }
                // console.log(result);
                k++;
            }
        }
        else if(num1[1]==n1[1]&&n1[0]<num1[0]) {
            var dis = Math.abs(num1[0]-n1[0]);
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
                for(var i=0; i<str.length; i++){
                    //console.log(str[i]);
                }
                // console.log(result);
                k++;
            }
        }
    });
}

FindDistance("7,17");
console.log(str);
console.log(minPath);