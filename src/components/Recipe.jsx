import React from 'react'
import { getRecipeFromMistral } from '../../ai'
import Markdown from 'https://esm.sh/react-markdown@10'
const Recipe = (props) => {
  return (
    <section aria-live='polite'>
      <Markdown>
      {props.recipe}
      </Markdown>
    </section>
        
  )
}

export default Recipe