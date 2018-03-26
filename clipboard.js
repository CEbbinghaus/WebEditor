function Clipboard(){
	this.target = document.createElement('textarea');
	this.target.style.position = 'fixed';
	this.target.style.left = '-100%';
	this.target.setAttribute('readonly', '');
	document.body.appendChild(this.target);
	/*
	*	Must be triggered by the user
	*	text - text that you want to be copied
	*/
	this.copy = function(text){
		this.target.innerHTML = text;
		this.target.focus();
		this.target.select();
		if(!document.execCommand("copy")){
			prompt("Copy this.", text);
			return false;
		}
		return true;
	}.bind(this);
}
