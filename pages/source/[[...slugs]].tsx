import { Node, TreeDict } from '@/common/types';
import BreadCrumbs from '@/components/source/BreadCrumb';
import Summary from '@/components/source/Summary';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { Paper, styled } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const ROOT = '/source'

const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: flex-start;
  /* align horizontally */
  align-items: center;
`;

const validateUrl = (slugs: string[], rootNode: Node) => {
  let list = rootNode.children
  let selected = [rootNode,]
  for (let slug of slugs) {
    const found = list.find(child => child.name === slug)
    console.debug({ list, slug, found })
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
    console.debug({ result })
    if (!result) {
      router.push(ROOT)
      return
    }
    setNodes(result)
  }, [slugs, rootNode])

  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <BreadCrumbs nodes={nodes} />
        <Summary nodes={nodes} />
      </Paper>
    </ContentDiv>
  )
}

export default Source
