const scrollTo = (eles, opts) => {
    opts = opts || {};
    opts.duration = opts.duration || 400;
    opts.delay = opts.delay || 100;
    opts.offset = opts.offset || 0;

    const headerHeight = $('#header').outerHeight(true);

    $('html,body').delay(opts.delay).animate({
        scrollTop: $(eles).offset().top - (opts.offset + headerHeight)
    }, opts.duration);
};

export default scrollTo;