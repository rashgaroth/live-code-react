import React from 'react'
import { Button, PageHeader } from 'antd'

export const MHeader = ({ buttonText, onClick, title }) => {
  return (
    <PageHeader
    ghost={false}
    onBack={() => window.history.back()}
    title={title}
    extra={[
      <Button
        key="1"
        type="primary"
        onClick={onClick}
      >
        {buttonText}
      </Button>,
    ]}
  />  )
}
