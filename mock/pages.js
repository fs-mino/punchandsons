function Pages( _elem,_elem2, _cb ) { this.init( _elem,_elem2, _cb ); }

Pages.prototype = {

	// ( pages elements, cur page onload callback )
	init: function( _elem,_elem2, _page_call_back ) {
		this.elem       = _elem;
		this.wrap_elem  = _elem2;
		this.cb         = _page_call_back? _page_call_back : [];
		this.last       = _elem.length;
		this.cur        = 0;
		this.setPage(0);
	},

	// ( pageNo )
	setPage: function( _page ) {

		this.cur = _page % this.last;

		if ( this.cb[ this.cur ] ) this.cb[ this.cur ]();

		var _class = this.wrap_elem.getAttribute('class');
		_class  = _class.replace(/\s?cur.*/g,'');
		_class = this.wrap_elem.setAttribute('class', _class + ' cur'+this.cur);

		for (var _i = 0; _i < this.last; _i++) {

			var _class = this.elem[_i].getAttribute('class');

			_class  = _class.replace(/\s?cur/g,'');
			_class += (_i == this.cur)? ' cur' : '';

			this.elem[_i].setAttribute('class',_class);
		}
		console.log( 'page: ' + eval( this.cur + 1 ) + ' / ' + this.last )
	},

	prevPage: function( ) {
		this.setPage( this.cur - 1 );
	},

	nextPage: function( ) {
		this.setPage( this.cur + 1 );
	}

}