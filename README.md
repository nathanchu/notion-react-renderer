# [WIP] notion-react-renderer

A react renderer for the Notion API blocks.

Example:

```jsx
<ReactNotionRenderer
  blocks={data.results}
  colors={{ red: '#cc0000', background_red: '#ff7575' }}
/>
```

Supported:
`paragraph`, `heading_1`, `heading_2`, `heading_3`, `bold`, `italic`, `strikethrough`, `underline`, `code`

To Do:
`bulleted_list_item`, `numbered_list_item`, `to_do`, `toggle`

Unsupported (By the API currently):
Non-text blocks (for example pictures)
