import { Node } from '@/common/types';
import BreadCrumbs from '@/components/source/BreadCrumb';
import Summary from '@/components/source/Summary';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { styled } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const ROOT = '/source'

const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  height: 100%;
  /* take all horizontal space */
  width: 100%;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: stretch;
  /* align horizontally */
  align-items: stretch;
`;

const validateUrl = (slugs: string[], rootNode: Node) => {
  let list = rootNode.children
  let selected = [rootNode,]
  for (let slug of slugs) {
    const found = list.find(child => child.name === slug)
    if (!found)
      return false
    else
      list = found.children
    selected.push(found)
  }
  return selected
}

const Source = () => {
  const { data: rootNode } = useGetSourceTreeQuery()
  const router = useRouter()
  const { slugs } = router.query
  const [nodes, setNodes] = useState([] as Node[])

  useEffect(() => {
    // node not fetched
    if (!rootNode)
      return
    // at root or 
    if (!slugs || !Array.isArray(slugs)) {
      setNodes([rootNode,])
      return
    }
    // push to root anyway if path not valid
    const result = validateUrl(slugs, rootNode)
    if (!result) {
      router.push(ROOT)
      return
    }
    setNodes(result)
  }, [slugs, rootNode, router])

  return (
    <ContentDiv
      id='content-div'
    >
      <BreadCrumbs nodes={nodes} />
      <Summary nodes={nodes} />
    </ContentDiv>
  )
}

export default Source
