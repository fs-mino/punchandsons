var pattern;
var pages;

// 各ページが読み込まれる時に実行されるコールバック関数

var pageLoadCallback = [

		// ページ 1
		null,

		// ページ 2
		null,

		// ページ 3
		function() {

			// 柄をPatternオブジェクトに登録
			pattern = new Pattern();
			var input_elem = document.getElementById('file');

			input_elem.onchange = function() {
				pattern.loadPunchCard( input_elem.files[0], callback_stmt );
			}

			function callback_stmt() {
				var _pat_arr = pattern.getPatternArr();
				if ( _pat_arr ) {
					alert( '読み取り完了！' );
					pages.nextPage();
				} else {
					alert( '読み込めませんでした… orz.' );
				}
			}
		},

		// ページ 4
		function() {

			// 柄を取得し、img要素に突っ込む
			var _pattern_img = pattern.getPattern(200);

			document.getElementById('pattern_preview').setAttribute('src',  _pattern_img );
			var _bgpat_wrap_elem   = document.getElementById('print_patbg');
			var _echo = '';
			for (var _i = 0; _i < 200; _i++) {
				_echo += '<img src="' + _pattern_img + '">';
			}
			_bgpat_wrap_elem.innerHTML = _echo;

			document.getElementById('preview_patbg').style.background = 'url(' + pattern.getPattern(102) + ')';

		},

		// ページ 5
		null

	];

pages   = new Pages(
	document.getElementsByClassName('page'),
	document.getElementsByClassName('pageWrap_inner')[0],
	pageLoadCallback );


// 次ページ
function nextPage() {
	pages.nextPage();
}

// 動物の種類をセット
function setAnimal(_img_no) {
	document.getElementById('print_mask_img').setAttribute('src','img/mask' + _img_no + '.png');
	pages.nextPage();
}