import React from 'react'

const RichTextRenderer = ({ text, as, colors = {} }) => {
  const MainTag = as || 'span'
  return (
    <MainTag>
      {text.map((v, i) => {
        if (v.type !== 'text') return

        const ALL_ANNOTATIONS = [
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'code'
        ]
        const activeAnnotations = ALL_ANNOTATIONS.filter(e => v.annotations[e])
        const ANNOTATIONS_TAGS = {
          bold: 'b',
          italic: 'i',
          strikethrough: 's',
          underline: 'u',
          code: 'code'
        }
        const tags = activeAnnotations.map(e => ANNOTATIONS_TAGS[e])
        tags.unshift('span')

        const generateTags = (arr, str) =>
          React.createElement(
            arr[0],
            null,
            arr.length <= 1 ? str : generateTags(arr.slice(1), str)
          )

        const trimmedBackgroundColor = v.annotations.color.replace(
          '_background',
          ''
        )

        return (
          <span
            style={{
              [v.annotations.color.endsWith('_background')
                ? 'backgroundColor'
                : 'color']:
                v.annotations.color && trimmedBackgroundColor !== 'default'
                  ? colors[v.annotations.color] ||
                    colors[trimmedBackgroundColor] ||
                    trimmedBackgroundColor
                  : undefined
            }}
            key={i}
          >
            {v.text.link?.url ? (
              <a href={v.text.link.url}>{generateTags(tags, v.text.content)}</a>
            ) : (
              generateTags(tags, v.text.content)
            )}
          </span>
        )
      })}
    </MainTag>
  )
}

const ReactNotionRenderer = ({ blocks, colors }) => {
  return (
    <div>
      {blocks.map((v, i) => {
        if (v.type === 'paragraph') {
          return (
            <div key={i}>
              <RichTextRenderer colors={colors} text={v.paragraph.text} />
              {v.has_children && <ReactNotionRenderer blocks={v.children} />}
            </div>
          )
        } else if (v.type === 'heading_1') {
          return (
            <div key={i}>
              <RichTextRenderer colors={colors} as="h1" text={v[v.type].text} />
            </div>
          )
        } else if (v.type === 'heading_2') {
          return (
            <div key={i}>
              <RichTextRenderer colors={colors} as="h2" text={v[v.type].text} />
            </div>
          )
        } else if (v.type === 'heading_3') {
          return (
            <div key={i}>
              <RichTextRenderer colors={colors} as="h3" text={v[v.type].text} />
            </div>
          )
        }
      })}
    </div>
  )
}

export default ReactNotionRenderer
