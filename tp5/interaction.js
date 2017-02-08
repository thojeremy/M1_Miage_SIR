
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.xInit = 0;
	this.yInit = 0;
	this.x = 0;
	this.y = 0;
	
	// Developper les 3 fonctions gérant les événements
	this.drag = function(evt, x, y){
		var pos = getMousePosition(canvas, evt);
	};
	
	this.dragging = function(evt, x, y){
		var pos = getMousePosition(canvas, evt);
	};
	
	this.drop = function(evt, x, y){
		var pos = getMousePosition(canvas, evt);
	};
	
	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener("click", 	this.drag, 		false);
	canvas.addEventListener("hover", 	this.dragging, 	false);
	canvas.addEventListener("mouseUp", 	this.drop, 		false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



