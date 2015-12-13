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
function check_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
 }

$name = (isset($_POST['name'])) ? check_input($_POST['name'] ): "";
$tel = (isset($_POST['tel'])) ? check_input($_POST['tel'] ): "";
$email = (isset($_POST['email'])) ? check_input($_POST['email'] ): "";
$company = (isset($_POST['company'])) ? check_input($_POST['company'] ): "";
$text = (isset($_POST['text'])) ? check_input($_POST['text'] ): "";


  //入力チェック
  $errormsg = array();
  //名前
  if ($name == null) {
    $errormsg[] = "NAMEを入力してください。";
  }
  if ($email == null) {
    $errormsg[] = "E-MAILを入力してください。";
  }
$ret = preg_match("/^[a-zA-Z0-9_\.\-]+?@[A-Za-z0-9_\.\-]+$/", $email);
  if (!$ret) {
    $errormsg[] = "E-MAILを正しい形式で入力して下さい。";
  }
  //内容
  if ($text == null) {
    $errormsg[] = "MESSAGEを入力して下さい。";
  }
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
<meta name="robots" content="nofollow" />
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
      <p class="read">下記フォームにご入力の上、[送信する]をクリックしてください。<br />
      お問い合わせ内容については、後日担当よりご連絡させていただきます。</p>
		
        <!-- shoplist -->
        <div class="content_box">
            <p class="caution"><span></span><em>必須項目</em></p>
            <form action="confirm.php" method="post">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="form-style">
              <tr>
              <th><em>NAME</em><span></span></th>
              <td nowrap> <input type="text" name="name" class="form-01" value="<?php print($_POST["name"]); ?>">
              </td>
              </tr>
              <tr>
              <th><em>E-MAIL</em><span></span></th>
              <td>
              <input type="text" name="email" class="form-02" value="<?php print($_POST["email"]); ?>">
              </td>
              </tr>
              <tr>
              <th><em>TEL</em></th>
              <td>
              <input type="text" name="tel" class="form-03" value="<?php print($_POST["tel"]); ?>">
              </td>
              </tr>
              <tr>
              <th><em>COMPANY</em></th>
              <td>
              <input type="text" name="company" class="form-04" value="<?php print($_POST["company"]); ?>">
              </td>
              </tr>
              <th class="form-textarea"><em>MESSAGE</em><span></span></th>
              <td>
              <textarea name="text" class="form-05" rows="5"><?php print($_POST["text"]); ?></textarea>
              </td>
              </tr>
              </table>
              <div class="box-btn">
                <a class="form-btn" href="./"><img src="../img/contact/btn-reset.gif" alt="RESET" width="156" ></a>
                <p class="form-btn"><input type="image" border="0" name="imageField" src="../img/contact/btn_confirm.gif" width="156" alt="SUBMIT"></p>
                <input type="hidden" name="act" value="conf">
              </div>
              </form>
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

</body>
</html>