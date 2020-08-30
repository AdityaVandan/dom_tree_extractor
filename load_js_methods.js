var children_to_ignore = Array.from([undefined]);

document.get_css_properties = (element) => {
    var css_properties = getComputedStyle(element);
    var filtered_properties = {
        color: css_properties.color,
        backgroundColor: css_properties.backgroundColor,

        fontWeight: css_properties.fontWeight,
        fontSize: css_properties.fontSize,

        opacity: css_properties.opacity,
        display: css_properties.display,

        textDecoration: css_properties.textDecoration,
        border_bottom: css_properties.borderBottom,
        border_top: css_properties.borderTop
    };
    return filtered_properties;
};

document.get_text_rect = (element) => {
    var range = document.createRange();
    range.selectNode(element);
    var text_rect = range.getBoundingClientRect();
    range.detach();

    return text_rect;
}

document.get_node_obj = (element) => {
    var rect, css_properties

    if (element.tagName == undefined) {
        rect = document.get_text_rect(element);
        css_properties = document.get_css_properties(element.parentElement);
    } else {
        rect = element.getBoundingClientRect();
        css_properties = document.get_css_properties(element);
    }

    var node = {
        tag_name: element.tagName,
        inner_text: element.textContent.trim(),

        id: element.id,
        href: element.href,

        rect: rect,
        css_properties: css_properties,

        // parent: element.parentElement,
        children: Array()
    };

    return node;
};

document.get_child_nodes = (element) => {
    var children = Array.from(element.childNodes);

    //cheching if we have to ignore child nodes
    var unique_tags = Array.from(new Set(children.map(item => item.tagName)));
    var filtered_tags = unique_tags.filter(item => !children_to_ignore.includes(item));

    if (filtered_tags.length == 0) {
        children = Array();
    }

    return children;
}

document.get_inner_tree = (element) => {
    var node = document.get_node_obj(element);

    var children = document.get_child_nodes(element);
    for (each_child of children) {
        node["children"].push(document.get_inner_tree(each_child));
    }

    return node;
};

return document.get_inner_tree(document.querySelector("BODY"));