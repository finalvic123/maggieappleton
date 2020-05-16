import React from 'react'
import { css } from '@emotion/core'

export const ReferenceBlock = ({ children }) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 660px;
      `}
    >
      <h4>References & Research</h4>
      <div
        css={css`
          display: grid;
          grip-gap: 1em;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        `}
      >
        {children}
      </div>
    </div>
  )
}

export const ReferenceItem = ({ title, link, author }) => {
  return (
    <div>
      <a href={link}>
        <p>{title}</p>
      </a>
      <h5>{author}</h5>
    </div>
  )
}
