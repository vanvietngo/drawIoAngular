var dataPlugin = "hahahahaha"

/**
 * Sample plugin.
 */
Draw.loadPlugin(function (ui) {
	// console.log("this is plugin òf Viet in draw IO")

	var div = document.createElement('div');
	div.style.background = (uiTheme == 'dark') ? '#2a2a2a' : '#ffffff';
	div.style.border = '3px solid gray';
	div.style.opacity = '0.8';
	div.style.position = 'absolute';
	div.style.padding = '10px';
	div.style.paddingTop = '0px';
	div.style.width = '23%';
	div.style.minWidth = '200px';
	div.style.top = '40px';
	div.style.right = '20px';

	var graph = ui.editor.graph;

	// Made for chromeless mode
	if (!ui.editor.isChromelessView()) {
		div.style.top = '100px';
		div.style.right = '260px';
	}

	div.innerHTML = '<p><i #json-string-display>inform Cells</i></p>';
	document.body.appendChild(div);



	// console.log("Test send message in plugin.js")

	// Highlights current cell

	function getNodesFrom(graph) {
		var cells = graph.getModel().cells;
		// console.log("cells = " + JSON.stringify(cells))
		var vertices = [], edges = [];
		for (var key in cells) { // loop each object in array cells - viet cmt
			// console.log("key in cells = "+key)// key : id of each cell ; 

			if (cells[key].isVertex()) {
				vertices.push(cells[key]);
				// console.log("vertices[key]"+JSON.parse(JSON.stringify(cells[key])))// key : id of cell ; 
			}
			else if (cells[key].isEdge()) {
				edges.push(cells[key]);
				// console.log("edges = ============== " + key)
			}

		}
		var simpleVertices = [], simpleEdges = [];
		vertices.forEach(
			function (vertex) {
				// console.log("vertex.value = "+vertex.value)

				// simpleVertices.push({id: vertex.id, label: vertex.value});

				// 
				// -- my code --
				var attrs = (vertex.value != null) ? vertex.value.attributes : null;
				var obj_name_attr = [];
				var obj_value_attr = [];
				var objAttr = {}
				if (attrs != null) {
					// console.log("attribute not null")
					var ignored = ['label', 'tooltip', 'placeholders'];

					//loop cell for load all attribute
					for (var i = 0; i < attrs.length; i++) {
						if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 &&
							attrs[i].nodeValue.length > 0) {
							obj_name_attr.push(graph.sanitizeHtml(attrs[i].nodeName))
							obj_value_attr.push(graph.sanitizeHtml(attrs[i].nodeValue))

							// div.innerHTML += '<h2>' + graph.sanitizeHtml(attrs[i].nodeName) + '</h2>' +
							// 	'<p>' + graph.sanitizeHtml(attrs[i].nodeValue) + '</p>';
						}
					}
					for (var i = 0; i < obj_name_attr.length; i++) {
						objAttr[obj_name_attr[i]] = obj_value_attr[i];
					}
					simpleVertices.push({ id: vertex.id, label: graph.convertValueToString(vertex), attributes: objAttr });

					// console.log("obj atrs = " +JSON.stringify(objAttr) )
					// console.log("label = " +JSON.stringify(vertex.value) )
				} else {
					simpleVertices.push({ id: vertex.id, label: graph.convertValueToString(vertex), attributes: "null" });
					// console.log("attribute null")		
				}
			});
		// console.log("simpleVertices = " +JSON.parse(JSON.stringify( simpleVertices)) )
		// -------------------------------------------------
		// edges.forEach(function(edge){
		// 	if (edge.target === null || edge.source === null) return;
		// 	simpleEdges.push({
		// 		parentId: newIndexOf[edge.source.id], 
		// 		childId: newIndexOf[edge.target.id], 
		// 		value: edge.value
		// 	});
		// });
		return simpleVertices;
	}

	// console.log("hehe")
	getNodesFrom(graph)

	function updateJsonStringDisplay() {
		div.innerHTML = '<p><i #json-string-display>inform Cells</i></p>';

		for (let i = 0; i < getNodesFrom(graph).length; i++) {
			// console.log(i)
			div.innerHTML += '<p><b>' + JSON.stringify(getNodesFrom(graph)[i]) + '</b></p>';

		}
		// div.innerHTML = '<p><i >'+JSON.stringify( getNodesFrom(graph))+'</i></p>';
	}

	updateJsonStringDisplay();
	/* Update json string on screen whenever there is a change to the graph's model */
	var count = 0;
	graph.model.addListener(mxEvent.CHANGE, function (sender, evt) {
		updateJsonStringDisplay();
		console.log("co change event plugin " + count)
		count++
		var dataCells = JSON.stringify(getNodesFrom(graph))
		// post to angular
		// window.parent.postMessage(JSON.stringify({
		// 	event: "dataCells",
		// 	dataCells: dataCells
		// }), '*')
		// post in draw
		// window.postMessage(JSON.stringify({
		// 	event: "dataCells",
		// 	dataCells: dataCells
		// }), '*')
	});
	var n = 1
window.addEventListener("message", function (evt) {
	console.log("event at draw IO = " + JSON.stringify(evt.data))
	if (evt.data.length > 0) {
		var msg = JSON.parse(evt.data);
		// console.log("window draw nhan dc event " + JSON.stringify(msg))

		if (msg.event == "updateCells" && n == 1) {
			n++
			
			console.log("nhan dc event update Cells")
			console.log("id change = "+msg.data.id)

			//
			
			// get cell 
			// var vertex = graph.getModel().getCell(msg.data.id)
			var vertex = graph.getModel().getCell("308")

			// check case
			if(vertex.value.attributes != null){
				console.log("attribute not nullllllllllllllllllll" + vertex.value)
			// 				// set value change
			// var previous = vertex.value.getAttribute('label');
			// vertex.value.setAttribute('hihi', msg.data.label);
			// 			console.log("value change vuet = "+previous)
			// graph.getModel().remove(vertex)
										var doc = mxUtils.createXmlDocument();
						var node = doc.createElement('myNodeeeee')
						node.setAttribute('label', 'viet 123456');
						node.setAttribute('name', 'hihi');
						// console.log(node.value)
						graph.insertVertex(graph.getDefaultParent(), null, node, 40, 40, 80, 30);	
			}
			else{
				// attribute 
				console.log("attribute  nullllllllllllllllllll" + vertex.value)

				vertex.setValue("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
			}


			
		}
	}
})
	


	// console.log(graph.getCell)
	// function UpdateCells() {
	// 	window.addEventListener("message", function (evt) {
	// 		console.log("event at plugin = " + JSON.stringify(evt.data))
	// 		if (evt.data.length > 0)
	// 		// console.log("plugin  nhan dc event")
	// 		{
	// 			var msg = JSON.parse(evt.data);
	// 			if (msg.event == "updateCells") {
	// 				console.log("nhan dc event update Cells")
	// 			}
	// 		}
	// 	})
	// };

	// UpdateCells()
	// window.parent.addEventListener("message", function (evt) {
	// 	console.log("event at plugin = " + JSON.stringify(evt.data))
	// 	if (evt.data.length > 0)
	// 	// console.log("plugin  nhan dc event")
	// 	{
	// 		var msg = JSON.parse(evt.data);
	// 		if (msg.event == "updateCells") {
	// 			console.log("nhan dc event update Cells")
	// 		}
	// 	}
	// })
});

// listen at draw
// can listen in draw
//can't listen angular

// window.addEventListener("message", function (evt) {
// 	console.log("event at draw IO = " + JSON.stringify(evt.data))
// 	if (evt.data.length > 0) {
// 		var msg = JSON.parse(evt.data);
// 		console.log("window draw nhan dc event " + JSON.stringify(msg))
// 		if (msg.event == "angularPost") {
// 			console.log("nhan dc event update Cells")
// 		}
// 	}
// })

							// var doc = mxUtils.createXmlDocument();
						// var node = doc.createElement('myNodeeeee')
						// node.setAttribute('label', 'viet 123456');
						// node.setAttribute('name', 'hihi');
						// graph.insertVertex(graph.getDefaultParent(), null, node, 40, 40, 80, 30);	