export type Node = number[]
export type Nodes = Node[]

export function updateNodes(
  nodesArr: Nodes,
  maxX: number | undefined = undefined,
  maxY: number | undefined = undefined
) {
  const nodesToCheck = getNodesToCheck(nodesArr)

  const neighbourNodes = nodesToCheck.map((node) =>
    countNeighbours(nodesToCheck, node)
  )

  const aliveNodes = getAliveNodes(nodesToCheck, neighbourNodes, nodesArr)

  return trimEdges(aliveNodes, maxX, maxY)
}

function getNodesToCheck(nodes: Nodes): Nodes {
  let nodesToCheck: Nodes = []

  nodes.forEach((el) => {
    nodesToCheck = [
      ...nodesToCheck,
      [el[0] - 10, el[1] - 10],
      [el[0] - 10, el[1]],
      [el[0] - 10, el[1] + 10],
      [el[0], el[1] - 10],
      [el[0], el[1]],
      [el[0], el[1] + 10],
      [el[0] + 10, el[1] - 10],
      [el[0] + 10, el[1]],
      [el[0] + 10, el[1] + 10],
    ]
  })

  return nodesToCheck
}

function countNeighbours(nodesToCheck: Nodes, node: Node): number {
  return nodesToCheck.reduce((count, val) => {
    if (JSON.stringify(node) === JSON.stringify(val)) {
      return (count += 1)
    }
    return count
  }, 0)
}

function getAliveNodes(
  nodesArr: Nodes,
  neighbourArr: number[],
  prevNodes: Nodes
) {
  return nodesArr
    .filter((val, i) => {
      if (neighbourArr[i] === 3) {
        return true
      }
      if (neighbourArr[i] === 4) {
        if (
          prevNodes
            .map((el) => JSON.stringify(el))
            .includes(JSON.stringify(val))
        ) {
          return true
        }
      }
      return false
    })
    .reduce<Nodes>((nodes, node) => {
      if (
        nodes.map((el) => JSON.stringify(el)).includes(JSON.stringify(node))
      ) {
        return nodes
      }
      return [...nodes, node]
    }, [])
}

function trimEdges(
  nodesArr: Nodes,
  maxX: number | undefined,
  maxY: number | undefined
) {
  if (maxX || maxY) {
    return nodesArr.reduce<Nodes>((nodes, node) => {
      if (maxX) {
        if (node[0] < 0 || node[0] >= maxX) {
          return nodes
        }
      }
      if (maxY) {
        if (node[1] < 0 || node[1] >= maxY) {
          return nodes
        }
      }
      return [...nodes, node]
    }, [])
  }
  return nodesArr
}
