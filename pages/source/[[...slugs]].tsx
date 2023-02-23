import { Node } from '@/common/types';
import BottomNav from '@/components/source/BottomNav';
import BreadCrumbs from '@/components/source/BreadCrumb';
import Summary from '@/components/source/Summary';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { layoutActions } from '@/redux/slices/layout';
import { Paper } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const ROOT = '/source'

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
    <div
      id='content-div'
      className='full flex column start stretch'
    >
      <Paper
        className='full flex column start stretch'
      >
        <BreadCrumbs nodes={nodes} />
        <Summary nodes={nodes} />
      </Paper>
      <BottomNav />
    </div>
  )
}

export default Source
