/**
 * These functions help scrape the docs from the website.
 * 
 * This is incomplete! Do a quick sanity check to make sure you're getting the data you expect.
 */
function getJson() {
    var attrs = getAttributes();
    var args = getArguments();
    var resourceName = getCurrentResourceName();
    return {
        name: resourceName,
        attrs,
        args
    };
}

function getAttributes() {
    return getContentsInFollowingUL("attributes-reference");
}

function getArguments() {
    return getContentsInFollowingUL("argument-reference");
}

function getCurrentResourceName() {
    return document.querySelector(".docs-sidenav li ul li.active").innerText.replace("\n", "");
}

function getContentsInFollowingUL(precedingElId) {
    var argumentsEl = document.getElementById(precedingElId);
    if (argumentsEl) {
        var children = argumentsEl.parentElement.children;
        var argUl;
        for (var i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.id == precedingElId) {
                var notFound = true;
                while (notFound) {
                    i++;
                    let child = children[i];
                    if (i > children.length) {
                        console.log("Got past the end");
                        return [];
                    }
                    if (child && child.tagName == "UL") {
                        notFound = false;
                    } else if (child && child.tagName == "A") {
                        console.log("Seems like we're skipping a UL for this one");
                        return [];
                    }
                }
                argUl = children[i];
                break;
            }
        }

        if (!argUl) {
            console.log("No proceeding ul");
            return [];
        }

        var lis = argUl.children;
        // debugger;
        var argsFinal = [];
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            var name = li.querySelector("a code").innerText;
            var description = li.innerText;
            description = description.substr(name.length + 3);
            argsFinal.push({ name, description });
        }
        console.log("About to return");
        return argsFinal;
    }
    console.log("None found");
    return [];
}