import React from 'react'
import { Table as Tab } from 'antd'

type Props = {}

const Table = (props: any) => {
  return (
    <Tab {...props} pagination={false} style={{border:"1px solid #e0e2e7", borderRadius:"8px"}} />
  )
}

export default Table