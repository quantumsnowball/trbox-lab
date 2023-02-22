import { Node } from '@/common/types';
import BreadCrumbs from '@/components/source/BreadCrumb';
import Summary from '@/components/source/Summary';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { layoutActions } from '@/redux/slices/layout';
import { Paper, styled } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


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
  const dispatch = useDispatch()
  const updateLastPath = (p: string) => dispatch(layoutActions.setSourceLastPath(p))
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

  // update last path on valid nodes update
  useEffect(() => { updateLastPath(nodes.at(-1)?.path ?? '') }, [nodes])

  return (
    <ContentDiv
      id='content-div'
    >
      <Paper
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}>
        <BreadCrumbs nodes={nodes} />
        <Summary nodes={nodes} />
      </Paper>
    </ContentDiv>
  )
}

export default Source
