<?php
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// setting.php
	// DESC : サイト定義
	//
	/////////////////////////////////////////////////////////////////////////////////////////////////////

	// スマホ対応

	// jQuery version
	$jquery_version   = "1.10.2";

	// サイトのタイトル
	$site_title       = "punchandsons";
	$site_description = "punchandsonsとゆかいな仲間たち";
	$site_keywords    = "punchandsons";

	// IE6の透過png対応の有り/無し
	$ie6png           = false; //対応する true / 対応しない false
	$pngselector      = "img"; //透過を効かせるCSSのセレクタ

	// スマホ対応設定
	$telephone        = false; // true : 電話番号への自動リンクを消す
	$viewport         = false; // true : viewportの指定あり

	// google analytics
	$ga = ""; // UAから始まるアカウントを記入

	function is_mobile(){
	    $useragents = array(
	        'iPhone', // iPhone
	        'iPod', // iPod touch
	        // 'iPad', // iPad
	        'Android', // 1.5+ Android *** Only mobile
	        'Windows.*Phone', // *** Windows Phone
	        'dream', // Pre 1.5 Android
	        'CUPCAKE', // 1.5+ Android
	        'blackberry9500', // Storm
	        'blackberry9530', // Storm
	        'blackberry9520', // Storm v2
	        'blackberry9550', // Storm v2
	        'blackberry9800', // Torch
	        'webOS', // Palm Pre Experimental
	        'incognito', // Other iPhone browser
	        'webmate' // Other iPhone browser
	    );

	    $pattern = '/'.implode('|', $useragents).'/i';
			/*
			if(isset($_GET['viewmode'])) {
			$viewmode = $_GET['viewmode'];
			setcookie("viewmode",$viewmode,$timeout,'/','.hogehoge.com'); // ドメイン名変更
			header("Location: /");
			}
			*/
		  if(preg_match($pattern, $_SERVER['HTTP_USER_AGENT']) == true){
		      // if($cookie=$_COOKIE["viewmode"]=="pc"){
		      //     return false;
		      // } else {
		          return true;
		      // }
		  } else {
		      return false;
		  }
	}

?>