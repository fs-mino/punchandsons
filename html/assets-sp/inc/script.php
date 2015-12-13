	<script src="//ajax.googleapis.com/ajax/libs/jquery/<?php echo $jquery_version; ?>/jquery.min.js"></script>
	<script>!window.jQuery && document.write('<script src="<?php echo $rocal_path; ?>/js/jquery-<?php echo $jquery_version; ?>.min" charset="utf-8"><\/script>')</script>
	<script src="<?php echo $rocal_path; ?>/js/jquery.easing.1.3.js"></script>
	<script src="<?php echo $rocal_path; ?>/js/utility.js"></script>
	<script src="<?php echo $rocal_path; ?>/js/common.js"></script>
	<?php if( $ie6png == true ): ?>
	<!--[if lte IE 6]>
	<script src="<?php echo $rocal_path; ?>/js/DD_belatedPNG_0.0.8a-min.js"></script>
	<script>
	  DD_belatedPNG.fix('<?php echo $pngselector ?>');
	</script>
	<![endif]-->
	<?php endif; ?>
