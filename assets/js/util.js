function navList(element) {
    let a = element.querySelectorAll('a'),
        b = [];

    a.forEach(function(aItem) {
        let indent = Math.max(0, getParentCount(aItem, 'li')),
            href = aItem.getAttribute('href'),
            target = aItem.getAttribute('target');

        b.push(
            '<a ' +
                'class="link depth-' + indent + '"' +
                ( (typeof target !== 'undefined' && target !== '') ? ' target="' + target + '"' : '') +
                ( (typeof href !== 'undefined' && href !== '') ? ' href="' + href + '"' : '') +
            '>' +
                '<span class="indent-' + indent + '"></span>' +
                aItem.textContent +
            '</a>'
        );
    });

    return b.join('');
};

function getParentCount(el, tagName) {
    let count = 0;
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName.toLowerCase() === tagName) {
            count++;
        }
    }
    return count;
}
