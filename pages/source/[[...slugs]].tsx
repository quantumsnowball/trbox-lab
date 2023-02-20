import { TreeDict } from '@/common/types';
import BreadCrumbs from '@/components/source/BreadCrumb';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { Paper, styled } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


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

const Source = () => {
  const { data: dirTree } = useGetSourceTreeQuery()
  const router = useRouter()
  const { slugs } = router.query
  const [validSlugs, setValidSlugs] = useState([] as string[])

  useEffect(() => {
    const validateSlugs = (slugs: string[] | string | undefined) => {
      // currently at root
      if (!Array.isArray(slugs)) return []
      // dirTree not ready, go to root
      if (!dirTree) return []
      // got into the tree until hit a false property
      const valids = [] as string[]
      slugs.reduce((node, slug, _, _arr) => {
        if (!node.hasOwnProperty(slug)) {
          // null property, break
          _arr = []
          return {}
        }
        // valid, append slug to valids
        valids.push(slug)
        return node[slug] as TreeDict
      }, dirTree)
      return valids
    }
    setValidSlugs(validateSlugs(slugs))
  }, [dirTree, slugs])


  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <BreadCrumbs slugs={validSlugs} />
      </Paper>
    </ContentDiv>
  )
}

export default Source
