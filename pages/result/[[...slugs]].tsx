import { Node } from '@/common/types';
import BreadCrumbs from '@/components/result/BreadCrumb';
import Summary from '@/components/result/Summary';
import { useGetResultTreeQuery } from '@/redux/slices/apiSlice';
import { Paper, styled } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const ROOT = '/result'

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
    if (!found)
      return false
    else
      list = found.children
    selected.push(found)
  }
  return selected
}


const Result = () => {
  const { data: rootNode } = useGetResultTreeQuery()
  const router = useRouter()
  const { slugs } = router.query
  const [nodes, setNodes] = useState([] as Node[])

  useEffect(() => {
    // node not fetched
    if (!rootNode)
      return
    // at root
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


  }, [slugs, rootNode])
  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}>
        <BreadCrumbs {...{ nodes }} />
        <Summary {...{ nodes }} />
      </Paper>
    </ContentDiv>
  )
}

export default Result
function useGetResultTree(): { data: any; } {
  throw new Error('Function not implemented.');
}
