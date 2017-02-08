
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	
	// onInteractionStart
	this.onInteractionStart = function(dnd){
		
		var shape = (this.currentShape == editingMode.line ? 
						new Line(x0,y0,x1,y1,this.currLineWidth,this.currColour)
						:
						new Rectangle(x0,y0,x1,y1,this.currLineWidth,this.currColour));
		drawing.addForm(shape);
		drawing.paint(ctx);
	};
	
	// onInteractionUpdate
	this.onInteractionUpdate = function(dnd){
		
	};
	
	// onInteractionEnd
	this.onInteractionEnd = function(dnd){
		
	};
};


