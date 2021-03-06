function Pattern ( _ ) { this.init( _ ); }

Pattern.prototype = {

	SENS : 80,

	CELL_COLOR : [
		'rgba(255, 159, 022,1)',
		'rgba(245, 189, 071,1)',
		'rgba(000, 161, 155,1)',
		'rgba(129, 211, 185,1)',
		'rgba(177, 227, 227,1)',
		'rgba(138, 226, 209,1)',
		'rgba(163, 227, 094,1)',
		'rgba(038, 129, 158,1)',
		'rgba(112, 122, 207,1)',
		'rgba(124, 163, 220,1)',
		'rgba(255, 153, 167,1)',
		'rgba(096, 167, 229,1)',
		'rgba(255, 242, 127,1)',
		'rgba(255, 221, 000,1)',
		'rgba(255, 093, 096,1)',
		'rgba(183, 233, 114,1)'  ],

	DOT_COLOR : [
		'rgba( 255 , 255, 200, 1)',
		'rgba(   0 , 255, 255, 1)',
		'rgba( 255 ,   0,   0, 1)',
		'rgba(   0 , 255,   0, 1)'],

	init: function( _ ) {
		var _self = this;
		_self.d = [];
	},

	loadPunchCard: function( _pc_img_uri, _callback ) {
		var _self = this;

		try {

			var reader = new FileReader();
			reader.readAsDataURL(_pc_img_uri);

			reader.onload = function(evt){

				var _img_elem = document.getElementById('tmb');
				var _img = new Image();

				_img.src = evt.target.result;
				_img.onload = function() {
					_self.getChange( _img );
					_callback();
				}

			}


		} catch(e) {

			console.error('pattern faild:',e);
		}

	},

	getChange: function( _img_obj ) {

		var _self      = this;
		var _wrap_elem = document.getElementById( 'cnv' );
		var _cnv       = document.createElement( 'canvas' );
		var _ctx       = _cnv.getContext('2d');
		var _corner    = [];

		var _divide_by      = [13,5];
		var _punch_data_bit = [];
		var _punch_data     = [];
		var _bits_per_bite  = 4;

		_cnv.setAttribute( 'height' , 130 );
		_cnv.setAttribute( 'width' , 200 );
		_cnv.style.display = 'none';

		// get cell data
		function getCellData( _ctx, _x, _y, _cnr, _divby ) {

			try {

				var _point = [[],[]];

				for (var _i = 0; _i < 4; _i++) {
					var _xy = _i % 2;
					var _tb = Math.floor( _i / 2);
					var _val = _cnr[ _tb * 2 ][ _xy ] + ( ( _cnr[ _tb * 2 + 1 ][ _xy ] - _cnr[ _tb * 2 ][ _xy ]) * ( _x / _divby[0] ) );
					_point[_tb][_xy] = _val;
				}

				var _pos = {
					x: _point[0][0] + ( (_point[1][0] - _point[0][0]) * ( _y / _divby[1]) ),
					y: _point[0][1] + ( (_point[1][1] - _point[0][1]) * ( _y / _divby[1]) ) };

				var _val = _ctx.getImageData( _pos.x, _pos.y, 1, 1)['data'][0];

				_ctx.fillStyle =  _self.DOT_COLOR[ _val < _self.SENS? 2 : 3 ];

				_ctx.fillRect( _pos.x - 1, _pos.y - 1, 2, 2 );
				_ctx.fillRect( _pos.x - 1, _pos.y - 1, 2, 2 );

				return _val < _self.SENS? 1 : 0;
			}catch( e ){
				console.log('error');
				return 0;
			}

		}

		_ctx.fillStyle = _self.DOT_COLOR[0];

		_ctx.drawImage( _img_obj, 0, 0, 200, 130 );


		if (_wrap_elem) _wrap_elem.appendChild( _cnv );

		_ctx.fillStyle = _self.DOT_COLOR[1];

		for (var _c = 0; _c < 4; _c++) {

			var _std = {
				x: _c % 2 * 199,
				y: Math.floor(_c / 2) * 129};

			var _dir = {
				x: ( ( _c + 1 ) % 2 * 2 ) -1,
				y: ( Math.floor( ( _c ) / 2 ) * 2 - 1 ) };

			pxLoop: for (var _dist = 0; _dist < 120; _dist++) {

				for (var _x = 0; _x < _dist + 1; _x++) {

					var _pos = [
						( _x * _dir.x ) + _std.x,
						( _x * _dir.y ) + (_dist * _dir.y * -1 )   + _std.y];

					var _val = _ctx.getImageData( _pos[0], _pos[1], 1, 1)['data'][0];

					if ( _val < _self.SENS ) {

						_corner.push( _pos );
						_ctx.fillRect( _pos[0]-2, _pos[1]-2, 4, 4 );
						break pxLoop;

					}
				}
			}
		}

		for (var _i = 1; _i < 5; _i++) {

			for (var _j = 1; _j < 13; _j++) {
				_punch_data_bit.push( getCellData( _ctx, _j, _i, _corner, _divide_by ) );
			}
		}

		var _cells_len = Math.floor( _punch_data_bit.length / _bits_per_bite );

		for (var _i = 0; _i < _cells_len; _i++) {

			var _no = 0;

			for (var _j = _bits_per_bite-1; _j >= 0; _j--) {
				_no += _punch_data_bit[_i*4+_j] * Math.pow(10,_j);
			}
			_punch_data.push(parseInt(_no,2));
		}

		_self.d = _punch_data;

	},


	// return pattern uri image
	getPattern: function( _size ) {

		var _self         = this;
		var _wrap_elem    = document.getElementById( 'cnv' );
		var _cnv_elem     = document.createElement( 'canvas' );
		var _ctx          = _cnv_elem.getContext( '2d' );
		var _cell_img     = [];
		var _cell_img_len = 16;
		var _data         = this.getPatternArr();

		var _size_x       = _size? _size: 60;
		var _size_y       = Math.round( _size_x / Math.sqrt( 3 ) );

		_cnv_elem.setAttribute( 'height', _size_y * 4 );
		_cnv_elem.setAttribute( 'width' , _size_x * 2 );

		for (var _i = -1; _i < 3; _i++) {

			var _pure_i = _i + 1;
			var _tri_pos = _pure_i % 2 == 0? [ 0, _size_x * -0.5] : [ _size_x * -0.5, 0];
			var _tri_dir = _pure_i % 2 == 0? 1 : 0;

			for (var _j = -2; _j < 3; _j++) {

				var _idx = Math.abs( _j ) + (Math.abs( Math.floor(_i /2) ) * 3);

				_ctx.fillStyle = _self.CELL_COLOR[ _data[_idx] ];

				_ctx.beginPath();
				_ctx.moveTo( 1000, _pure_i * _size_y );
				_ctx.lineTo( _tri_pos[0], _pure_i* _size_y );
				_ctx.lineTo( _tri_pos[1], ( _pure_i + 1 ) * _size_y );
				_ctx.lineTo( 1000, ( _pure_i + 1 ) * _size_y );
				_ctx.closePath();
				_ctx.fill();

				_tri_pos[ ( _j + 2 + _tri_dir ) % 2 ] += _size_x;
			}
		}
		var _uri = _cnv_elem.toDataURL("image/png");

		return _uri;

	},

	// comment
	getPatternArr: function() {
		return this.d;
	}

}
