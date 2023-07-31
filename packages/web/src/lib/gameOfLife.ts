export type Node = number[]
export type Nodes = { node: Node; initialisedOnStep: boolean }[]
export type NodesHistory = Nodes[][]

export function updateNodes(nodesArr: Node[], maxX?: number, maxY?: number) {
  const nodesToCheck = getNodesToCheck(nodesArr)

  const neighbourNodes = nodesToCheck.map((node) =>
    countNeighbours(nodesToCheck, node),
  )

  const aliveNodes = getAliveNodes(nodesToCheck, neighbourNodes, nodesArr)

  return trimEdges(aliveNodes, maxX, maxY)
}

function getNodesToCheck(nodes: Node[]): Node[] {
  let nodesToCheck: Node[] = []

  nodes.forEach((el) => {
    nodesToCheck = [
      ...nodesToCheck,
      [el[0] - 1, el[1] - 1],
      [el[0] - 1, el[1]],
      [el[0] - 1, el[1] + 1],
      [el[0], el[1] - 1],
      [el[0], el[1]],
      [el[0], el[1] + 1],
      [el[0] + 1, el[1] - 1],
      [el[0] + 1, el[1]],
      [el[0] + 1, el[1] + 1],
    ]
  })

  return nodesToCheck
}

function countNeighbours(nodesToCheck: Node[], node: Node): number {
  return nodesToCheck.reduce((count, val) => {
    if (JSON.stringify(node) === JSON.stringify(val)) {
      return (count += 1)
    }
    return count
  }, 0)
}

function getAliveNodes(
  nodesArr: Node[],
  neighbourArr: number[],
  prevNodes: Node[],
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
    .reduce<Node[]>((nodes, node) => {
      if (
        nodes.map((el) => JSON.stringify(el)).includes(JSON.stringify(node))
      ) {
        return nodes
      }
      return [...nodes, node]
    }, [])
}

function trimEdges(nodesArr: Node[], maxX?: number, maxY?: number) {
  if (maxX || maxY) {
    return nodesArr.reduce<Node[]>((nodes, node) => {
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
