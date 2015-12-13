<?php
error_reporting(E_ALL & ~E_NOTICE);
?>
<?php

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// ページ設定
	//
	/////////////////////////////////////////////////////////////////////////////////////////////////////

	// ルートパス設定
	$rocal_path       = ""; // ルート以外にある場合パスを記述(/から記述)
	$root_path        = $_SERVER['DOCUMENT_ROOT'].$rocal_path;
	// 共通設定読み込み
	include ($root_path."/inc/setting.php");

	// 個別設定
	$page_class       = "page-sub page-contact"; // ページクラスが必要な場合
	$page_title       = "CONTACT"; // ページタイトル
	$page_keywords    = ""; // ページ特有のキーワードがある場合
	$page_description = ""; // ページ特有のdescriptionがある場合

	// OGP 
	$page_type        = "website"; // website or blog *トップページのみ記述
	$page_ogimage     = ""; // og:imageを個別に設定する場合パスを記述

?>
<?php
  $name = htmlentities($_POST["name"]);
  $tel = htmlentities($_POST["tel"]);
  $email = htmlentities($_POST["email"]);
  $company = htmlentities($_POST["company"]);
  $text = htmlentities($_POST["text"]);
  $name_sender="MUTA事務局";

  //メール送信処理
  mb_language('ja');
  mb_internal_encoding('utf-8');
  $from = mb_encode_mimeheader($name_sender)."<".$email.">";
  $reply_to = $from;
  $to = 'nishimura@fsimg.jp';
  $header = "From: $from\n";
  $header .= "Reply-To: $reply_to\n";
  $header .= "X-Mailer: myphpMail ". phpversion(). "\n";
  $subject = "【MUTA】お問い合わせフォーム";
  $message = "お問い合わせフォームに、以下のお問い合わせがありました。\n\n\n\nお名前　$name \n\n電話番号　$tel \n\n Eメール　$email \n\n 会社名　$company\n\nお問い合わせ内容　\n$text";
  mb_send_mail($to, $subject, $message, $header);

  //自動返信処理
  mb_language('ja');
  mb_internal_encoding('utf-8');
  $from2 = mb_encode_mimeheader($name_sender)."<".$email.">";
  $reply_to2 = $from2;
  $to2 = $email;
  $header2 = "From: $from\n";
  $header2 .= "Reply-To: $reply_to\n";
  $header2 .= "X-Mailer: myphpMail ". phpversion(). "\n";
  $subject2 = "【MUTA】お問い合わせありがとうございます";
  $message2 = "この度はお問い合わせいただきまして、\n誠にありがとうございます。\n以下の内容で送信されました。\n\n担当者より追ってご連絡差し上げますので、今しばらく待ちくださいませ。\n\n\nお名前：$name \n\n電話番号：$tel \n\nEメール：$email\n\n会社名：$company\n\nお問い合わせ内容：\n$text";
  mb_send_mail($to2, $subject2, $message2, $header2);
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
<?php include ($root_path."/inc/meta.php");	?>
<?php // 個別CSSなど  ?>
</head>
<body<?php if ($page_class): ?> class="<?php echo $page_class ?>"<?php endif; ?>>
	<?php 
		/////////////////////////////////////////////////////////////////////////////////////////////////////
		// ページ内容ここから
		/////////////////////////////////////////////////////////////////////////////////////////////////////
	?>
	<?php include ($root_path."/inc/header2.php"); ?>
	<div id="wrapAll">

	<div id="breadcrumb">
	<ul>
	  <!-- <li>TOP</li> -->
	  <li><a href="../">TOP</a><span>&gt;</span></li>
	  <li>CONTACT</li>
	</ul>
	</div>
	<div id="main">
	<section id="content">
      <div class="section_wrap">
      <h2 class="ttl03"><span><img src="../img/contact/ttl.png" alt="CONTACT" height="18"></span></h2>           
      <div class="content_box">
      <p class="read tar">送信が完了しました。お問い合わせいただきありがとうございます。<br />
ご入力いただいたメールアドレス宛に自動確認メールが届きますので、<br />
お問い合わせ内容を今一度ご確認ください。
</p>
       <div class="box-btn">
        <a href="/" class="btn-finish"> <img src="../img/contact/btn-finish.gif" alt="" width="156" height="42"></a>
      </div>
      </div>
     
  </div>
  </section><!-- #content -->	
	<a href="javascript:void(0);" id="totop"><span><img src="/img/common/totop.png" alt="TO TOP" width="37" height="10"></span></a>
	</div><!-- #main -->
	</div>
	<?php include ($root_path."/inc/footer.php"); ?>
	<?php 
		/////////////////////////////////////////////////////////////////////////////////////////////////////
		// ページ内容ここまで
		/////////////////////////////////////////////////////////////////////////////////////////////////////
	?>	
<?php include ($root_path."/inc/script.php"); ?>
<script src="/js/body100.js"></script>


</body>
</html>