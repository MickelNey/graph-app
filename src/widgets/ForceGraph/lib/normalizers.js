export const normalizeNodesFromJson = (nodes) => 
  nodes.map(node => ({
    id: node["id"], 
    value: node["value"], 
    year: node["year"],
    cluster: node["cluster"],
  }))

export const normalizeLinksFromJson = (links) => 
  links.map(link => ({ 
    source: link["source"], 
    target: link["target"], 
    value: link["value"]
  }))