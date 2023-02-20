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

const validateUrl = (slugs: string[], node: Node) => {
  let list = node.children
  let selected = [] as Node[]
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
  const { data: node } = useGetSourceTreeQuery()
  const router = useRouter()
  const { slugs } = router.query
  const [selection, setSelection] = useState([] as Node[])

  useEffect(() => {
    // at root or node not fetched
    console.debug({ slugs, node })
    if (!slugs) return
    if (!Array.isArray(slugs)) return
    if (!node) return
    // push to root anyway if path not valid
    const result = validateUrl(slugs, node)
    console.debug({ result })
    if (!result) {
      router.push(ROOT)
      return
    }
    setSelection(result)
  }, [slugs, node])

  console.debug(selection)
  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}
      >
        Hello World
      </Paper>
    </ContentDiv>
  )
}

export default Source
