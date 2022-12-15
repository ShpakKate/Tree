function createElement(tagName, classList) {
    const element = document.createElement(tagName);
    for (el of classList) {
      element.classList.add(el);
    }
    return element;
    }

function getElement(item) {
    const wrapper = createElement('div', ['open', 'node']);
    let title = document.createElement('span');

    title.innerHTML = item.title;
    wrapper.appendChild(title);

    if (item.nodes.length > 0) {

        const nodes = createElement('div', ['close-container']);

        for ( let i = 0; i < item.nodes.length; i++) {
            nodes.appendChild(getElement(item.nodes[i]));
        }
        const button = createElement('button', ['button']);

        wrapper.prepend(button);
        wrapper.appendChild(nodes);

        if (wrapper) {
            title.className = 'full';
        }
    }
    return wrapper;
}

function onReady() {
    let treeNode = document.querySelector('.tree');

    const arrTree = [
        {
            "title": 'parent1',
            "nodes": [
                {
                    "title": 'parent1.1',
                    "nodes": [
                        {
                            "title": 'parent1.1.1',
                            "nodes": [
                                {
                                    "title": 'child1.3',
                                    "nodes": [
                                        {
                                            "title": 'child1.3.1',
                                            "nodes": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": 'child1.2',
                            "nodes": [
                                {
                                    "title": 'child1.2.1',
                                    "nodes": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": 'child1.1',
                    "nodes": [
                        {
                            "title": 'child1.1.1',
                            "nodes": []
                        }
                    ]
                }
            ]
        },
        {
            "title": 'child2',
            "nodes": [
                {
                    "title": 'child2.1',
                    "nodes": []
                }
            ]
        }
    ];

    for (elem of arrTree) {
        treeNode.appendChild(getElement(elem));
    }

    treeNode.addEventListener('click', event => {

        console.log(event.target.classList.contains('full'))

        if (event.target.classList.contains('full') || event.target.classList.contains('button')) {
            if (event.target.parentNode.classList.contains('open')) {
                event.target.parentNode.classList.remove('open');
                event.target.parentNode.classList.add('close');
            } else {
                event.target.parentNode.classList.remove('close');
                event.target.parentNode.classList.add('open');
            }
        }
    })

}
if (document.readyState !== "loading") {
    onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
} else {
    document.addEventListener("DOMContentLoaded", onReady);
}