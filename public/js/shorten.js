/*
 * Adapted from
 * jQuery Shorten plugin 1.0.0
 *
 * Copyright (c) 2013 Viral Patel
 * //viralpatel.net
 */

(function ($) {
  $.fn.shorten = function (settings) {

    var config = {
      showChars: 100,
      ellipsesText: "... ",
      moreText: "more",
      lessText: "less"
    };

    if (settings) {
      $.extend(config, settings);
    }

    $(document).off("click", '.morelink');

    return this.each(function () {
      var $this = $(this);
      if ($this.hasClass("shortened")) return;

      $this.addClass("shortened");
      var content = $this.html();
      let postId = $(this).attr("value");
      let aHrefPostId = `<a href="/post/${postId}"`;

      // If content is longer than show chars limit
      if (content.length > config.showChars) {
        let contentShown = content.substr(0, config.showChars);
        let hideContent = content.substr(
          config.showChars,
          content.length - config.showChars
        );

        var html = `${contentShown} <span class="moreellipses">
          ${config.ellipsesText} </span>
          <span class="morecontent"><span>
          ${hideContent} </span> ${aHrefPostId} class="morelink">
          ${config.moreText} </a></span>`;

        $this.html(html);

        $(".morecontent span").hide();
      }
    });

  };

})(jQuery);