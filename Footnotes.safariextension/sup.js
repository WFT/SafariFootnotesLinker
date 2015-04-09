function FOOTNOTE_PROCESS() {
    var sups = document.querySelectorAll("sup");
    var prev_items = [];
    var prev_text = [];

    var is_linked = function(item) {
	var ret = item.parentNode.tagName === "A";
	var children = item.childNodes;
	for (var i = 0, len = children.length; i < len; i++) {
	    if (ret) break;
	    ret = children[i].tagName === "A";
	}
	return ret;
    };

    var gen_id = function(item, name) {
	return "__footnote__" + item.textContent + name;
    }
    
    var link_item = function(item, name, href) {
	item.innerHTML = '<a id="' + gen_id(item, name) +
	    '" href="#' + gen_id(item, href) + '">' +
	    item.innerHTML + '</a>';
    };

    for (var i = 0, len = sups.length; i < len; i++) {
	var item = sups[i];
	var prev_index = prev_text.indexOf(item.textContent);
	if (prev_index == -1) {
	    prev_items.push(item);
	    prev_text.push(item.textContent);
	} else if (!is_linked(item)) {
	    var top = '-top';
	    var bottom = '-bottom';
	    link_item(item, bottom, top);
	    link_item(prev_items[prev_index], top, bottom);
	}
    }
}
FOOTNOTE_PROCESS();
