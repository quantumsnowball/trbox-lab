import { FileNode } from '@/common/types';
import BottomNav from '@/components/result/BottomNav';
import BreadCrumbs from '@/components/result/BreadCrumb';
import Code from '@/components/result/Code';
import { RESULT_DIR_PREFIX, RESULT_ROOT, ResultBottomNavTag } from '@/components/result/constants';
import Equity from '@/components/result/Equity';
import Metrics from '@/components/result/Metrics';
import Summary from '@/components/result/Summary';
import Trades from '@/components/result/Trades';
import { useGetResultTreeQuery } from '@/redux/slices/apiSlice';
import { layoutActions } from '@/redux/slices/layout';
import { layoutTempActions } from '@/redux/slices/layoutTemp';
import { RootState } from '@/redux/store';
import { Paper } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
  const sectionTag = useSelector((s: RootState) => s.layoutTemp.result.section)
  const goToSectionTag = (s: ResultBottomNavTag) => dispatch(layoutTempActions.goToResultSection(s))

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
  useEffect(() => {
    const lastNode = nodes.at(-1)
    updateLastPath(lastNode?.path ?? '')
    goToSectionTag(lastNode?.name?.startsWith(RESULT_DIR_PREFIX) ? 'metrics' : 'files')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes])

  return (
    <div
      id='content-div'
      className='full flex column start stretch'
    >
      <Paper
        className='full flex column start stretch'
      >
        <BreadCrumbs {...{ nodes }} />
        {
          {
            'files': <Summary {...{ nodes }} />,
            'source': <Code {...{ nodes }} />,
            'metrics': <Metrics {...{ nodes }} />,
            'equity': <Equity {...{ nodes }} />,
            'trades': <Trades />,
          }[sectionTag]
        }
        <BottomNav {...{ nodes }} />
      </Paper>
    </div>
  )
}

export default Result
