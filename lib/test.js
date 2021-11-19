const Node = function(vertex, weight=0){
    this.vertex = vertex;
    this.weight = weight;
    this.link = null;
   }
   const Graph = function(size){
    this.graph = Array.from({length: size}, (e,i) => new
   Node(String.fromCharCode(65+i)));
    
    const insertNode = (v1, v2, w) => {
    const v1Node = new Node(v1, w);
    const v2Node = new Node(v2, w);
    const v1Idx = v1.charCodeAt(0) - 65;
    const v2Idx = v2.charCodeAt(0) - 65;
    let graph1 = this.graph[v1Idx];
    let graph2 = this.graph[v2Idx];
    if(graph1.link === null){
    graph1.link = v2Node;
    }
    else{
    while(graph1.link !== null){
    graph1 = graph1.link;
    }
    graph1.link = v2Node;
    }
    if(graph2.link === null){
    graph2.link = v1Node;
    }
    else{
    while(graph2.link !== null){
    graph2 = graph2.link;
    }
    graph2.link = v1Node;
    }
    return;
    }
    Graph.prototype.insertEdge = function(v1, v2, w){
    insertNode(v1, v2, w);
    }
    
    Graph.prototype.printGraph = function(){
        //간선 그래프 전체 출력
        for(let i=0; i<size; i++){
        let graph = this.graph[i];
        let print = graph.vertex;
        while(graph.link !== null){
        graph = graph.link;
        print += `--[${graph.weight}]--${graph.vertex}`;
        }
        console.log(print);
        }
        }

        Graph.prototype.getGraph = function(){
        return this.graph;
        }
       }

       // 매개변수: 힙, 그래프, 이동거리(가중치), 방문여부
       const heapPush = (h, g, move, isVisit,root) => {
        // 다음 그래프가 null이 아닐 때 까지 검사
        while(g.link !== null){
        g = g.link; // 가중치 0(자기 자신)은 넣지 않는다.
        // 방문 유무 검사 하기 위해서
        let idx = g.vertex.charCodeAt(0) - 65;
        // 방문 했을 경우, heap에 push하지 않는다.
        if(!isVisit[idx]){
        // g.weight + move: 여태 이동 가중치(move) + 현재 가중치를
        // 더해준다. 나머지도 같다
        if(!h.length) 
        {h.push({v:g.vertex, w:g.weight+move});}
        else{
        if(h[0].w > g.weight){
        let temp = h[0];
        h[0] = {v:g.vertex, w:g.weight+move};
        
        h.push(temp);
        }
        else{
        h.push({v:g.vertex, w:g.weight+move});
        }
        }
        }
        }
       }
       const heapPop = (h) => {
        //최소 힙 구하기!
        const item = h[0];
        const lastItem = h.pop();
        let idx = 0;
        if(!h.length) return item;
        h[0] = lastItem;
        // 자식 노드 유무 확인! 없으면 더 이상 검사 하지 않음!
        while(h[idx*2+1] || h[idx*2+2]){
            let temp = 0;
 // 왼쪽 자식노드 검사
 if(h[0].w > h[idx*2+1].w){
 temp = h[0];
 h[0] = h[idx*2+1];
 h[idx*2+1] = temp;
 idx = idx*2+1;
 }
 // 오른쪽 자식노드 검사!
 else if(h[idx*2+2] && h[0].w > h[idx*2+2].w){
 temp = h[0];
 h[0] = h[idx*2+2];
 h[idx*2+2] = temp;
 idx = idx*2+2;
 }
 // 왼, 오른쪽 자식노드 둘 다 루트 노드보다 클 경우!
 else
 idx++;
 }
 return item;
}
const dijkstra = (start, graph) => {
 const size = graph.length; // 정점 개수!
 const isVisit = new Array(size).fill(false); // 정점 개수 만큼 방문처리 유무를 검사하기 위한 배열
 const dist = []; // 거리 배열
 const heap = []; // 힙
 const root = [];
 for(var i=0; i<17; i++)
 {
     root[i]=[17];
 }
 let move = 0; // 이동 가중치
 let idx = start.charCodeAt(0) - 65; // 현재 인덱스
 let g = graph[idx]; // 현재 그래프
 heap.push({v:g.vertex, w:g.weight}); // 시작 그래프 노드 push
 var i=0;
 while(heap.length){
 g = heapPop(heap); //최소 힙에서 루트노드(최솟 값) 꺼내기!
 idx = g.v.charCodeAt(0) - 65; //방문 유무 검사하기 위한 인덱스
 // 방문 되지 않은 정점에 대해서만 작업을 한다.
 if(!isVisit[idx]){
 isVisit[idx] = true;
 root[i]=g.v;
 move = g.w;
 dist[idx] = move;
 heapPush(heap, graph[idx], move, isVisit,root);
 }
 i++;
 }
 console.log(dist);
 console.log(root[]);

}
const main = (function(){
 const graph = new Graph(6);
 //간선 만들기
 graph.insertEdge("A", "B", 1);
 graph.insertEdge("A", "C", 9);
 graph.insertEdge("B", "C", 10);
 graph.insertEdge("B", "D", 2);
 graph.insertEdge("C", "D", 5);
 graph.insertEdge("C", "E", 1);
 graph.insertEdge("D", "E", 1);
 graph.insertEdge("E", "F", 2);
 //간선 출력
 console.log("간선 출력");
 graph.printGraph();
 //다익스트라 알고리즘 실행!
 console.log("\nF의 최소 경로 출력")
 dijkstra('F', graph.getGraph());
}());
