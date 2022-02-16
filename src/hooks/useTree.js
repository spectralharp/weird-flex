import { useState } from 'react';

/**
 * A hook for a tree structure
 * @param {Object} initialState - initial state of the root of the tree
 * @returns
 */
export function useTree(initialState) {

  const [root, setRoot] = useState(initialState);

  /**
   * Get node from the tree with it's key
   * @param {string} nodeKey - key of the node
   * @returns
   */
  function getNode(nodeKey) {
    if(nodeKey === null) return null;

    // Get the path to the box from the key
    let path = nodeKey.split('').map(x => parseInt(x));

    // The first node maps to the root, so we just shift it and grab the root
    path.shift();
    let current = root;

    // Traverse
    while(path.length > 0) {
      if(!current || !current.nodes) {
        // If we get null, or nodes is not defined, key is malformed and we return null
        return null;
      }
      current = current.nodes[path.shift()];
    }
    return current;
  }


  function addChildNode(nodeKey) {
    if(nodeKey === null) return null;

    // Copy the box so we don't mutate the original
    const newRoot = {...root};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newRoot;

    while(path.length > 0) {
      current = current.nodes[path.shift()];
    }

    // Add new node
    if(!current.nodes) {
      current.nodes = [];
    }

    current.nodes.push({});

    setRoot(newRoot);
  }

  function updateNode(nodeKey, updated) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newRoot = {...root};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newRoot;

    // If there's no path, we're changing the root itself
    if(path.length === 0) {
      setRoot(updated);
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.nodes[path.shift()];
      }

      // Change it to updated;
      current.nodes[path.shift()] = updated;
      setRoot(newRoot);
    }
  }

  function removeNode(nodeKey) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newRoot = {...root};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newRoot;

    // If there's no path, we're removing the root itself, don't
    if(path.length === 0) {
      console.error('Cannot remove root node');
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.nodes[path.shift()];
      }

      // Splice the node we want to remove in place
      current.nodes.splice(path.shift(), 1);
      setRoot(newRoot);
    }
  }

  function duplicateNode(nodeKey) {
    if(nodeKey === null) return;

    // Copy the box so we don't mutate the original
    const newRoot = {...root};

    let path = nodeKey.split('').map(x => parseInt(x));

    path.shift();
    let current = newRoot;

    // If there's no path, we're duplicating the root itself, don't
    if(path.length === 0) {
      console.error('Cannot duplicate root node');
    } else {
      // We go down the path
      while(path.length > 1) {
        current = current.nodes[path.shift()];
      }

      // Push a node that is the same as this one
      try {
        const newNode = JSON.parse(JSON.stringify(current.nodes[path.shift()]));
        current.nodes.push(newNode);
        setRoot(newRoot);
      } catch (e) {
        console.error('Failed to clone node', e);
      }
    }
  }

  const treeOperations = {
    getNode, updateNode, removeNode, duplicateNode, addChildNode
  }

  return [root, treeOperations];
}