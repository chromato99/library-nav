
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
var vertices = [];
vertices.push(new vertex({"name" : 'start'})); // Baltimore,Allentown
vertices.push(new vertex({"name" : '1'})); // Harrisburg
vertices.push(new vertex({"name" : '2'})); // Baltimore
vertices.push(new vertex({"name" : '3'})); // Baltimore,Allentown,New York
vertices.push(new vertex({"name" : '4'})); // Allentown
vertices.push(new vertex({"name" : '5'})); // Harrisburg,Philadelphia,Binghamton,New York
vertices.push(new vertex({"name" : '6'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '7'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '8'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '9'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '10'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '11'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '12'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '13'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '14'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '15'})); // Philadelphia,Allentown
vertices.push(new vertex({"name" : '16'})); // Philadelphia,Allentown
vertices[0].edge = [{
      "id" : vertices[2],
      "distance" : 3
    },{
      "id" : vertices[3],
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
var computePath=function(vertices, source) {
  source.minDistance = 0;
  var vertexQueue = [source];
  while (vertexQueue.length) {
    var u = vertexQueue.shift(0);
    console.log('-----');
    console.log(u.name);
    u.edge.forEach(function(v,k) {
      var distanceThroughU = u.minDistance + v.distance;
      console.log('    ', v.id.name + ':'+distanceThroughU+'<'+v.id.minDistance + 
                  (distanceThroughU < v.id.minDistance ? '' : '(out)' ));
      if(distanceThroughU < v.id.minDistance) {
        v.id.minDistance = distanceThroughU;
        v.id.previous = u;
        vertexQueue.push(v.id);
      }
    });
  }
};
var name = "17";
var num =5;
computePath(vertices, vertices[0]);
vertices.forEach(function(v) {
  var path = [];
  var current = v.previous;
  while(!!current) {
    path.push(current);
    current = current.previous;
  }
  var result = v.name+':'+path.map(function(w) {
    return w.name;
  }).reverse().join('->')+'=>'+v.name+'=>'+name+'('+ (v.minDistance+num) +')';
  console.log(result);
});