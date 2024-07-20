class TreeNode {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {

    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.visualize();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    delete(value) {
        this.root = this.deleteNode(this.root, value);
        this.visualize();
    }
    deleteNode(node, key) {
        if (node === null) {
            return null;
        } else if (key < node.value) {
            node.left = this.deleteNode(node.left, key);
            return node;
        } else if (key > node.value) {
            node.right = this.deleteNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
            return node;
        } else if (node.right === null) {
            node = node.left;
            return node;
        }
        const aux = this.findMinNode(node.right);
        node.value = aux.value;
        node.right = this.deleteNode(node.right, aux.value);
        return node;
    }
}

findMinNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
}
search(value) {
    this.highlightNode(this.root, value);
}
highlightNode(node, value) {
    if (node === null) return false;
    if (node.value === value) {
        document.getElementById(node.value).style.backgroundColor = 'red';
        return true;
    } else if (value < node.value) {
        return this.highlightNode(node.left, value);
    } else {
        return this.highlightNode(node.right, value);
    }
}
visualize() {
    const container = document.getElementById('treeContainer');
	        container.innerHTML = '';
            this.visualizeNode(this.root, container);
        }
            visualizeNode(node, container) {
                if (node !== null) {
                    const nodeElement = document.createElement('div');
	            nodeElement.className = 'node';
	            nodeElement.id = node.value;
            nodeElement.innerText = node.value;

            const leftContainer = document.createElement('div');
	            leftContainer.style.display = 'flex';
	            leftContainer.style.flexDirection = 'column';
	            leftContainer.style.alignItems = 'center';

                const rightContainer = document.createElement('div');
	            rightContainer.style.display = 'flex';
	            rightContainer.style.flexDirection = 'column';
	            rightContainer.style.alignItems = 'center';
                const childrenContainer = document.createElement('div');
	            childrenContainer.style.display = 'flex';
	            childrenContainer.style.justifyContent = 'center';
	            if (node.left !== null) {
	                const leftLine = document.createElement('div');
	                leftLine.className = 'line';
	                leftContainer.appendChild(leftLine);
	                this.visualizeNode(node.left, leftContainer);
	            }
	            if (node.right !== null) {
	                const rightLine = document.createElement('div');
	                rightLine.className = 'line';
	                rightContainer.appendChild(rightLine);
	                this.visualizeNode(node.right, rightContainer);
	            }
	            childrenContainer.appendChild(leftContainer);
	            childrenContainer.appendChild(rightContainer);
	            container.appendChild(nodeElement);
	            container.appendChild(childrenContainer);
	        }
	    }
	}

    const bst = new BST();
function insertNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    bst.insert(value);
    valueInput.value = '';
}
function deleteNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    bst.delete(value);
    valueInput.value = '';
}
function searchNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    bst.search(value);
    valueInput.value = '';
}



