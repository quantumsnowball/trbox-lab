import { FileNode } from '@/common/types';
import BottomNav from '@/components/result/BottomNav';
import BreadCrumbs from '@/components/result/BreadCrumb';
import { RESULT_ROOT } from '@/components/result/constants';
import Summary from '@/components/result/Summary';
import { useGetResultTreeQuery } from '@/redux/slices/apiSlice';
import { layoutActions } from '@/redux/slices/layout';
import { Paper } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const validateUrl = (slugs: string[], rootNode: FileNode) => {
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
  const dispatch = useDispatch()
  const updateLastPath = (p: string) => dispatch(layoutActions.setResultLastPath(p))
  const { data: rootNode } = useGetResultTreeQuery()
  const router = useRouter()
  const { slugs } = router.query
  const [nodes, setNodes] = useState([] as FileNode[])

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
      router.push(RESULT_ROOT)
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
        <BreadCrumbs {...{ nodes }} />
        <Summary {...{ nodes }} />
        <BottomNav {...{ nodes }} />
      </Paper>
    </div>
  )
}

export default Result
